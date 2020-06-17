import * as React from "react";
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";
import { Typography, Modal, WeSelect, Spin } from "@weconnect/tars-widgets";
import {
  NavigatorState,
  Miniapp,
  Page,
  PageLoadingStatus,
  ManagingLocation
} from "../../store/store";
import {
  intl,
} from "@weconnect/appkit";
import { updatePrivilegeList, updateManagingLocations, updateDefaultManagingLocation } from '../../actions/user';
import { navigatorReset, navigatorPop } from '../../actions/index';
import Icons from '../../../res/icons/icons';
import MiniAppView from "../webview/miniappview";
import SpacestationView from "../webview/spacestation-view";
import MainMenu from '../navigator/main-menu';
import NavigationBar from '../navigationbar/navigation-bar';
import MiniappGroup from '../navigator/miniapp-group';
import './style.css';

const modulelist: any[] = require('../../../modules.json');

interface Props {
  navigatorState: NavigatorState,
  managingLocations: ManagingLocation[],
  defaultManagingLocation: ManagingLocation,
  dispatch: Dispatch
}

interface State {
  miniappGroups: (Miniapp | MiniappGroup)[],
  openedPages: Page[],
  showLocationSelectDialog: boolean,
}

class AppMain extends React.Component<Props, State> {
  selectedLocationName: string;

  constructor(props: Props) {
    super(props)

    this.state = {
      miniappGroups: null,
      openedPages: props.navigatorState.pages,
      showLocationSelectDialog: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      openedPages: nextProps.navigatorState.pages,
    })
  }

  componentDidMount() {
    this.fetchPrivilegeList().then((response: any[]) => {
      let privilegeList: any[] = response;
      let mpgroups: (Miniapp | MiniappGroup)[] = [];
      modulelist.forEach((m) => {
        if (m.type == 'feature') {
          let mp: Miniapp = {
            name: m.name,
            label: m.label,
            icon: m.icon,
            url: m.url,
            moduleClass: m.moduleClass
          }

          if (privilegeList[m.privilegeId] == true) {
            mpgroups.push(mp);
          }
        } else if (m.type == 'feature-group') {
          if (m.features) {
            let mps: Miniapp[] = (m.features as any[])
              .filter((item: any) => {
                return privilegeList[item.privilegeId] == true;
              })
              .map<Miniapp>((item: any) => {
                return {
                  name: item.name,
                  label: item.label,
                  icon: item.icon,
                  url: item.url,
                  moduleClass: item.moduleClass
                }
              })

            if (mps && mps.length > 0) {
              let mpg: MiniappGroup = {
                name: m.name,
                label: m.label,
                icon: m.icon,
                miniapps: mps
              }

              mpgroups.push(mpg)
            }
          }
        } else {
          console.log("Error: unknown module type in modules.json: " + JSON.stringify(m));
        }
      })

      this.setState({
        miniappGroups: mpgroups
      })
    }, (error) => {
      this.setState({
        miniappGroups: null
      })
    });

    this.fetchManagingLocationList()
      .then((rsp: any[]) => {

      }, (error) => {

      });

    this.fetchDefaultManagingLocation()
      .then((rsp: any[]) => {

      }, (error) => {

      });
  }

  render() {
    let pageStackDepth = this.state.openedPages ? this.state.openedPages.length : 0;
    let mppages: any[] = [];
    var currentMiniappName = null;
    var pageLoadingStatus = PageLoadingStatus.idle;
    var enableFakePageStadk = false;
    var isSbmitting = false;

    if (pageStackDepth > 0) {
      for (var i = 0; i < pageStackDepth; i++) {
        let p = this.state.openedPages[i];
        if (p.miniapp.moduleClass == "spacestation") {
          if (i == pageStackDepth - 1) {
            mppages.push(<SpacestationView page={p} key={p.miniapp.name + i} zIndex={i} dispatch={this.props.dispatch} ref="ssview" />)
          } else {
            mppages.push(<SpacestationView page={p} key={p.miniapp.name + i} zIndex={i} />)
          }
        } else {
          mppages.push(<MiniAppView page={p} key={p.miniapp.name + i} zIndex={i} />)
        }
      }

      currentMiniappName = this.state.openedPages[0].miniapp.name;
      let topPage = this.state.openedPages[pageStackDepth - 1];
      if (topPage.miniapp.moduleClass == "spacestation") {
        enableFakePageStadk = pageStackDepth > 1 ? false : true;
      }
      if (topPage.state) {
        pageLoadingStatus = topPage.state.pageLoadingStatus;
        isSbmitting = topPage.state.submitting;
      }
    } else {
      this.resetTarsHomepage()
    }

    return (
      <div className="main-container">
        < div className='left-sidebar-container'>
          <div className='system-tool-region' />
          <div className='sidebar-logo-container'>
            <img className='sidebar-logo' src={Icons.tarsLogo} />
          </div>
          <div className='sidebar-location-container' onClick={this.onLocationClicked.bind(this)}>
            <span style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', marginRight: '8px' }}>
              <img src={Icons.location} />
              <Typography.Text strong={true} type='secondary' style={{ color: "var(--color-white, white')", marginLeft: '8px' }}>
                {this.props.defaultManagingLocation ? this.props.defaultManagingLocation.name : ""}
              </Typography.Text>
            </span>
            <img src={Icons.arrowRight} />
          </div>
          <MainMenu miniapps={this.state.miniappGroups} currentMiniappName={currentMiniappName} dispatch={this.props.dispatch} />
        </div>
        <div className='right-miniapp-container'>
          <div className='navigation-bar-container'>
            <NavigationBar dispatch={this.props.dispatch}
              pageCount={enableFakePageStadk ? 2 : pageStackDepth}
              loadingStatus={pageLoadingStatus}
              onBackButtonClicked={this.handleBackButtonClicked.bind(this)} />
          </div>
          <div className='content-container'>
            {mppages}
          </div>
        </div>

        {this.renderLocationSelectDialog()}
        {this.renderSubmittingAnimation(isSbmitting)}
      </div>
    )
  }

  onLocationClicked() {
    console.log("location clicked: " + JSON.stringify(this.props.managingLocations));
    this.setState({ showLocationSelectDialog: true })
  }

  renderLocationSelectDialog() {
    let options: string[] = []
    this.props.managingLocations?.forEach((location) => {
      options.push(location.name);
    });

    var defl = 0;
    if (this.props.defaultManagingLocation) {
      defl = options.findIndex((item: string) => {
        return item == this.props.defaultManagingLocation.name
      })
    }

    return (
      <Modal
        title={intl.get('tars_desktop_switch_building')}
        visible={this.state.showLocationSelectDialog}
        onOk={this.onLocationSelectDialogConfirmClicked.bind(this)}
        onCancel={this.onLocationSelectDialogCancelClicked.bind(this)}>
        <WeSelect title={intl.get('tars_desktop_building')}
          size="large"
          options={options} default={defl}
          onChange={(selected: number) => { this.selectedLocationName = options[selected] }} />
      </Modal>
    );
  }

  renderSubmittingAnimation(isSubmitting: boolean) {
    return (
      <div className='submitting-spin-container' hidden={!isSubmitting}>
        <Spin size="large" className='submitting-spin' />
      </div>
    )
  }

  onLocationSelectDialogConfirmClicked() {
    this.setState({ showLocationSelectDialog: false });
    if (this.selectedLocationName != this.props.defaultManagingLocation.name) {
      this.props.dispatch(updateDefaultManagingLocation(this.props.managingLocations.find((item: ManagingLocation) => {
        return item.name == this.selectedLocationName;
      })));

      this.resetTarsHomepage();
    }
  }

  onLocationSelectDialogCancelClicked() {
    this.setState({ showLocationSelectDialog: false });
  }

  handleBackButtonClicked() {
    if (this.refs.ssview) {
      (this.refs.ssview as SpacestationView).handleNavigatorBackward();
    } else {
      const dispatch = this.props.dispatch;
      dispatch(navigatorPop());
    }
  }

  resetTarsHomepage() {
    var miniapp = null;
    if (this.state.miniappGroups) {
      let group = this.state.miniappGroups.find((g: any) => {
        return g.name == "Member Gallery";
      })

      if (group && (group as MiniappGroup).miniapps) {
        miniapp = (group as MiniappGroup).miniapps.find((p: Miniapp) => {
          return p.name == "Company List";
        })
      }
    }

    if (miniapp) {
      this.props.dispatch(navigatorReset({ miniapp: miniapp }));
    }
  }

  fetchPrivilegeList() {
    return new Promise(async (resolve, reject) => {
      await new Promise(r => setTimeout(r, 2000));
      var pl = {
        "member.company_list": true,
        "spacestation.global": true,
        "spacestation.china": true,
        "management.access_control": true,
      }

      this.props.dispatch(updatePrivilegeList(pl));
      resolve(pl)
    });

    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // var myInit = { method: 'GET', headers: myHeaders };
    // let request = new Request('userService/api/v1/users/me/privileges', myInit)
    // return fetch(request).then((response) => {
    //     return response.data.data;
    // });
  }

  fetchManagingLocationList() {
    return new Promise(async (resolve, reject) => {
      await new Promise(r => setTimeout(r, 2000));
      var locations = [
        {
          "id": "1",
          "name": "中海国际",
          "address": "黄皮南路1号",
        },
        {
          "id": "2",
          "name": "南海国际",
          "address": "绿皮南路1号",
        },
        {
          "id": "3",
          "name": "北海国际aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "address": "白皮南路1号",
        },
        {
          "id": "4",
          "name": "东海国际",
          "address": "黑皮南路1号",
        },
        {
          "id": "5",
          "name": "西海国际",
          "address": "红皮南路1号",
        },
      ]

      this.props.dispatch(updateManagingLocations(locations));
      resolve(locations)
    });

    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // var myInit = { method: 'GET', headers: myHeaders };
    // let request = new Request('userService/api/v1/users/me/privileges', myInit)
    // return fetch(request).then((response) => {
    //     return response.data.data;
    // });
  }

  fetchDefaultManagingLocation() {
    return new Promise(async (resolve, reject) => {
      await new Promise(r => setTimeout(r, 2000));
      var deflocation = {
        "id": "1",
        "name": "中海国际",
        "address": "黄皮南路1号",
      }

      this.props.dispatch(updateDefaultManagingLocation(deflocation));
      resolve(deflocation)
    });

    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // var myInit = { method: 'GET', headers: myHeaders };
    // let request = new Request('userService/api/v1/users/me/privileges', myInit)
    // return fetch(request).then((response) => {
    //     return response.data.data;
    // });
  }
}

function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer,
    managingLocations: state.userReducer.managingLocations,
    defaultManagingLocation: state.userReducer.defaultManagingLocation,
    dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(AppMain);
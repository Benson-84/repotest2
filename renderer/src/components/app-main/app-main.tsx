import * as React from "react";
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";
import { Typography, Modal, WeSelect } from "@weconnect/tars-widgets";
import {
  NavigatorState,
  Miniapp,
  Page,
  PageLoadingStatus,
  ManagingLocation
} from "../../store/store";
import { updatePrivilegeList, updateManagingLocations, updateDefaultManagingLocation } from '../../actions/user';
import { navigatorReset } from '../../actions/index';
import Icons from '../icons/icons';
import MiniAppView from "../webview/miniappview";
import { MainMenu } from '../navigator/main-menu';
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
    let mppages: any[] = [];
    var pageLoadingStatus = PageLoadingStatus.idle;
    if (this.state.openedPages && this.state.openedPages.length > 0) {
      for (var i = 0; i < this.state.openedPages.length; i++) {
        let p = this.state.openedPages[i];
        mppages.push(<MiniAppView page={p} key={p.miniapp.name + i} zIndex={i} />)

        if (i == this.state.openedPages.length - 1 && p.state) {
          pageLoadingStatus = p.state.pageLoadingStatus;
        }
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
            <img src={Icons.location} />
            <div className='sidebar-location-text'>
              <Typography.Text strong={true} type='secondary' style={{ color: "var(--color-white, white')" }}>
                {this.props.defaultManagingLocation ? this.props.defaultManagingLocation.name : ""}
              </Typography.Text>
            </div>
          </div>
          <MainMenu miniapps={this.state.miniappGroups} miniappStarted={mppages.length > 0} dispatch={this.props.dispatch} />
        </div>
        <div className='right-miniapp-container'>
          <div className='navigation-bar-container'>
            <NavigationBar dispatch={this.props.dispatch} pageCount={this.state.openedPages.length} loadingStatus={pageLoadingStatus} />
          </div>
          <div className='content-container' id='content-container'>
            {mppages}
          </div>
        </div>

        {this.renderLocationSelectDialog()}
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
        title="#切换社区"
        visible={this.state.showLocationSelectDialog}
        onOk={this.onLocationSelectDialogConfirmClicked.bind(this)}
        onCancel={this.onLocationSelectDialogCancelClicked.bind(this)}>
        <WeSelect title='#社区：' options={options} default={defl} onChange={(selected: number) => { this.selectedLocationName = options[selected] }} ></WeSelect>
      </Modal>
    );
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
        "spacestation.china": true
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
  }
}

export default connect(mapStateToProps)(AppMain);
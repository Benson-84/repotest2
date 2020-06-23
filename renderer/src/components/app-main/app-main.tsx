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
} from "../../store/store";
import {
  intl,
  fetch,
  Navigation,
} from "@weconnect/appkit";
import {
  Location,
  API,
} from '@weconnect/tars-foundation'
import { updatePrivilegeList, updateManagingLocations, updateDefaultManagingLocation } from '../../actions/user';
import { navigatorReset, navigatorPop } from '../../actions/index';
import Icons from '../../../res/icons/icons';
import MiniAppView from "../webview/miniappview";
import SpacestationView from "../webview/spacestation-view";
import MainMenu from '../navigator/main-menu';
import NavigationBar from '../navigationbar/navigation-bar';
import { MiniappMenuGroup, MiniappMenuItem} from '../navigator/menu-model';
import './style.css';
import UnderConstruction from "../under-construction";
import { getMainMenuItemList, findInstalledMiniappByUrl } from './miniapp-manager';



interface Props {
  navigatorState: NavigatorState,
  managingLocations: Location[],
  defaultManagingLocation: Location,
  dispatch: Dispatch
}

interface State {
  miniappMenuList: (MiniappMenuItem | MiniappMenuGroup)[],
  openedPages: Page[],
  showLocationSelectDialog: boolean,
}

class AppMain extends React.Component<Props, State> {
  selectedLocationName: string;

  constructor(props: Props) {
    super(props)

    this.state = {
      miniappMenuList: null,
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
      let mpmenulist = getMainMenuItemList(response)
      this.setState({
        miniappMenuList: mpmenulist
      })
    }, (error: any) => {
        console.log("Error when fetching privilege list: " + JSON.stringify(error));
    });

    API.Locations.getMyLocations()
      .then((rsp: any[]) => {
        this.props.dispatch(updateManagingLocations(rsp));
      }, (error: any) => {
        console.log("error when fetching location list: " + JSON.stringify(error));
      });

    API.Locations.getMyDefaultLocation()
      .then((rsp: any) => {
        this.props.dispatch(updateDefaultManagingLocation(rsp));
      }, (error: any) => {
        console.log("error when fetching default location: " + JSON.stringify(error));
      });
  }

  render() {
    let pageStackDepth = this.state.openedPages ? this.state.openedPages.length : 0;
    let mppages: any[] = [];
    var currentMiniappName = null;
    var pageLoadingStatus = PageLoadingStatus.idle;
    var enableFakePageStack = false;
    var isSbmitting = false;

    if (pageStackDepth > 0) {
      for (var i = 0; i < pageStackDepth; i++) {
        let p = this.state.openedPages[i];
        if (p.miniapp.moduleClass == "spacestation") {
          if (i == pageStackDepth - 1) {
            mppages.push(<SpacestationView page={p} key={p.miniapp.url + "-" + i} zIndex={i} dispatch={this.props.dispatch} ref="ssview" />)
          } else {
            mppages.push(<SpacestationView page={p} key={p.miniapp.url + "-" + i} zIndex={i} />)
          }
        } else if (p.miniapp.moduleClass == "under.construction") {
          mppages.push(<UnderConstruction key={p.miniapp.url + "-" + i} />)
        } else {
          mppages.push(<MiniAppView page={p} key={p.miniapp.url + "-" + i} zIndex={i} />)
        } 
      }

      let cururl = this.state.openedPages[0].miniapp.url;
      this.state.miniappMenuList?.forEach((group: any) => {
        if (group.menuitems) {
          group.menuitems.forEach((item: MiniappMenuItem) => {
            if (item.miniapp.url == cururl) {
              currentMiniappName = item.name;
            }
          })
        } else if (group.miniapp && group.miniapp.url == cururl) {
          currentMiniappName = group.name;
        }
      })

      let topPage = this.state.openedPages[pageStackDepth - 1];
      if (topPage.miniapp.moduleClass == "spacestation") {
        enableFakePageStack = pageStackDepth > 1 ? false : true;
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
          <MainMenu currentMiniappName={currentMiniappName} miniappMenuList={this.state.miniappMenuList} dispatch={this.props.dispatch} ref='mainmenu' />
        </div>
        <div className='right-miniapp-container'>
          <div className='navigation-bar-container'>
            <NavigationBar
              pageCount={enableFakePageStack ? 2 : pageStackDepth}
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
    let location = this.props.managingLocations.find((item) => {
      return item.name == this.selectedLocationName;
    })

    if (location && location.name != this.props.defaultManagingLocation.name) {
      Navigation.startSubmittingAnimation();
      API.Locations.updateMyDefaultLocation(location.id)
        .then((rsp: any) => {
          this.props.dispatch(updateDefaultManagingLocation(this.props.managingLocations.find((item: Location) => {
            return item.name == this.selectedLocationName;
          })));

          this.resetTarsHomepage();
          this.setState({ showLocationSelectDialog: false });

          Navigation.stopSubmittingAnimation();
        }, (error: any) => {
          console.log("error when saving default location: " + JSON.stringify(error));

          Navigation.stopSubmittingAnimation();
        });
    } else {
      this.setState({ showLocationSelectDialog: false });
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
    let miniapp = findInstalledMiniappByUrl("module:/miniapp-spacestation");
    
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
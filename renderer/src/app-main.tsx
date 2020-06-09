import * as React from "react";
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";

import {
  EmptyPage
} from "@weconnect/appkit";

import {
  NavigatorState,
  Miniapp,
  Page
} from "./store/store";

import Icons from './components/icons/icons';
import MiniAppView from "./components/webview/miniappview";
import { MainMenu } from './components/navigator/main-menu';
import NavigationBar from './components/navigationbar/navigation-bar';
import DataProvider from './model/data-provider';
import MiniappGroup from './components/navigator/miniapp-group';
import './style.css';

const modulelist: any[] = require('../modules.json');

interface Props {
  navigatorState: NavigatorState
  dispatch: Dispatch
}

interface State {
  miniappGroups: (Miniapp | MiniappGroup)[],
  openedPages: Page[],
}

class AppMain extends React.Component<Props, State> {
  dataprovider: DataProvider;

  constructor(props: Props) {
    super(props)

    this.state = {
      miniappGroups: null,
      openedPages: props.navigatorState.pages,
    }

    this.dataprovider = new DataProvider();
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      openedPages: nextProps.navigatorState.pages,
    })
  }

  componentDidMount() {
    this.dataprovider.fetchPrivilegeList().then((response: any[]) => {
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
  }

  render() {
    let mppages: any[] = [];
    if (this.state.openedPages) {
      for (var i = 0; i < this.state.openedPages.length; i++) {
        let p = this.state.openedPages[i];
        mppages.push(<MiniAppView page={p} key={p.miniapp.name + i} zIndex={i} />)
      }
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
            <div className='sidebar-location-text'>{"China Overseas International Center"}</div>
          </div>
          <MainMenu miniapps={this.state.miniappGroups} miniappStarted={mppages.length > 0} dispatch={this.props.dispatch} />
        </div>
        <div className='right-miniapp-container'>
          <NavigationBar dispatch={this.props.dispatch} pageCount={this.state.openedPages.length} />
          <div className='content-container' id='content-container'>
            {mppages}
          </div>
        </div>
      </div>
    )
  }

  onLocationClicked() {
    console.log("location clicked")
  }
}

function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(AppMain);
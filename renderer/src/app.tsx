import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import MiniAppView from './components/webview/miniappview';
import AppMain from "./app-main";

import './style.css'
import { UserState } from './store/store';

import { ipcRenderer } from 'electron'
import { userLogout, userLogin } from './actions/index'

interface AppProps {
  user: UserState,
  dispatch: Dispatch
}


interface State {
  user: UserState
}

class App extends React.Component<AppProps, State> {
  navigator: any;

  constructor(props: AppProps) {
    super(props)

    console.log(props)
    this.state = {
      user: props.user
    }
    const dispatch = this.props.dispatch;
    ipcRenderer.on('tokenExprired', (event, arg) => {
      dispatch(userLogout())
    })

    ipcRenderer.on("navigator", (event, args) => {
      console.log("NavigationApp received 'navigator' event:" + JSON.stringify(event));
      console.log("args:" + JSON.stringify(args));
      this.handleIpcMainNavigator(args);
    })

  }

  handleIpcMainNavigator(args: any) {
    const dispatch = this.props.dispatch;
    if (args.arg.url == 'desktop-home') {
      console.log('UserLogin')
      dispatch(userLogin('xxx'))
    } else {
      this.navigator.handleNavigation(args)
    }
  }

  render() {
    // if (this.state.user && this.state.user.activeUser) {
      return (
        <AppMain onRef={this.onRefNavigator} />
      );
    // } else {
    //   return (
    //     <MiniAppView url='../miniapps/miniapp-login/index.html' />
    //   );
    // }
  }

  onRefNavigator = (ref: any) => {
    this.navigator = ref
  }

  componentWillReceiveProps(nextProps: AppProps) {
    this.setState({
      user: nextProps.user
    })
  }

}

function mapStateToProps(state: any) {
  console.log(state)
  return {
    user: state.userReducer,
    dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(App);
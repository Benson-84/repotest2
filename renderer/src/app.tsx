import * as React from 'react';

import { connect  } from 'react-redux';
import { Dispatch } from 'redux';

import MiniAppView from './components/webview/miniappview';
import NavigationApp from "./components/navigation/navigation-app";

import './style.css'
import { UserState } from './store/store';

import { ipcRenderer } from 'electron'
import { userLogout } from './actions/index'

interface AppProps {
  user: UserState,
  dispatch: Dispatch
}


interface State {
  user: UserState
}

class App extends React.Component<AppProps, State> {
  constructor(props: AppProps) {
    super(props)

    
    console.log(props)
    this.state = {
      user: props.user
    }
    const dispatch = this.props.dispatch;
    ipcRenderer.on('tokenExprired',(event,arg)=> {
      dispatch(userLogout())
    })
  }

  render() {
    if (this.state.user && this.state.user.activeUser) {
      return (
        <NavigationApp />
      );
    } else {
      return (
        <MiniAppView url='../miniapps/miniapp-login/index.html'/>
      );
    }
  }

  componentWillReceiveProps(nextProps: AppProps) {
    this.setState({
      user: nextProps.user
    })
  }

}

function mapStateToProps(state:any) {
  return {
    user: state.userReducer,
    dispatch:state.dispatch
  }
}

export default connect(mapStateToProps)(App);
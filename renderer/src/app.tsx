import * as React from 'react';

import { connect } from 'react-redux';


import MiniAppView from './components/webview/miniappview';
import NavigationApp from "./components/navigation/navigation-app";

import './style.css'
import { UserState } from './store/store';

interface AppProps {
  user: UserState
}

interface State {
  user: UserState
}

class App extends React.Component<AppProps, State> {
  constructor(props: AppProps) {
    super(props)

    // todo load information of active user here
    this.state = {
      user: props.user
    }
  }

  render() {
    if (this.state.user.activeUser) {
      return (
        <NavigationApp />
      );
    } else {
      return (
        <MiniAppView />
      );
    }
  }
}

function mapStateToProps(state:any): AppProps {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(App);
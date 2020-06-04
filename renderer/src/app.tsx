import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import NavigationApp from "./components/navigation/navigation-app";

import './style.css';
import { UserState } from './store/store';

import { ipcRenderer } from 'electron';
import { userLogout, userLogin } from './actions/user';
import LoginPage from "./components/login/login";

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
      this.handleIpcMainNavigator(args);
    })
  }

  handleIpcMainNavigator(args: any) {
    const dispatch = this.props.dispatch;
    if (args.arg.url == 'desktop-home') {
      dispatch(userLogin('xxx'))
    } else {
      this.navigator.handleNavigation(args)
    }
  }

  render() {
    if (this.state.user && this.state.user.activeUser) {
      return (
        <NavigationApp onRef={this.onRefNavigator} />
      );
    } else {
      return <LoginPage />
    }
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
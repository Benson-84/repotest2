import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AppMain from "./app-main";
import IpcEventrListener from './ipc-channels/ipc-event-listener';

import './style.css'
import { UserState } from './store/store';

interface AppProps {
  user: UserState,
  dispatch: Dispatch
}

interface State {
  user: UserState
}

class App extends React.Component<AppProps, State> {
  navigator: any;
  ipcEventListener: IpcEventrListener;

  constructor(props: AppProps) {
    super(props)

    console.log(props)
    this.state = {
      user: props.user
    }

    this.ipcEventListener = new IpcEventrListener(this.props.dispatch);
  }

  componentDidMount() {
    this.ipcEventListener.attach();
  }

  componentWillUnmount() {
    this.ipcEventListener.detach();
  }

  render() {
    // if (this.state.user && this.state.user.activeUser) {
    return (
      <AppMain />
    );
    // } else {
    //   return (
    //     <MiniAppView url='../miniapps/miniapp-login/index.html' />
    //   );
    // }
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
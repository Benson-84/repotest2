import * as React from "react";

import {
  connect
} from "react-redux";

import SlideBar from '../sidebar/sidebar';

import {
  EmptyPage
} from "@weconnect/appkit";

import { 
  NavigatorState, 
  Page 
} from "../../store/store";

import '../../style.css';
import MiniAppView from "../webview/miniappview";

interface Props {
    navigatorState: NavigatorState
}

interface State {
  pages: Page[]
}

class NavigationApp extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      pages: props.navigatorState.pages
    }
  }

  render() {

    let page = this.state.pages.length > 0 ? 
        <MiniAppView page={this.state.pages[this.state.pages.length - 1]} /> 
          : 
        <EmptyPage />

    return (
      <div className="main-container">
        < div className='sidebar-container'>
          <SlideBar />
        </div>
        <div className='content-container' id='content-container'>
          { page }
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      pages: nextProps.navigatorState.pages
    })
  }

}

function mapStateToProps(state:any): Props {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(NavigationApp);
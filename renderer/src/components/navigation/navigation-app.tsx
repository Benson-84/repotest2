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
    let url: string = this.getTopPageUrl();
    console.log("Switching to: " + url);

    let page = url && url.length > 0 ?
      <MiniAppView url={url} />
      :
      <EmptyPage />

    return (
      <div className="main-container">
        < div className='sidebar-container'>
          <div className='sidebar-system-tool-region' />
          <SlideBar />
        </div>
        <div className='content-container' id='content-container'>
          {page}
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      pages: nextProps.navigatorState.pages
    })
  }

  getTopPageUrl(): string {
    var url: string = null;
    if (this.state.pages && this.state.pages.length > 0) {
      let toppage = this.state.pages[this.state.pages.length - 1];
      let miniappclass = toppage.moduleClass;
      if (miniappclass == 'miniapp') {
        url = '../miniapps/' + toppage.url.replace('module:/', '') + '/index.html'
      } else if (miniappclass == 'sschina') {
        url = toppage.url
      }
    }

    return url;
  }
}


function mapStateToProps(state: any): Props {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(NavigationApp);
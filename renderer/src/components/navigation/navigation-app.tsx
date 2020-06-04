import * as React from "react";

import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";

import SlideBar from '../sidebar/sidebar';

import {
  NavigatorState,
  Page
} from "../../store/store";

import '../../style.css';
import MiniAppView from "../webview/miniappview";
import { navigatorPush, navigatorPop, userLogin } from "../../actions";
import NavigationBar from '../navigationbar/navigation-bar';

interface Props {
  navigatorState: NavigatorState,
  onRef: any,
  dispatch: Dispatch
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

    let miniappStarted = url && url.length > 0
    let page = miniappStarted ? <MiniAppView url={url} /> : <div />;

    return (
      <div className="main-container">
        < div className='sidebar-container'>
          <div className='sidebar-system-tool-region' />
          <SlideBar miniappStarted={miniappStarted} />
        </div>
        <div>
          <NavigationBar dispatch={this.props.dispatch} pageCount={this.state.pages.length} />
          <div className='content-container' id='content-container'>
            {page}
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      pages: nextProps.navigatorState.pages
    })
  }

  componentDidMount() {
    this.props.onRef(this)
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

      url = url + "?";
      if (toppage.params) {
        toppage.params.forEach((value, key, ) => {
          url = url + key + '=' + value + '&';
        })
      }

      url = url.substring(0, url.length - 1);
    }

    return url;
  }

  handleNavigation(args: any) {
    const dispatch = this.props.dispatch;
    let method = args.method;

    // convert json to Map
    let params = new Map<string, any>();
    for (var item in args.arg.params) {
      params.set(item, args.arg.params[item]);
    }
    if (args.arg.url == 'desktop-home') {
      return
    }

    if (method == 'open') {
      let page: Page = {
        miniapp: args.arg.url,
        url: args.arg.url,
        moduleClass: 'miniapp',
        params: params
      }

      dispatch(navigatorPush(page));
    } else if (method == 'close') {
      dispatch(navigatorPop());
    } else {
      console.log("Error: unknown navigator method=" + method)
    }
  }
}

function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(NavigationApp);
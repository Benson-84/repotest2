import * as React from "react"
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";
import { navigatorPop } from '../../actions/index';
import MiniAppView from "./miniappview";
import { Navigation } from '@weconnect/appkit';

export default class SpacestationView extends MiniAppView {
  loadingAnimationTimer: number = 0;

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    Navigation.startLoadingAnimation();
    this.loadingAnimationTimer = window.setTimeout(() => {
      this.loadingAnimationTimer = 0;
      // stop loading animation, no matter loading is completed or not
      Navigation.stopLoadingAnimation();
    }, 2500)
  }

  componentWillUnmount() {
    if (this.loadingAnimationTimer != 0) {
      window.clearTimeout(this.loadingAnimationTimer);
      this.loadingAnimationTimer = 0
    }
  }

  // override
  renderNavigationTitleBar() {
    return (
      <div></div>
    )
  }

  // override
  getUrl() {
    var url = "";
    let page = this.state.page;
    let env = this.getEnv();

    if (page.miniapp.url == "module:/miniapp-spacestation") {
      url = this.getSpacestationUrl(env);
    } else if (page.miniapp.url == "module:/miniapp-spacestation-china") {
      url = this.getSpacestationChinaUrl(env);
    } else {
      console.log("unknown spacestation miniapp url: " + page.miniapp.url);
    }

    return url;
  }

  handleNavigatorBackward() {
    if (this.getWebView().canGoBack()) {
      this.getWebView().goBack();
    } else {
      if (this.props.dispatch) {
        this.props.dispatch(navigatorPop());
      }
    }
  }

  private getEnv() {
    var env = 'production'

    let envParamPrefix = 'env=';
    let envparam = document.location.search.substring(1).split('&').find((item) => {
      return item.startsWith(envParamPrefix );
    });

    if (envparam) {
      env = envparam.substring(envParamPrefix.length);
    }

    return env
  }

  private getSpacestationUrl(env:string) {
    if (env == 'staging') {
      return 'https://spacestation-staging.wework.com';
    }
    return 'https://spacestation.wework.com';
  }

  private getSpacestationChinaUrl(env:string) {
    if (env == 'staging') {
      return 'https://spacestation-staging.wework.cn';
    }
    return 'https://spacestation.wework.cn';
  }
}
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

  renderNavigationTitleBar() {
    return (
      <div></div>
    )
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
}
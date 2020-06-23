import React from "react"
import PropTypes from 'prop-types';
import { Typography } from '@weconnect/tars-widgets';
import {
  intl,
} from "@weconnect/appkit";
import './style.css';

const Store = require('electron-store');

const store = new Store();

export default class MiniAppView extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page
    }
  }

  render() {

    return (
      <div className='miniapp-container' >
        {this.renderNavigationTitleBar()}
        {this.renderDebug()}

        <webview
          ref="webview"
          style={{ width: '100%', height: '100%' }}
          src={this.getUrl()}
          nodeintegration="true"
          webpreferences="'web-security'=false"
          useragent="Mozilla/5.0 (Desktop; Chrome; WeWork;)"
          preload="../../preload/preload.js" />

      </div>
    )
  }

  getWebView() {
    return this.refs.webview;
  }

  renderNavigationTitleBar() {
    return (
      <div className='title-bar'>
        <Typography.Text strong={true}>{this.getTitle()}</Typography.Text>
      </div>
    );
  }

  renderDebug = () => {
    return (
      <button onClick={this.handleDebugClick} style={{ float: 'right', clear: 'both', position: 'absolute', top: '16px', right: '16px', padding: '4px' }}>Debug</button>
    )
  }

  handleDebugClick = () => {
    this.refs.webview.openDevTools()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page
    })
  }

  getUrl() {
    var url = null;
    let page = this.state.page;
    let env = this.getEnv();

    if (page) {
      let miniappclass = page.miniapp.moduleClass;
      if (miniappclass == 'miniapp') {
        url = '../miniapps/' + page.miniapp.url.replace('module:/', '') + '/index.html';
      } else if (miniappclass == 'spacestation') {
        if (page.miniapp.url == "module:/miniapp-spacestation") {
          url = this.getSpacestationUrl(env);
        } else if (page.miniapp.url == "module:/miniapp-spacestation-china") {
          url = this.getSpacestationChinaUrl(env);
        }
      } else {
        console.log("Error: unknown miniapp: " + JSON.stringify(page.miniapp));
      }

      url = url + "?";
      if (page.params) {
        page.params.forEach((value, key,) => {
          url = url + key + '=' + value + '&';
        })
      }

      url = url.substring(0, url.length - 1);
    }

    return url;
  }

  getTitle() {
    let page = this.state.page;

    var title = null;
    if (page) {
      title = page.state?.title;
      if (!title && page.miniapp.label) {
        title = intl.get(page.miniapp.label);
      }
    }

    return title ? title : "";
  }

  getEnv() {
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

  getSpacestationUrl(env) {
    if (env == 'staging') {
      return 'https://spacestation-staging.wework.com';
    }
    return 'https://spacestation.wework.com';
  }

  getSpacestationChinaUrl(env) {
    if (env == 'staging') {
      return 'https://spacestation-staging.wework.cn';
    }
    return 'https://spacestation.wework.cn';
  }
}
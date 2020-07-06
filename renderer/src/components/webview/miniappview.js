import React from "react"
import PropTypes from 'prop-types';
import { Typography, Dropdown, Menu, Icons } from '@weconnect/tars-widgets';
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
      page: props.page,
      debuggerServer: ""
    }
  }

  render() {

    const url = this.state.debuggerServer.length > 0 ? this.state.debuggerServer : this.getUrl();
    return (
      <div className='miniapp-container' >
        {this.renderNavigationTitleBar()}
        {this.renderDebug()}

        <webview
          ref="webview"
          style={{ width: '100%', height: '100%' }}
          src={url}
          nodeintegration="true"
          webpreferences="nativeWindowOpen=yes"
          useragent="Mozilla/5.0 (Desktop; Chrome; WeWork;)"
          preload="../../preload/preload.js" 
          allowpopups="true" />

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
    const { debuggerServer } = this.state;
    const menu = (
      <Menu onClick={this.handleDebugEnvSelectClick}>
        <Menu.Item key="1" >Local File</Menu.Item>
        <Menu.Item key="2" >http://localhost:8080</Menu.Item>
      </Menu>
    );
    const localEnv = debuggerServer.length > 0 ? debuggerServer : "Local File";
    return (
      <div className="debug-menu">
        <Dropdown overlay={menu} >
          <div>
            <b>Env:</b> {localEnv}
          </div>
        </Dropdown>
        <button onClick={this.handleDebugClick} style={{marginLeft: "10px"}} >Debug</button>
      </div>
    )
  }

  handleDebugEnvSelectClick = (e) => {
    var debuggerServer = "";
    if(e.key == "2") {
      debuggerServer = "http://localhost:8080";
    }
    this.setState({
      debuggerServer: debuggerServer
    })
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

    let page = this.state.page;
    var url = '../miniapps/' + page.miniapp.url.replace('module:/', '') + '/index.html' + "?";

    if (page.params) {
      page.params.forEach((value, key,) => {
        url = url + key + '=' + value + '&';
      })
    }

    return url.substring(0, url.length - 1);
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
}
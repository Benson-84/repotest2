import React from "react"
import PropTypes from 'prop-types';
import {
  Page
} from "../../store/store";
import './style.css';


export default class MiniAppView extends React.Component {

  static propTypes = {
    page: Page
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page
    }
  }

  render() {
    console.log("render miniapp with url=" + this.state.url)
    let title = this.state.page.state?.title;

    return (
      <div className='miniapp-container' >
        <div className='title-bar'>
          {title ? title : " "}
          {this.renderDebug()}
        </div>

        <webview
          ref="webview"
          style={{ width: '100%', height: '100%' }}
          src={this.getUrl()}
          nodeintegration="true"
          webpreferences="'web-security'=false"
          useragent="Mozilla/5.0 (Desktop; )"
          preload="../../preload/preload.js" />
      </div>
    )
  }

  renderDebug = () => {
    return (
      <button onClick={this.handleDebugClick} className='debug-button'>Debug</button>
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

    if (page) {
      let miniappclass = page.miniapp.moduleClass;
      if (miniappclass == 'miniapp') {
        url = '../miniapps/' + page.miniapp.url.replace('module:/', '') + '/index.html';
      } else if (miniappclass == 'spacestation') {
        url = page.miniapp.url;
      } else {
        console.log("Error: unknown miniapp: " + JSON.stringify(page.miniapp));
      }

      url = url + "?";
      if (page.params) {
        page.params.forEach((value, key, ) => {
          url = url + key + '=' + value + '&';
        })
      }

      url = url.substring(0, url.length - 1);
    }

    return url;
  }

}
import React from "react"
import PropTypes from 'prop-types';
import './style.css';


export default class MiniAppView extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      url: props.url,
      title: "#公司列表"
    }
  }

  render() {
    console.log("render miniapp with url=" + this.state.url)

    return (
      <div className='miniapp-container' >
        <div className='title-bar'>
          {this.state.title}
          {this.renderDebug()}
        </div>

        <webview
          ref="webview"
          style={{ width: '100%', height: '100%' }}
          src={this.state.url}
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
      url: nextProps.url
    })
  }

}
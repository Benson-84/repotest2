import React from "react"
import PropTypes from 'prop-types';


export default class MiniAppView extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)

    this.state = {
      url: props.url
    }
  }
  
  render() {
    console.log("create a new webview with url=" + this.state.url)

    return (
      <div className="miniAppContainer" >
        { this.renderDebug() }
        <webview  
            ref="webview"
            style={{width: "100%", height: "100%"}}    
            src={this.state.url} 
            nodeintegration="true" 
            webpreferences="'web-security'=false"
            useragent="Mozilla/5.0 (Desktop; )"
            preload="../../preload/preload.js"/> 
      </div>
    )
  }

  renderDebug = () => {
    return (
      <button onClick={this.handleDebugClick} style={{float:'right', clear:'both',  marginRight: '16px', marginTop: '16px'}}>Debug</button>
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
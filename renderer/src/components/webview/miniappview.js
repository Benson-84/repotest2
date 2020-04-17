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
    console.log("xxxxxxxxx url=" + this.state.url)
    return (
      <webview 
          className="miniAppContainer" 
          src={this.state.url} 
          nodeintegration="true" 
          webpreferences="'web-security'=false"
          useragent="Mozilla/5.0 (Desktop; )"
          preload="../../preload/preload.js"/>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.url
    })
  }

}
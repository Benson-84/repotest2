import React from "react"
import PropTypes from 'prop-types';


export default class MiniAppView extends React.Component {

  static propTypes = {
    page: PropTypes.object
  }

  constructor(props){
    super(props)

    this.state = {
      page: props.page
    }
  }
  
  render() {
    return (

      <webview 
          className="miniAppContainer" 
          src={this.state.page.miniapp} 
          nodeintegration="true" 
          webpreferences="'web-security'=false"
          useragent="Mozilla/5.0 (Desktop; )"
          preload="../../preload/preload.js"/>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page
    })
  }

}
import React from "react"


export default class MiniAppView extends React.Component {

  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <webview 
          className="miniAppContainer" 
          src="../miniapps/miniapp-login/index.html" 
          nodeintegration="true" />
    )
  }
}
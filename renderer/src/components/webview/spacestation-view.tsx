import React from "react"
import MiniAppView from "./miniappview";


export default class SpacestationView extends MiniAppView {

  constructor(props:any) {
    super(props);
  }

  renderNavigationTitleBar() {
    return (
      <div></div>
    )
  }
}
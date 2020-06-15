import * as React from "react"
import MiniAppView from "./miniappview";
import {Navigation} from '@weconnect/appkit';


export default class SpacestationView extends MiniAppView {

  constructor(props:any) {
    super(props);
  }

  componentWillMount(){
    Navigation.startLoadingAnimation();
    window.setTimeout(() => {
      // stop loading animation, no matter loading is completed or not
      Navigation.stopLoadingAnimation();
    }, 2500)
  }

  renderNavigationTitleBar() {
    return (
      <div></div>
    )
  }

  handleNavigatorBackward() {
    // todo 
  }
}
import * as React from  "react";
import { EmptyPage } from "@weconnect/appkit";

interface Props {
  
}

interface State {
  pages: []
}

export default class NavigationView extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      pages: []
    }
  }
  render() {
    if(this.state.pages.length == 0) {
      return <EmptyPage />
    } else {
      return this.state.pages[this.state.pages.length -1]
    }
  }
}
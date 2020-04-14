import * as React from "react";
import SlideBar from '../sidebar/sidebar';
import NavigationView from './navigation';

import '../../style.css';

interface Props {
  
}

interface State {
  activeUser: any
}


export default class NavigationApp extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)

    this.state = {
      activeUser: ""
    }
  }

  render() {
    return (
      <div className="main-container">
        < div className='sidebar-container'>
          <SlideBar />
        </div>
        <div className='content-container'>
          <NavigationView />
        </div>
      </div>
    )
  }
}
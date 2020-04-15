import * as React from "react";
import SlideBar from '../sidebar/sidebar';
import NavigationView from './navigation';

import '../../style.css';

interface Props {
  activeUser: any
}

interface State {
  
}


export default class NavigationApp extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="main-container">
        < div className='sidebar-container'>
          <SlideBar />
        </div>
        <div className='content-container' id='content-container' >
        </div>
      </div>
    )
  }
}
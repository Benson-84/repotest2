import * as React from "react";

import {
  connect
} from "react-redux";

import SlideBar from '../sidebar/sidebar';

import '../../style.css';

interface Props {
  
}

interface State {
  
}

class NavigationApp extends React.Component<Props, State> {

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


function mapStateToProps(state:any): Props {
  return {

  }
}
export default connect(mapStateToProps)(NavigationApp);
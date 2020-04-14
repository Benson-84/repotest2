import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import SlideBar from './components/sidebar/sidebar'

interface State {
  activeUser: any
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    // todo load information of active user here
    // this.state = {
    //   activeUser: 'somebody'
    // }
  }

  render() {
    if (this.state.activeUser) {
      return (
        <div className="main-container">
          < div className='sidebar-container'>
            <SlideBar />
          </div>
          <div className='content-container'></div>
        </div>
      );
    } else {
      return (
        <webview className="miniAppContainer" src="../miniapps/miniapp-login/index.html"></webview>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

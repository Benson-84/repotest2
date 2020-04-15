import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import NavigationApp from "./components/navigation/navigation-app";

interface State {
  activeUser: any
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    // todo load information of active user here
    this.state = {
      activeUser: "xxx"
    }
  }

  render() {
    if (this.state.activeUser) {
      return (
        <NavigationApp activeUser={this.state.activeUser} />
      );
    } else {
      return (
        <webview className="miniAppContainer" src="../miniapps/miniapp-login/index.html"></webview>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

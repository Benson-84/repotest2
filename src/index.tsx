import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./style.css";


class App extends React.Component {
  render() {
    return (
      <webview className="miniAppContainer" src="miniapps/miniapp-login/index.html"></webview>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById('app'));

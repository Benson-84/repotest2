import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as electron from 'electron';

const Index = () => {
  return (
    <div>
      <h1>{JSON.stringify(electron.remote.app.getAppPath())}</h1>
      <webview></webview>
    </div>
  );
};

 
ReactDOM.render(<Index />, document.getElementById('app'));
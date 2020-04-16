import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import { 
  Provider 
} from 'react-redux';

import { 
  Store, createStore 
} from 'redux';

import rootReducer from './reducers';
import App from "./app";

const store: Store<any> = createStore(rootReducer);


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('app'));

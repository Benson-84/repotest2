import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import { 
  Provider 
} from 'react-redux';

import { 
  Store, createStore , applyMiddleware
} from 'redux';

import rootReducer from './reducers';
import App from "./app";
import thunk from 'redux-thunk';

const store: Store<any> = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('app'));

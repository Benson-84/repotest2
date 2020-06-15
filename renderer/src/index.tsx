import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { We } from "@weconnect/appkit";
import './style.css'
import {
  Provider
} from 'react-redux';

import {
  Store, createStore, applyMiddleware
} from 'redux';

import rootReducer from './reducers';
import App from "./app";
import thunk from 'redux-thunk';

import en from '../res/i18n/en-US';
import cn from '../res/i18n/zh-CN';
import hk from '../res/i18n/zh-HK';

const store: Store<any> = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const locales = {
  "en": en,
  "zh-Hans": cn,
  "zh-Hant": hk
}

ReactDOM.render((
  <Provider store={store}>
    <We locales={locales}>
      <App />
    </We>
  </Provider>
), document.getElementById('app'));

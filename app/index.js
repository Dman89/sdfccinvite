import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/Nav/Auth/signin';
import Welcome from './components/Welcome/Welcome';
import Confirm from './components/Confirm/Confirm';
import reducers from './reducers';
import RequireAuth from './components/Nav/Auth/req_auth';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if(token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="confirm" component={Confirm}/>
        <Route path="signup" component={Welcome}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#container'));

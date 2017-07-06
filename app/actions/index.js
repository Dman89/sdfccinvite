import axios from 'axios';
import * as Router from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from './types';
const port = process.env.PORT || 3000;
const ROOT_URL = process.env.ROOT_URL || "http://localhost:"+port;
let browserHistory;
// if (localStorage.length === 0) {
//   let localStorage = require("../test/mocklocalstorage.js");
//   browserHistory = {
//     push: (x) => {
//       return x
//     }
//   }
// }
//else {
  browserHistory = Router.browserHistory;
//}
export function signinUser({email, password}) {
  return function(dispatch) {
    //Submit email/pw to server
    axios.post(`${ROOT_URL}/api/signin`, {email, password})
    .then(function(response) {
    //Request: Good
      if (response.status == 200) {
        // - Update State to indicate user is authenticated
        dispatch({type: AUTH_USER})
        // - Save JWT Token
        const {token} = response.data;
        localStorage.setItem('token', token)
        // - Redirect to the route '/profile'
        browserHistory.push('/confirm');
      }
    })
    .catch((res) => {
    //Request: Bad
      // - Show an error to the user
      dispatch(authError("Bad Login Info"))
    })

  }
}
export function signupUser({email, password, first_name, last_name, start_date, end_date}) {
  return function(dispatch) {
    //Submit email/pw to server
    axios.post(`${ROOT_URL}/api/channelInvite`, {email, password, last_name, first_name, start_date, end_date})
    .then(function(response) {
    //Request: Good
      if (response.status == 201 || response.status == 200) {
        // - Update State to indicate user is authenticated
        dispatch({type: AUTH_USER})
        // - Save JWT Token
        const {token} = response.data;
        localStorage.setItem('token', token)
        // - Redirect to the route '/confirm'
        browserHistory.push('/confirm');
      }
    })
    .catch((res) => {
    //Request: Bad
      // - Show an error to the user
      dispatch(authError("Email in Use"))
    })

  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    const config = {headers: {
      authorization: localStorage.getItem('token')
    }}
    axios(ROOT_URL+"/api/profile/", config)
    .then((res)=> {

    })
  }
}

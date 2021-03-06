import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Signup from '../Nav/Auth/Signup';
import WelcomePageLinks from './WelcomePageLinks';
import Banner from './Banner';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  renderSignup() {
    if (this.props.authenticated) {
      return "hidden";
    }
    return "";
  }
  renderOther() {
    if (this.props.authenticated) {
      return "";
    }
    return "hidden";
  }
  render() {
    return (
      <div className="">
        <div className="">
          <Banner />
        </div>
        <div className="wrapper-lg m-n-auto container">
          <div className={this.renderSignup()}>
            <Signup />
          </div>
          <div>
            <WelcomePageLinks />
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Welcome);

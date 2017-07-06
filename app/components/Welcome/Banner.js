import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Banner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Banner" style={{backgroundImage: "url(images/header-bg.jpg)"}}>
        <div className="white-bg"/>
        <h1 className="banner-title">San Diego FCC Slack Signup</h1>
      </div>
    )
  }
}
export default connect(null, actions)(Banner);

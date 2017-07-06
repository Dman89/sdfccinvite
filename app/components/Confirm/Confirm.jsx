import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Confirm extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 p-t-xl" >
        <div className="panel panel-success ConfirmationPanel">

          <div className="panel-body">
            <div className="panel-icon">
              <i className="fa fa-check"></i>
            </div>
            <h4 className="panel-title">
              Thank you for signing up!
            </h4>
            <p className="text-muted">
              Check you email for a message from Slack.
            </p>
          </div>
          <div className="panel-footer hidden">
            <h4 className="panel-title">
              Share with someone whom you care about.
            </h4>
            <div className="list-group-item">
              <a href="" className="panel-link">
                https://www.linktosite.com/longurl/suffix
              </a>
            </div>
            <div className="panel-social text-center">


              <a href="" className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </a>
              <a href="" className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </a>
              <a href="" className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(null, actions)(Confirm);

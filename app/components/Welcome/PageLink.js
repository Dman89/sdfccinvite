import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class PageLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:props.link.text, href:props.link.href, img:props.link.img
    }
  }
  render() {
    return (
      <div className="panel panel-default PageLink" style={{backgroundImage: "url("+this.state.img+")"}} key={this.props.key}>
        <a className="" href={this.state.href}>
          <div className="panel-body">
              <h4 className="panel-title">
                {this.state.text}
              </h4>
          </div>
        </a>
      </div>
    )
  }
}
export default PageLink;

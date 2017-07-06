import React, { Component } from 'react';
import Nav from './Nav/Nav.jsx';
export default class Application extends Component {
  render () {
    return (
      <div className="app-wrapper App">
        {this.props.children}
      </div>
    )
  }
};

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import PageLink from './PageLink';
const links = [
  {
    href: "#",
    text: "Coming Soon",
    img: "images/image1.jpg"
  },
  {
    href: "#",
    text: "Coming Soon",
    img: "images/image3.jpg"
  },
  {
    href: "#",
    text: "Coming Soon",
    img: "images/image2.jpg"
  }
];

class WelcomePageLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: links
    }
  }
  render() {
    return (
      <div className="row WelcomePageLinks">
        {this.state.links.map(function(l, i) {
          return (
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center PageLinks" key={i}>
              <div className="row">
                <PageLink link={l} key={i}/>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default WelcomePageLinks;

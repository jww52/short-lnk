import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      let links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    //if statement - if there are no links in links array
      //return some static jsx
      //div p No Links Found
      if (!this.state.links.length) {
        return (
          <div className="item">
            <p className="item__status-message">No Links Found</p>
          </div>
        )
      }
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      //this.props.link
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
    });
  }
  render() {
    return(
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
};

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/link');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  //if on unauthenticated page and logged in, redirect to /links
  if (isUnauthenticatedPage && isAuthenticated) {browserHistory.replace('/link');}
  //if on authenticated page and not logged in, redirect to /
  if (isAuthenticatedPage && !isAuthenticated) {browserHistory.replace('/');}
};

//onEnterPrivatePage - check if user is not logged in.  If they're not, redirect to /
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login}  onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/link" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

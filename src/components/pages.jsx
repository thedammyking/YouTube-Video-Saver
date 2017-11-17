import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchWrapper from './searchWrapper';
import SavedWrapper from './savedWrapper';
import NotFound from './notfound';
import '../css/pages.css';

class Pages extends Component {
  constructor() {
    super();
    this.state = {
      savedVideos: []
    };
  }
  saveVideos(ids) {
    console.log(ids);
  }
  render() {
    const data = { ...this.props };
    return (
      <Switch>
        <Route exact path="/" render={() => <SearchWrapper data={data} />} />
        <Route path="/search" render={() => <SearchWrapper saveVideos={() => this.saveVideos} data={data} />} />
        <Route path="/saved" render={() => <SavedWrapper data={this.state.savedVideos} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Pages;

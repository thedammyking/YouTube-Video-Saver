import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchWrapper from './searchWrapper';
import SavedWrapper from './savedWrapper';
import NotFound from './notfound';
import '../css/pages.css';

class Pages extends Component {
  render() {
    const data = { ...this.props };
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <SearchWrapper
              videos={data.videos}
              addToSelected={data.addToSelected}
              removeFromSelected={data.removeFromSelected}
              selectedSearchVideos={data.selectedSearchVideos}
              savedVideos={data.savedVideos}
              saveVideos={data.saveVideos}
            />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedWrapper
              savedVideos={data.savedVideos}
              selectedVideos={data.selectedSavedVideos}
              addToSelected={data.addToSelected}
              removeFromSelected={data.removeFromSelected}
              deleteVideos={data.deleteVideos}
              apiKey={data.apiKey}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Pages;

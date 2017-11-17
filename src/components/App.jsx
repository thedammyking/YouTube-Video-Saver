import _ from 'lodash';
import React, { Component } from 'react';
import Search from '../apiCall';
import Header from './header';
import Nav from './nav';
import Pages from './pages';
import '../css/App.css';
const API_KEY = 'AIzaSyBpDCFTdhUyY3hUH-A3AhHdcNXaU9H6Ksw';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      pageInfo: {},
      searchTerm: ''
    };
  }
  videoSearch(term) {
    this.setState({
      searchTerm: term
    });
    const opts = {
      q: term,
      type: 'video',
      maxResults: 25,
      part: 'snippet',
      key: API_KEY
    };

    Search('search', 'GET', opts, (err, results, pageInfo) => {
      if (err) return console.log(err);
      this.setState({
        videos: results,
        pageInfo: pageInfo
      });
    });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 500);
    const { videos, pageInfo, searchTerm } = this.state;
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-12">
            <Header videoSearch={videoSearch} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <Nav />
              <Pages apiKey={API_KEY} term={searchTerm} videos={videos} pageInfo={pageInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

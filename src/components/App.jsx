import _ from 'lodash';
import React, { Component } from 'react';
import ytAPI from '../apiCall';
import base from '../base';
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
      searchTerm: '',
      selectedSearchVideos: {},
      selectedSavedVideos: {},
      savedVideos: {}
    };
    this.addToSelected = this.addToSelected.bind(this);
    this.removeFromSelected = this.removeFromSelected.bind(this);
    this.saveVideos = this.saveVideos.bind(this);
    this.deleteVideos = this.deleteVideos.bind(this);
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

    ytAPI('search', 'GET', opts, (err, results, pageInfo) => {
      if (err) return console.log(err);
      this.setState({
        videos: results,
        pageInfo: pageInfo
      });
    });
    localStorage.clear();
    this.setState({
      selectedSearchVideos: {},
      selectedSavedVideos: {}
    });
  }
  componentWillMount() {
    base.syncState('saved_videos/videos', {
      context: this,
      state: 'savedVideos',
      asObject: true
    });
    const localStorageSearchRef = localStorage.getItem(`selected_search_videos`);
    const localStorageSavedRef = localStorage.getItem(`selected_saved_videos`);

    if (localStorageSearchRef) {
      this.setState({
        selectedSearchVideos: JSON.parse(localStorageSearchRef)
      });
    } else if (localStorageSavedRef) {
      this.setState({
        selectedSavedVideos: JSON.parse(localStorageSavedRef)
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`selected_search_videos`, JSON.stringify(nextState.selectedSearchVideos));
    localStorage.setItem(`selected_saved_videos`, JSON.stringify(nextState.selectedSavedVideos));
  }
  addToSelected(id, type) {
    switch (type) {
      case 'search':
        const selectedSearchVideos = { ...this.state.selectedSearchVideos };
        selectedSearchVideos[`video${id}`] = id;
        this.setState({
          selectedSearchVideos: selectedSearchVideos
        });
        console.log(`Adding ${id}`);
        break;
      case 'saved':
        const selectedSavedVideos = { ...this.state.selectedSavedVideos };
        selectedSavedVideos[`video${id}`] = id;
        this.setState({
          selectedSavedVideos: selectedSavedVideos
        });
        console.log(`Adding ${id}`);
        break;
      default:
        break;
    }
  }
  removeFromSelected(id, type) {
    switch (type) {
      case 'search':
        const selectedSearchVideos = { ...this.state.selectedSearchVideos };
        delete selectedSearchVideos[`video${id}`];
        this.setState({
          selectedSearchVideos: selectedSearchVideos
        });
        console.log(`Removing ${id}`);
        break;
      case 'saved':
        const selectedSavedVideos = { ...this.state.selectedSavedVideos };
        delete selectedSavedVideos[`video${id}`];
        this.setState({
          selectedSavedVideos: selectedSavedVideos
        });
        console.log(`Removing ${id}`);
        break;
      default:
        break;
    }
  }
  saveVideos(e) {
    e.preventDefault();
    Object.keys(this.state.selectedSearchVideos).map(key => {
      const opts = {
        id: this.state.selectedSearchVideos[key],
        key: API_KEY,
        part: 'snippet,contentDetails,statistics'
      };

      ytAPI('videos', 'GET', opts, (err, results, pageInfo, contentDetails) => {
        if (err) return console.log(err);
        this.processSave(key, results, contentDetails);
      });
      return '';
    });
  }
  processSave(key, results, contentDetails) {
    const savedVideos = { ...this.state.savedVideos };
    savedVideos[key] = {
      id: this.state.selectedSearchVideos[key],
      title: results[0].title,
      description: results[0].description,
      thumbnails: results[0].thumbnails,
      duration: contentDetails[0].duration
    };
    this.setState({
      savedVideos
    });
    localStorage.clear();
  }
  deleteVideos(e) {
    e.preventDefault();
    Object.keys(this.state.selectedSavedVideos).map(key => {
      _.debounce(() => {
        const savedVideos = { ...this.state.savedVideos };
        savedVideos[key] = null;
        this.setState({
          savedVideos,
          selectedSavedVideos: {}
        });
        localStorage.clear();
        console.log(savedVideos);
        console.log(this.state.savedVideos);
      }, 500)();
      return '';
    });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 500);
    const { videos, pageInfo, searchTerm, selectedSearchVideos, selectedSavedVideos, savedVideos } = this.state;
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-12">
            <Header videoSearch={videoSearch} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <Nav />
              <Pages
                apiKey={API_KEY}
                term={searchTerm}
                videos={videos}
                addToSelected={this.addToSelected}
                removeFromSelected={this.removeFromSelected}
                selectedSearchVideos={selectedSearchVideos}
                selectedSavedVideos={selectedSavedVideos}
                savedVideos={savedVideos}
                saveVideos={this.saveVideos}
                deleteVideos={this.deleteVideos}
                pageInfo={pageInfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ytAPI from '../apiCall';

class SavedWrapper extends Component {
  showSavedVideos(key) {
    let video = {};
    const opts = {
      id: this.props.savedVideos[key].id,
      key: this.props.apiKey,
      part: 'snippet,contentDetails,statistics'
    };

    ytAPI('videos', 'GET', opts, (err, results, pageInfo, contentDetails) => {
      if (err) return console.log(err);
      video = { key, results, contentDetails };
    });
    return video;
  }
  selectVideo(id) {
    if (this.props.selectedSavedVideos[id]) {
      this.props.removeFromSelected(id, 'saved');
    } else {
      this.props.addToSelected(id, 'saved');
    }
  }
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  render() {
    let deleteButton = '';
    if (!this.isEmpty(this.props.savedVideos) && !this.isEmpty(this.props.selectedVideos)) {
      deleteButton = (
        <button type="submit">
          <i className="fa fa-floppy-o" aria-hidden="true" />
          <span>Save</span>
          <span>{Object.keys(this.props.selectedSavedVideos).length}</span>
        </button>
      );
    }
    return (
      <div className="SavedhWrapper col-md 9">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={e => this.props.deleteVideos(e)}>
              {Object.keys(this.props.savedVideos).map(key => {
                const video = this.showSavedVideos(key);
                console.log(video);
                let eleClass = '';
                if (this.props.selectedVideos[key] === key) {
                  eleClass = 'card selected';
                }
                return (
                  <div
                    id={`card${key}`}
                    key={key.id}
                    className={eleClass || 'card'}
                    onClick={() => {
                      this.selectVideo(key.id);
                    }}
                  >
                    <div className="card-block">
                      <div className="checkbox">
                        <div className="check" />
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <img src="" alt="" />
                        </div>
                        <div className="col-md-7">
                          <h4 className="card-title">""</h4>
                          <p className="card-text">""</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {deleteButton}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedWrapper;

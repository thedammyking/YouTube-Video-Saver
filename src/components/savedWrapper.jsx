import React, { Component } from 'react';

class SavedWrapper extends Component {
  selectVideo(id) {
    if (this.props.selectedSavedVideos[`video${id}`]) {
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
    if (!this.isEmpty(this.props.savedVideos) && !this.isEmpty(this.props.selectedSavedVideos)) {
      deleteButton = (
        <button className="delete_btn btn btn-danger" type="submit">
          <i className="fa fa-floppy-o" aria-hidden="true" />
          <span>Delete</span>
          <span className="count">{Object.keys(this.props.selectedSavedVideos).length}</span>
        </button>
      );
    }
    return (
      <div className="SavedWrapper col-md 9">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={e => this.props.deleteVideos(e)}>
              {Object.keys(this.props.savedVideos)
                .reverse()
                .map(key => {
                  const video = this.props.savedVideos;
                  let eleClass = '';
                  if (this.props.selectedSavedVideos[`video${video[key].id}`] === video[key].id) {
                    eleClass = 'card selected';
                  }
                  return (
                    <div
                      id={`card${video[key].id}`}
                      key={video[key].id}
                      className={eleClass || 'card'}
                      onClick={() => {
                        this.selectVideo(video[key].id);
                      }}
                    >
                      <div className="card-block">
                        <div className="checkbox">
                          <div className="check" />
                        </div>
                        <div className="row">
                          <div className="col-md-5">
                            <img src={video[key].thumbnails.medium.url} alt="" />
                          </div>
                          <div className="col-md-7">
                            <h4 className="card-title">{video[key].title}</h4>
                            <p className="card-text">{video[key].description}</p>
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

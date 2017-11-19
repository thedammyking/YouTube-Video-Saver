import React, { Component } from 'react';
class SearchWrapper extends Component {
  selectVideo(id) {
    if (this.props.selectedSearchVideos[`video${id}`]) {
      this.props.removeFromSelected(id, 'search');
    } else {
      this.props.addToSelected(id, 'search');
    }
  }
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  render() {
    let saveButton = '';
    if (!this.isEmpty(this.props.videos) && !this.isEmpty(this.props.selectedSearchVideos)) {
      saveButton = (
        <button className="save_btn btn btn-success" type="submit">
          <i className="fa fa-floppy-o" aria-hidden="true" />
          <span>Save</span>
          <span className="count">{Object.keys(this.props.selectedSearchVideos).length}</span>
        </button>
      );
    }
    return (
      <div className="SearchWrapper col-md-9">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={e => this.props.saveVideos(e)}>
              {this.props.videos.map(key => {
                let eleClass = '';
                if (this.props.selectedSearchVideos[`video${key.id}`] === key.id) {
                  eleClass = 'card selected';
                }
                return (
                  <div
                    id={`card${key.id}`}
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
                          <img src={key.thumbnails.medium.url} alt="" />
                        </div>
                        <div className="col-md-7">
                          <h4 className="card-title">{key.title}</h4>
                          <p className="card-text">{key.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {saveButton}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchWrapper;

import React, { Component } from 'react';
// import Video from '../apiCall';

class SearchWrapper extends Component {
  render() {
    return (
      <div className="SearchWrapper col-md 9">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.props.saveVideos}>
              {this.props.data.videos.map(key => {
                return (
                  <div key={key.id} className="card">
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchWrapper;

import React, { Component } from 'react';

class SavedWrapper extends Component {
  render() {
    return (
      <div className="SavedhWrapper col-md 9">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={e => this.props.deleteVideos(e)}>
              {this.props.savedVideos.reverse().map(key => {
                let url = `
                  https://content.googleapis.com/youtube/v3/videos?id=${key.id}&key=${this.props
                  .apiKey}&part=snippet%2CcontentDetails%2Cstatistics`;
                fetch(url)
                  .then(resp => resp.json()) // Transform the data into json
                  .then(data => data.items[0].snippet)
                  .then(snippet => {
                    const cardBlock = `<div class="card-block">
                        <div class="checkbox">
                          <div class="check"></div>
                        </div>
                        <div class="row">
                          <div class="col-md-5">
                            <img src=${snippet.thumbnails.medium.url} alt="" />
                          </div>
                          <div class="col-md-7">
                            <h4 class="card-title">${snippet.title}</h4>
                            <p class="card-text">${snippet.description}</p>
                          </div>
                        </div>
                      </div>`;
                    let card = document.querySelector(`#card${key.id}`);
                    card.innerHTML = cardBlock;
                  });
                return <div id={`card${key.id}`} key={key.id} className="card" />;
              })}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedWrapper;

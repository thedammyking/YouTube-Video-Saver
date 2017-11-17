import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }
  render() {
    return (
      <div className="search-bar  col-md-6 col-sm-12 collapse navbar-collapse">
        <div className="input-group">
          <input
            onChange={e => this.onInputChange(e.target.value)}
            value={this.state.term}
            type="text"
            className="form-control"
            placeholder="Search"
          />
          <span className="input-group-btn" />
        </div>
      </div>
    );
  }
  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;

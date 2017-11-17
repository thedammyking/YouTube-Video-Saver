import React, { Component } from 'react';
import SearchBar from './searchBar';
import '../css/header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header row">
        <div className="col-md-12">
          <nav className="navbar-toggleable-md navbar-inverse">
            <div className="row">
              <button
                className="navbar-toggler navbar-toggler-right hidden-lg-up"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="col-md-4 col-sm-12">
                <h3>YouTube ADS</h3>
              </div>
              <SearchBar term={this.props.term} onSearchTermChange={this.props.videoSearch} />
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;

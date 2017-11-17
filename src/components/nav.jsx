import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';

const Nav = props => {
  return (
    <nav className="Nav col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <ul className="nav nav-pills flex-column">
        <li
          onClick={e => {
            activateLink(e);
          }}
          className="nav-item"
        >
          <Link to="/search" className="nav-link">
            <span>
              <i className="fa fa-search" aria-hidden="true" />
            </span>Search
          </Link>
        </li>
        <li
          onClick={e => {
            activateLink(e);
          }}
          className="nav-item"
        >
          <Link to="/saved" className="nav-link">
            <span>
              <i className="fa fa-floppy-o" aria-hidden="true" />
            </span>Saved
          </Link>
        </li>
      </ul>
    </nav>
  );
};
const activateLink = e => {
  const links = Array.from(document.querySelectorAll('.Nav .nav li'));
  links.map(link => {
    return (link.className = 'nav-item');
  });
  e.target.parentNode.setAttribute('class', 'active-nav nav-item');
};

export default Nav;

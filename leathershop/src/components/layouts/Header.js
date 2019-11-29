import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

const HeaderBase = props => {
  const logout = () => {
    props.firebase.auth.signOut();
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-header__logo">
        TrangLy
      </Link>
      {/* Sidebar toggle button*/}
      <Link
        to="/"
        className="app-sidebar__toggle"
        data-toggle="sidebar"
        aria-label="Hide Sidebar"
      />
      {/* Navbar Right Menu*/}
      <ul className="app-nav">
        <li className="app-search">
          <input
            className="app-search__input"
            type="search"
            placeholder="Search"
          />
          <button className="app-search__button">
            <i className="fa fa-search" />
          </button>
        </li>
        <li className="app-nav__item">
          <i className="fa fa-bell-o fa-lg" />
        </li>
        <li className="app-nav__item" >
          <Link to="/" onClick={logout} >
            <i className="fa fa-sign-out logout fa-1x"/>
          </Link>
        </li>
      </ul>
    </header>
  );
};

const Header = withFirebase(HeaderBase);

export default Header;

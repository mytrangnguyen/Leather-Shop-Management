import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <Link to="/">LyTrang Pro </Link>
        <span>© 2018 creativeLabs.</span>
      </div>
      <div className="ml-auto">
        <span>Powered by</span>
        <Link to="/"> LyTrang Pro</Link>
      </div>
    </footer>
  );
}

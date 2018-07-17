import React from "react";
import "./App.css";

/**
 * The Nav component display the navbar
 *
 * @class Nav
 * @extends {React.Component}
 */
class Nav extends React.Component {

  /**
   * Render Navbar
   *
   * @returns component
   * @memberof Nav
   */
  render() {
    return (
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
    );
  }
}

export default Nav;

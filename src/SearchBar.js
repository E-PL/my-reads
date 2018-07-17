import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

/**
 * The Search Bar component handles search input
 *
 * @class SearchBar
 * @extends {React.Component}
 */
class SearchBar extends React.Component {
  
  /**
   * Local state holds the search query
   *
   * @memberof SearchBar
   */
  state = { value: "" };

  /**
   * Save the search query on local state
   *
   * @param {ChangeEvent} e The change event that fires when the input text changes
   */
  searchHandle = e => {
    this.setState({ value: e.target.value });
  };

  /**
   * When the component is updated and local state has changed,
   * call the SearchPage search method in SearchPage.js
   *
   * @memberof SearchBar
   */
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state === prevState) {
      return;
    }
    this.props.doSearch(this.state.value);
  };

  /**
   * Render SearchBar
   *
   * @returns component
   * @memberof SearchBar
   */
  render() {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={e => this.searchHandle(e)}
            value={this.state.value}
            placeholder="Search by title or author"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;

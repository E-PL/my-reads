import React from "react";
import "./App.css";
import BookList from "./BookList.js";

/**
//  * The Search Results component handles search result diplay
 *
 * @class SearchResults
 * @extends {React.Component}
 */
class SearchResults extends React.Component {

  /**
   * Render SearchResults
   *
   * @returns component
   * @memberof SearchResults
   */
  render() {
    if (!this.props.books) {
      return;
    }
    return (
      <div className="search-books-results">
        <BookList
          update={this.props.update}
          shelf= 'none'
          data={this.props.books}
          booksInShelf={this.props.booksInShelf}
        />
      </div>
    );
  }
}

export default SearchResults;

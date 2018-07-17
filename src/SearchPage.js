import React from "react";
import "./App.css";
import SearchBar from "./SearchBar.js";
import SearchResults from "./SearchResults.js";
import * as BooksAPI from "./BooksAPI";

/**
 * The Search Page component handles searching
 *
 * @class SearchPage
 * @extends {React.Component}
 */
class SearchPage extends React.Component {
 
  /**
   * Local State holds the search results
   *
   * @memberof SearchPage
   */
  state = { books: [] };

  /**
   * Update local state with search results
   *
   * @param {Array} books The books fetched from the API
   * @memberof SearchPage
   */
  stateUpdate = books => {
    this.setState(oldState => {
      return { books: books };
    });
  };

  /**
   * Reset local state
   *
   *
   * @memberof SearchPage
   */
  resetState = () => {
    this.setState(oldState => {
      return { books: [] };
    });
  };

  /**
   * Search for books
   *
   * @param {String} query
   * @memberof SearchPage
   */
  search = query => {
    // Request results to the API for the current query
    BooksAPI.search(query)
      .then(response => {
        // Catch empty query errors
        if (!response && !query) {
          throw new Error("Empty query");
        }
        // Catch API error response
        if (response && response.error) {
          throw new Error("Error message: " + response.error);
        } else {
          return response;
        }
      })
      // Save results to local state
      .then(results => this.stateUpdate(results))
      // If any error occurs, reset local state
      .catch(error => {
        this.resetState();
      });
  };

  /**
   * Render SearchPage
   *
   * @returns component
   * @memberof SearchPage
   */
  render() {
    return (
      <div className="search-books">
        <SearchBar doSearch={this.search} />
        <SearchResults
          update={this.props.update}
          books={this.state.books}
          booksInShelf={this.props.booksInShelf}
        />
      </div>
    );
  }
}

export default SearchPage;

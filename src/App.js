import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import Nav from "./Nav.js";
import Shelf from "./Shelf.js";
import AddButton from "./AddButton.js";
import SearchPage from "./SearchPage.js";

/**
 * Main component
 *
 * @class BooksApp
 * @extends {React.Component}
 */
class BooksApp extends React.Component {
  
  /**
   * Local state holds the selected books
   *
   * @memberof BooksApp
   */
  state = { books: [] };

  /**
   * Before the initial render, fetch the books from the API
   *
   * @memberof BooksApp
   */
  componentWillMount = () => {
    BooksAPI.getAll()
      .then(response => {
        if (response) {
          this.setState({ books: response });
        }
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  /**
   * Move the book to a shelf of choice
   * (Called from the SearchSelector component)
   * Request the book update to the API
   * then call this.stateUpdate() to update local state
   *
   * @param {Object} book      The book to move
   * @param {string} shelf     The shelf to put it
   * @param {string} oldShelf  The shelf where the book was
   * @memberof BooksApp
   */
  moveBook = (book, shelf, oldShelf) => {
    BooksAPI.update(book, shelf)
      .catch(err => {
        throw new Error(err.message);
      })
      .then(response => this.stateUpdate(response, book, shelf, oldShelf));
  };

  /**
   * Update local state with the new book location,
   * or delete the book from the array if the new location is 'none'
   *
   * @param {*} response    The response to the API request
   * @param {*} bookToMove  The book to move
   * @param {*} shelf       The shelf to put it
   * @param {*} oldShelf    The shelf where the book was
   */
  stateUpdate = (response, bookToMove, shelf, oldShelf) => {
    // If the book wasn't in the collection,
    // add the shelf property and save it to local state
    if (oldShelf === "none") {
      bookToMove.shelf = shelf;
      const newState = this.state.books.concat(bookToMove);
      this.setState({ books: newState });
    }
    // If the book was in the collection, remove it,
    // modify the shelf property, and add the modified one
    if (oldShelf !== "none") {
      // Find the book in local state,
      //  just to be sure it was really in the collection
      let updatedBook = this.state.books
        .filter(book => {
          return book.id === bookToMove.id;
        })
        // Update the shelf property with the new location
        .map(book => {
          book.shelf = shelf;
          return book;
        });
      let newState;
      // If the new location is on a shelf,
      //  remove the old book object and append the updated one
      if (shelf !== "none") {
        newState = this.state.books
          .filter(book => {
            return book.id !== bookToMove.id;
          })
          .concat(updatedBook);
      }
      // If the new location is off the shelf, filter out the book
      if (shelf === "none") {
        newState = this.state.books.filter(book => {
          return book.id !== bookToMove.id;
        });
      }
      // Save the modified array to local state
      this.setState({ books: newState });
    }
  };

  /**
   * Render App
   *
   * @returns component
   * @memberof BooksApp
   */
  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <Nav />
              <div className="list-books-content">
                <div>
                  <Shelf
                    title="Currently Reading"
                    shelf="currentlyReading"
                    update={this.moveBook}
                    data={this.state.books.filter(
                      book => book.shelf === "currentlyReading"
                    )}
                  />
                  <Shelf
                    title="Want to Read"
                    shelf="wantToRead"
                    update={this.moveBook}
                    data={this.state.books.filter(
                      book => book.shelf === "wantToRead"
                    )}
                  />
                  <Shelf
                    title="Read"
                    shelf="read"
                    update={this.moveBook}
                    data={this.state.books.filter(
                      book => book.shelf === "read"
                    )}
                  />
                </div>
              </div>
              <AddButton />
            </div>
          )}
        />

        <Route
          path="/search"
          exact
          render={() => (
            <SearchPage
              update={this.moveBook}
              booksInShelf={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

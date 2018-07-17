import React from "react";
import "./App.css";
import Book from "./Book.js";

/**
 * The Book List component handles listing books
 *
 * @class BookList
 * @extends {React.Component}
 */
class BookList extends React.Component {
  
  /**
   * Render BookList
   *
   * @returns component
   * @memberof BookList
   */
  render() {
    return (
      <ol className="books-grid">
        {this.props.data.map((book, index) => (
          <li key={index}>
            <Book
              shelf={this.props.shelf}
              update={this.props.update}
              key="{index}"
              data={book}
              booksInShelf={this.props.booksInShelf ? this.props.booksInShelf : ''}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default BookList;

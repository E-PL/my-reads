import React from "react";
import "./App.css";
import BookList from "./BookList.js";

/**
 * The Shelf component holds a book list
 *
 * @class Shelf
 * @extends {React.Component}
 */
class Shelf extends React.Component {
  state = {};

  /**
   * Render Shelf
   *
   * @returns component
   * @memberof Shelf
   */
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookList
            update={this.props.update}
            shelf={this.props.shelf}
            data={this.props.data}
          />
        </div>
      </div>
    );
  }
}

export default Shelf;

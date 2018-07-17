import React from "react";
import "./App.css";
import ShelfSelector from "./ShelfSelector.js";
import DefaultImage from "./icons/thumbnail.svg";



/**
 * The Book component handles diplaying books
 *
 * @class Book
 * @extends {React.Component}
 */
class Book extends React.Component {
  
  /**
   * Local state holds the book cover image url
   *
   * @memberof Book
   */
  state = { thumbnail: DefaultImage };

  /**
   * Before the initial render check if the book cover image url was passed with props,
   * if it wasn't, save a placeholder image url to local state instead
   *
   * @memberof Book
   */
  componentDidMount = () => {
    const thumbnail = this.props.data.imageLinks
      ? this.props.data.imageLinks.thumbnail
      : DefaultImage;
    this.setState({ thumbnail: thumbnail });
  };

  /**
   * When the Book props are updated, check if the book cover image url is present,
   * if it's not, save a placeholder image url to local state instead
   *
   * @memberof Book
   */
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props === prevProps) {
      return;
    }
    const thumbnail = this.props.data.imageLinks
      ? this.props.data.imageLinks.thumbnail
      : DefaultImage;
    this.setState({ thumbnail: thumbnail });
  };

  /**
   * Render Book
   *
   * @returns component
   * @memberof Book
   */
  render() {
    // TODO: add empty values handling
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            alt={
              this.props.data.title
                ? this.props.data.title + " thumbnail"
                : "Default book thumbnail"
            }
            style={{
              width: 128,
              height: 170,
              backgroundImage: "url(" + this.state.thumbnail + ")"
            }}
          />
          <ShelfSelector
            update={this.props.update}
            book={this.props.data}
            currentShelf={
              this.props.data.shelf ? this.props.data.shelf : "none"
            }
            booksInShelf={
              this.props.booksInShelf ? this.props.booksInShelf : ""
            }
          />
        </div>
        <div className="book-title">{this.props.data.title}</div>
        <div className="book-authors">
          {this.props.data.authors ? this.props.data.authors.join(" ") : "ND"}
        </div>
      </div>
    );
  }
}

export default Book;

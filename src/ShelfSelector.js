import React from "react";
import "./App.css";

/**
 *  The Shelf Selector component handles adding and rearranging books on the shelves
 *
 * @class ShelfSelector
 * @extends {React.Component}
 */
class ShelfSelector extends React.Component {
  
  /**
   * Local state holds the current location of the book
   *
   * @memberof ShelfSelector
   */
  state = {};

  /**
   * Before the initial render load the book location from props
   * and store it in local state
   *
   * @memberof ShelfSelector
   */
  componentDidMount = () => {
    this.setState(oldState => {
      return { value: this.props.currentShelf };
    });
  };

  /**
   * When the Shelf Selector is updated, search for the book location on the shelf
   * and store it in local state.
   * In this way the correct shelf will be displayed on the search page
   *
   *
   * @memberof ShelfSelector
   */
  componentDidUpdate = () => {
    // check if the list of books is stored in props
    // ( the list is passed by props only on the search page)
    if (this.props.booksInShelf) {
      // search the list of books to find if the book is already in the list
      const booksIHave = this.props.booksInShelf;
      const thisBook = this.props.book;
      let bookIHave = booksIHave.filter(book => {
        return thisBook.id === book.id;
      });
      // if the book is on the list extract the book location
      if (bookIHave.length !== 0) {
        const value = bookIHave[0].shelf;
        // if the location saved in local state is not correct, update it
        if (this.state.value !== value) {
          this.setState(oldState => {
            if (oldState !== value) {
              return { value: value };
            }
          });
        }
      }
    }
  };

  /**
   * When a different location for the book is selected call the BooksApp moveBook() method in App.js
   * and update local state
   *
   * @param {ChangeEvent} e The change event generated by changing selected shelf
   */
  handleChange = e => {
    // pass the book, the new location, the old location to BooksApp.moveBook
    this.props.update(this.props.book, e.target.value, this.state.value);
    // save the new location to local state
    const value = e.target.value;
    this.setState(oldState => {
      return { value: value };
    });
  };

  /**
   * Render ShelfSelector
   *
   * @returns component
   * @memberof ShelfSelector
   */
  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={e => this.handleChange(e)} value={this.state.value}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfSelector;
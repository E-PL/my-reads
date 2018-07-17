import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

class AddButton extends React.Component {
  render() {
    return (
      <div className="open-search">
        {/* use the Link component from react-router-dom instead of a link element */}
        <Link to="/search">Add a book</Link>
      </div>
    );
  }
}

export default AddButton;

import React from 'react'
import {Link} from 'react-router-dom'

class ListItem extends React.Component {

  render() {
    let book_id = this.props.book.id;
    let index = this.props.books.findIndex(book => {
      return book.id === book_id
    });
    let shelf;
    if(index > -1) {
      shelf = this.props.books[index].shelf;
    } else {
      shelf = "none";
    }
    return (
      <li>
        <div className='book'>
          <div className="book-top">
            <div className="book-shelf-changer">
              <select value={shelf} onChange={e =>
                this.props.updateSection(this.props.books[index] ||
                  this.props.book, e.target.value)}>
                <option value="select" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
            }}></div>
          </div>
          <Link to={'/books/' + this.props.book.id} style={{
            textDecoration: "none",
            color: "black",
            textAlign: "center"
          }}>
            <div className="book-title">{this.props.book.title}</div>
            <ul className="book-authors">{this.props.book.authors &&
              (this.props.book.authors.map((author, index) => (
                <li key={index}>{author}</li>
              )))}</ul>
          </Link>
        </div>
      </li>
    )
  }
}

export default ListItem

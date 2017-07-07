import React from 'react'
import {Link} from 'react-router-dom'

const ListItem = props => {
    return (
      <li>
        <div className='book'>
          <div className="book-top">
            <div className="book-shelf-changer">
              <select value={props.getShelf(props.book)} onChange={
                e => props.updateSection(props.book, e.target.value)}>
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
              backgroundImage: `url(${props.book.imageLinks.thumbnail})`
            }}></div>
          </div>
          <Link to={'/books/' + props.book.id} style={{
            textDecoration: "none",
            color: "black",
            textAlign: "center"
          }}>
            <div className="book-title">{props.book.title}</div>
            <ul className="book-authors">{props.book.authors &&
              (props.book.authors.map((author, index) => (
                <li key={index}>{author}</li>
              )))}</ul>
          </Link>
        </div>
      </li>
    )
}

export default ListItem

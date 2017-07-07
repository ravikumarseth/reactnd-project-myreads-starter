import React from 'react'
import ListItem from './ListItem'

const BookSection = props => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => <ListItem key={book.id}
                                          book={book}
                                          getShelf={props.getShelf}
                                          updateSection={props.updateSection}/>
                                )
          }
        </ol>
      </div>
    </div>
  )
}

export default BookSection

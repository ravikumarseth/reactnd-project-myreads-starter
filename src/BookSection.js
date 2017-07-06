import React from 'react'
import ListItem from './ListItem'

class BookSection extends React.Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.heading}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
              <ListItem key={book.id}
                book={book}
                updateSection={this.props.updateSection}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSection

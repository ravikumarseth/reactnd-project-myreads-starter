import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListItem from './ListItem'
import BookSection from './BookSection'
import {Route, Link} from 'react-router-dom'
import BookDetail from './BookDetail'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  updateSection = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  getShelf = (book) => {
    let book_id = book.id;
    let index = this.state.books.findIndex(book => book.id === book_id);
    let shelf;
    if (index > -1) {
      shelf = this.state.books[index].shelf;
    } else {
      shelf = "none";
    }
    return shelf;
  }

  searchBooks = (e) => {
    let query = e.target.value
    if (query) {
      BooksAPI.search(query, 20).then(
        searchedBooks => this.setState({searchedBooks})
      )
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/'
          render={() => (
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookSection heading="Currently Reading"
                        updateSection={this.updateSection}
                        getShelf={this.getShelf}
                        books={this.state.books.filter(book => {
                          return book.shelf === 'currentlyReading'
                        })}
                    />
                    <BookSection heading="Want to Read"
                        updateSection={this.updateSection}
                        getShelf={this.getShelf}
                        books={this.state.books.filter(book => {
                          return book.shelf === 'wantToRead'
                        })}
                    />
                    <BookSection heading="Read"
                        updateSection={this.updateSection}
                        getShelf={this.getShelf}
                        books={this.state.books.filter(book => {
                          return book.shelf === 'read'
                        })}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            </div>
          )}
        />
        <Route exact path='/search'
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text"
                    placeholder="Search by title or author"
                    onChange={this.searchBooks}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.searchedBooks.length > 0 &&
                    this.state.searchedBooks.map(
                      book => <ListItem key={book.id}
                        book={book}
                        getShelf={this.getShelf}
                        updateSection={this.updateSection} />
                        )
                  }
                </ol>
              </div>
            </div>
          )}
        />
        <Route exact path='/books/:id'
            render={({match}) => (<BookDetail id={match.params.id}
                                    books={this.state.books}
                                    searchedBooks={this.state.searchedBooks}
                                   />
                                  )
                    }
        />
      </div>
    )
  }
}

export default BooksApp

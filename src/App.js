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
    BooksAPI.search("a", 20).then(searchedBooks => this.setState({searchedBooks}))
  }

  updateSection = (e, id) => {
    let index = this.state.books.findIndex(book => {
      return book.id === id
    })
    if (index > -1) {
      BooksAPI.update(this.state.books[index], e)
      let b = this.state.books.splice(index, 1)
      b[0].shelf = e
      if (e !== 'none') {
        this.setState({books: this.state.books.concat(b)})
      } else {
        this.setState({books: this.state.books})
      }
    } else {
      index = this.state.searchedBooks.findIndex(book => {
        return book.id === id
      })
      if (index > -1) {
        BooksAPI.update(this.state.searchedBooks[index], e)
        let b = this.state.searchedBooks.splice(index, 1)
        b[0].shelf = e
        this.setState({books: this.state.books.concat(b), searchedBooks: this.state.searchedBooks})
      }
    }
  }

  searchBooks = (e) => {
    let query = e.target.value
    if (query) {
      BooksAPI.search(query, 20).then(searchedBooks => this.setState({searchedBooks}))
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookSection heading="Currently Reading" updateSection={this.updateSection} books={this.state.books.filter(book => {
                    return book.shelf === 'currentlyReading'
                  })}/>
                  <BookSection heading="Want to Read" updateSection={this.updateSection} books={this.state.books.filter(book => {
                    return book.shelf === 'wantToRead'
                  })}/>
                  <BookSection heading="Read" updateSection={this.updateSection} books={this.state.books.filter(book => {
                    return book.shelf === 'read'
                  })}/>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks.length > 0 && this.state.searchedBooks.filter(book => {
                  return book.shelf === 'none' && this.state.books.findIndex(b => {
                    return b.id === book.id
                  }) === -1
                }).map(book => <ListItem key={book.id} book={book} updateSection={this.updateSection}/>)}
              </ol>
            </div>
          </div>
        )}/>
        <Route exact path='/books/:id' render={({match}) => (<BookDetail id={match.params.id} books={this.state.books} searchedBooks={this.state.searchedBooks}/>)}/>
      </div>
    )
  }
}

export default BooksApp

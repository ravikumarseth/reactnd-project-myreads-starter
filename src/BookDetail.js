import React from 'react'
import {Link} from 'react-router-dom'

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      publishedDate: "",
      pageCount: "",
      thumbnail: "",
      description: "",
      authors: "",
      publisher: ""
    }
  }

  // Used when book is opened via a click from homepage / search page
  componentDidMount() {
    this.update(this.props)
  }

  // Used when book is opened directly via url
  componentWillReceiveProps(nextProps) {
    this.update(nextProps)
  }
  update = (prop) => {
    let index = prop.books.findIndex(book => {
      return book.id === prop.id
    })
    let book = {}
    if (index > -1) {
      book = prop.books[index]
    } else {
      index = prop.searchedBooks.findIndex(book => {
        return book.id === prop.id
      })
      book = prop.searchedBooks[index]
    }
    if (index > -1 && book) {
      this.setState({
        title: book.title,
        subtitle: book.subtitle,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        thumbnail: book.imageLinks.thumbnail,
        description: book.description,
        authors: book.authors,
        publisher: book.publisher
      })
    } else {
      this.setState({
        title: "Technical Difficulties, Can't Find This Book",
        subtitle: "Please wait or Come Back Later",
        publishedDate: "NA",
        pageCount: "NA",
        thumbnail: "http://caseiv.org/wp-content/uploads/2010/02/noimage.png",
        description: "NA",
        authors: [],
        publisher: "NA"
      })
    }
  }
  render() {
    return (
      <div className="app books">
        <Link to='/' className="back-button">Close</Link>
        <div className="book-details-title">
          <h1>{this.state.title}</h1>
          <h2>{this.state.subtitle}</h2>
        </div>
        <div className="book-details">
          <div className="book-information">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.state.thumbnail})`
            }}></div>
            {this.state.authors.length > 0 && (
              <div className="book-data">
                <span className="title">Author(s):
                </span>
                <ul className="value">{
                  this.state.authors.map((author, index)=> (
                    <li key={index}>{author}</li>
                  ))}</ul>
              </div>
            )}
            {this.state.pageCount && (
              <div className="book-data">
                <span className="title">Pages:
                </span>
                <span className="value">{this.state.pageCount}</span>
              </div>
            )}
            {this.state.publishedDate && (
              <div className="book-data">
                <span className="title">Published On:
                </span>
                <span className="value">{this.state.publishedDate}</span>
              </div>
            )}
            {this.state.publisher && (
              <div className="book-data">
                <span className="title">Publisher:
                </span>
                <span className="value">{this.state.publisher}</span>
              </div>
            )}
          </div>
            <div className="book-description">
              <span className="title">Description:
              </span><br/>
              <span className="value">{this.state.description
                || "Description Not Found!"}</span>
            </div>
        </div>

      </div>
    )
  }
}

export default BookDetail

import React from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

import Book from './Book'

import './App.css'

class BookShelves extends React.Component {

  shelves = [
      {
        id : 'currentlyReading',
        title : 'Currently Reading'
      },
      {
        id : 'read',
        title : 'Read'
      },
      {
        id : 'wantToRead',
        title : 'Want to Read'
      }
  ]

  render() {

    let {books} = this.props;
    return (

      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves.map( (shelf) => (
                  <div className="bookshelf" key={shelf.id}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">{
                        books.filter((book)=>book.shelf === shelf.id).map( book => <li key={book.id}> <Book book={book}/></li>)
                      }</ol>
                    </div>
                  </div>
                  ))
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }
}

function mapStateToProps( state, ownprops ) {

  return {
    books : state
  }
}

export default connect(mapStateToProps)(BookShelves);

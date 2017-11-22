import React from 'react'
import {Link} from 'react-router-dom'

import Book from './Book'

import './App.css'

class BookShelves extends React.Component {

  render() {

    let {books, shelves} = this.props;
    return (

      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map( (shelf) => (
                  <div className="bookshelf" key={shelf.id}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">{
                        books.filter((book)=>book.shelf === shelf.id).map( book => <li key={book.id}> <Book book={book} shelfChangeHandler={this.props.shelfManager.moveToShelf}/></li>)
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

export default BookShelves

import React from 'react'
import {Route,Link} from 'react-router-dom'

import BookShelf from './BookShelf'
import Search from './Search'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount = () => {
    this.refresh();
  }

  /* fetch list of books from server and updates books array in the state */
  refresh = ()=> {
    BooksAPI.getAll().then((response)=>{
      this.setState({books:response});
      console.log('Refresh complete');
    });
  }

  getBookShelf = ( book ) => {
    var match = this.state.books.findIndex((b)=>b.id === book.id);

    if ( match !== -1 ) return this.state.books[match].shelf;
    else return "none";
  }

  /**
   * Move book to a shelf, updates db, and retrieve the updated data from db and re-initialize state */
  moveToShelf = ( book, shelf )=> {
    console.log('Moving ' + book.title +' to ' + shelf);
    BooksAPI.update( {id: book.id}, shelf ).then(()=>{
      this.refresh();
    });
  }

  render() {
    return (
      <div className="app">
      
        <Route exact path='/search' render={ ()=> (
          <Search shelfChangeHandler={this.moveToShelf} shelfSearchHandler={this.getBookShelf} />
        )} />

        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.state.books.filter( book=> book.shelf === 'currentlyReading')} title='Currently Reading' shelfChangeHandler={this.moveToShelf}/>
                <BookShelf books={this.state.books.filter( book=> book.shelf === 'read')} title='Read' shelfChangeHandler={this.moveToShelf} />
                <BookShelf books={this.state.books.filter( book=> book.shelf === 'wantToRead')} title='Want to Read' shelfChangeHandler={this.moveToShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    ) 
  }
}

export default BooksApp

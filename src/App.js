import React from 'react'
import {Route,Link} from 'react-router-dom'

import Book from './Book'
import BookShelf from './BookShelf'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
    searchResults : []
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

  search = (event) => {

    if ( event.target.value.trim().length===0 ) {
      this.setState({searchResults:[]});
      return;
    }

    BooksAPI.search(event.target.value, 20).then(response=>{

      let tmpSearchRes = [];
      if( !response.error ) tmpSearchRes = response;

      tmpSearchRes.forEach((book) => {
        this.updateBookshelf(book);
      })

      this.setState({searchResults:tmpSearchRes});
    });
  }

  updateBookshelf = ( book ) => {
    let index = this.state.books.findIndex((b)=>b.id === book.id);
    if( index !== -1 ) {
      console.log(book.title +" is " + this.state.books[index].shelf);
      book.shelf = this.state.books[index].shelf;
    }
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
          
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.search}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { 
                  this.state.searchResults.map(b=>(<li key={b.id}><Book key={b.id} book={b} shelfChangeHandler={this.moveToShelf}/></li>) )
                }
              </ol>
            </div>
          </div>
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

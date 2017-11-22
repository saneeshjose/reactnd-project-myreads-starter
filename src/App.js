import React from 'react'
import {Route} from 'react-router-dom'

import BookShelves from './BookShelves'
import Search from './Search'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books : []
  }

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

  ShelfManager = {

    /* Returns shelf for a given book */
    findBook : ( id ) =>  this.state.books.find( (book) => book.id === id),

    /*
     * Move book to a shelf, updates db, and returns a promise
     */
    moveToShelf : ( book, shelf )=> {

       BooksAPI.update( {id: book.id}, shelf ).then((response)=>{
          //Update the books array
          this.setState( (state) => {
            book.shelf = shelf;
            return { books : state.books.filter( (b) => b.id !== book.id ).concat([book]) };
          });
        })
    }
  }

  componentDidMount = () => {
    this.refresh();
  }


  /* fetch list of books from server and updates books array in the state */
  refresh = ()=> {
    BooksAPI.getAll().then((books)=>{
      this.setState ( {books});
    });
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/search" render={ ()=> (
          <Search shelfManager={this.ShelfManager} />
        )} />

        <Route exact path="/" render={ () => (
          <BookShelves shelves={this.shelves} books={this.state.books} shelfManager={this.ShelfManager}/>
        )} />

      </div>
    )
  }
}

export default BooksApp

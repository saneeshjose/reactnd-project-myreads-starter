import React from 'react'
import {Route} from 'react-router-dom'

import BookShelves from './BookShelves'
import Search from './Search'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    shelves : [
      {
        id : 'currentlyReading',
        title : 'Currently Reading',
        books : []
      },
      {
        id : 'read',
        title : 'Read',
        books : []
      },
      {
        id : 'wantToRead',
        title : 'Want to Read',
        books : []
      }
    ],
    bookIndex : []
  }

  ShelfManager = {

    /**
     * Puts the books to their appropirate shelves.
     * Books with no/unknown shelf attributes are ignored
     * Also creates an index to look up which shelf a given book belongs to
     */
    fillBooks : ( books ) => {

      this.setState ( (state) => {

        //Create a temporary array copying from the state, since state should not be mutated directly
        let tmpShelves = [...this.state.shelves];

        //Index of books by shelf id
        let tmpIndex = [];

        //Empty the books before filling the shelves
        tmpShelves.forEach( (shelf) => {
          shelf.books = [];
        })

        books.forEach( book => {
          let sMatch = tmpShelves.find( (shelf) => book.shelf === shelf.id )
          sMatch && sMatch.books.push(book);
          tmpIndex[ book.id ] = sMatch.id;
        })

        return {
          shelves : tmpShelves,
          bookIndex : tmpIndex
        }

      });
    },

    /* Returns shelf for a given book */
    findShelf : ( book ) => (this.state.bookIndex[book.id] || 'none' ),

    /*
     * Move book to a shelf, updates db, and returns a promise
     */
    moveToShelf : ( book, shelf )=> {
      return new Promise( (resolve, reject) => {

        BooksAPI.update( {id: book.id}, shelf ).then((response)=>{
          resolve();
        })
        .catch((error)=> {
          reject(error);
        });

      } );
    }
  }

  componentDidMount = () => {
    this.refresh();
  }

  /* fetch list of books from server and updates books array in the state */
  refresh = ()=> {
    BooksAPI.getAll().then((books)=>{
      this.ShelfManager.fillBooks(books);
    });
  }


  render() {

    return (
      <div className="app">

        <Route exact path="/search" render={ ()=> (
          <Search shelfManager={this.ShelfManager} />
        )} />

        <Route exact path="/" render={ () => (
          <BookShelves shelves={this.state.shelves} shelfManager={this.ShelfManager}/>
        )} />

      </div>
    )
  }
}

export default BooksApp

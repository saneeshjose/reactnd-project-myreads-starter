import React from 'react'
import {Route} from 'react-router-dom'

import BookShelves from './BookShelves'
import Search from './Search'

import {addBookAction, moveToShelfAction} from './actions/actions'

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
     * Calls the service to update the db, on success, update the redux state
     */
    moveToShelf : ( book, shelf )=> {
       BooksAPI.update( {id: book.id}, shelf ).then((response)=>{
          //Update the books array
          this.setState( (state) => {
            this.props.store.dispatch( moveToShelfAction(book,shelf));
          });
        })
    }
  }

  componentDidMount = () => {

    this.setState ( {books : this.props.store.getState() } );

    this.props.store.subscribe(()=>{
      this.setState ( {books : this.props.store.getState()} );
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

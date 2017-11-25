import React from 'react'
import {Route} from 'react-router-dom'

import BookShelves from './BookShelves'
import Search from './Search'

import {addBookAction, moveToShelfAction} from './actions/actions'

import {connect} from 'react-redux'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  render() {

    return (
      <div className="app">

        <Route exact path="/search" render={ ()=> (
          <Search/>
        )} />

        <Route exact path="/" render={ () => (
          <BookShelves/>
        )} />

      </div>
    )
  }
}
export default connect()(BooksApp);

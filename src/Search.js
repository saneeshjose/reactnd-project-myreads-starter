import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Book from './Book'

import * as BooksAPI from './BooksAPI';

class Search extends Component {

	state = {
		books : []
	}

	render = ()=> {
		return (
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
                  this.state.books.map(b=><li key={b.id}>
                  			<Book key={b.id} book={b} shelfChangeHandler={this.props.shelfManager.moveToShelf}/>
                  		</li> )
                }
              </ol>
            </div>
          </div>
	) }

	search = (event) => {

	    if ( event.target.value.trim().length===0 ) {
	      this.setState({books:[]});
	      return;
	    }

	    BooksAPI.search(event.target.value, 20).then(response=>{

	      let tmpSearchRes = [];
	      if( !response.error ) tmpSearchRes = response;

	      tmpSearchRes.forEach((book) => {

	      	let m = this.props.shelfManager.findBook(book.id)

	        if ( m )
	        	book.shelf = m.shelf
	        else
	        	book.shelf = 'none';
	      })

	      this.setState({books:tmpSearchRes});
	    });
  }
}

Search.propType = {
	shelfChangeHandler : PropTypes.func.isRequired,
	shelfSearchHandler : PropTypes.func.isRequired
}

export default Search;
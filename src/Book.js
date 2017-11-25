import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'

import {moveToShelfAction} from './actions/actions'

import * as BooksAPI from './BooksAPI'

class Book extends Component {

	/**
	 * Renders Book component, and sets event handler for bookshelf change
	 **/
	render() {

			const {title,authors,shelf,imageLinks} = this.props.book;

			return (

					<div className="book">
		                <div className="book-top">
		                    <div className="book-cover" style={{
		                    	width: 128,
		                    	height: 193,
		                    	backgroundImage: `url(${imageLinks.smallThumbnail})`
		                    }} ref={ (bookcover) => this.bookcover = bookcover }></div>
		                    <div className="book-shelf-changer">
		                      <select onChange={(event)=>{
		                      	this.onShelfChange(this.props.book, event.target.value);
		                      }} value={shelf} >
		                        <option disabled>Move to...</option>
		                        <option value="currentlyReading">Currently Reading</option>
		                        <option value="wantToRead">Want to Read</option>
		                        <option value="read">Read</option>
		                        <option value="none">None</option>
		                      </select>
		                    </div>
                     	</div>
	                     <div className="book-title">{title}</div>
	                     <div className="book-authors">{authors!=null?authors.join():''}</div>
		            </div>
			)
	}

	/*Callback to notify shelf change to parent component */
	onShelfChange = (book, toShelf) => {
		this.bookcover.style['opacity'] = 0.4;

		BooksAPI.update( {id: book.id}, toShelf ).then((response)=>{
          this.props.dispatch( moveToShelfAction(book,toShelf));
        })
	}
}

Book.propTypes = {
	book : PropTypes.object.isRequired
}

export default connect()(Book);
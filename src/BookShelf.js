import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelf extends Component {

  /**
   * Renders BookShelf, proxy shelfChangeHandler between Book and BookApp
   **/

	render = () => ( 
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{this.props.books.map( book => <Book key={book.id} book={book} shelfChangeHandler={this.props.shelfChangeHandler}/>)}</ol>
              </div>
            </div> )
}

BookShelf.propTypes = {
  title : PropTypes.string.isRequired,
  books : PropTypes.array.isRequired
}

export default BookShelf;
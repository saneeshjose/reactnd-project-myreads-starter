import {
	INIT,
	ADD_BOOK,
	MOVE_TO_SHELF
} from '../actions/actions'

function booksReducer( books = [], action ) {

	switch( action.type ) {

		case ADD_BOOK :
			return books.concat([action.book]);

		case MOVE_TO_SHELF:
			const {book, shelf} = action;
			console.log( `Moving ${book.title} to ${shelf}`);

			book.shelf = shelf;
			return books.filter( (b) => b.id !== book.id ).concat([book]);

		default :
			return books;
	}
}

export {booksReducer}
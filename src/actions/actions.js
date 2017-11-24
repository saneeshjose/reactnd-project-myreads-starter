export const ADD_BOOK = 'ADD_BOOK';
export const MOVE_TO_SHELF = 'MOVE_TO_SHELF';

function addBookAction(book) {
	return {
		type : ADD_BOOK,
		book
	}
};

function moveToShelfAction(book, shelf) {
	return {
		type : MOVE_TO_SHELF,
		book,
		shelf
	}
}

export {addBookAction,moveToShelfAction}

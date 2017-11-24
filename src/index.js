import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import {createStore} from 'redux'
import {booksReducer} from './reducers/reducers'

import App from './App'
import './index.css'


BooksAPI.getAll().then((books)=>{

	const store = createStore(booksReducer, books );
    ReactDOM.render(<BrowserRouter><App store={store}/></BrowserRouter>, document.getElementById('root'));
});
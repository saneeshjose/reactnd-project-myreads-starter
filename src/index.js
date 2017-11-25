import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import {createStore} from 'redux'
import {booksReducer} from './reducers/reducers'

import {Provider} from 'react-redux'

import App from './App'
import './index.css'


BooksAPI.getAll().then((books)=>{

	const store = createStore(booksReducer, books );
    ReactDOM.render(
    	<Provider store={store}>
    		<BrowserRouter><App/></BrowserRouter>
    	</Provider>
    	, document.getElementById('root'));
});
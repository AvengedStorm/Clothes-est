import React from 'react';	
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

function reducer(state = {
    items: [],
  }, action){
  switch (action.type) {
      case "updateItems":
        state = {...state, comments: action.payload.item}
        break;
      default:
        console.log(action);
      }
      return state;
    }

const middlewares = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = [applyMiddleware(...middlewares), ];

    const store = createStore(
      reducer,
      composeEnhancers(applyMiddleware(thunk))
    );

    // Extensions
    export default store;
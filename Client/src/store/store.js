import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

function reducer(state = {
    items: [],
  }, action){
  switch (action.type) {
      case "addItem":
        state = {...state, items: [...state.items, action.payload]}
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

export default store;
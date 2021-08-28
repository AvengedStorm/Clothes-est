import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

function reducer(state = {
    items: [],
    darkmode: false,
  }, action){
  switch (action.type) {
    case 'openAccordion':
      // open the accordion and check if value is different
      if(action.payload == state.openAccordion) {
        state = {...state, openAccordion: null};
      } else {
        state = {...state, openAccordion: action.payload}
      }
    break;
    case 'togglestyle':
      state = {...state, darkmode: !state.darkmode};
    break;
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
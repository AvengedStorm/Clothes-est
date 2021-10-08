import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

function reducer(state = {
    items: [],
    openAccordion: false,
    darkmode: false,
    favorites: [],
    checkedOut: [],
    clothesDrawer: true,
    setSetter: [],
    drawerContent: [],
    currentUser: undefined,
  }, action){
  switch (action.type) {
    case 'openAccordion':
      state = {
        ...state,
        openAccordion: !state.openAccordion
      }
    break;
    case 'togglestyle':
      state = {...state, darkmode: !state.darkmode};
    break;
    case "addItem":
      state = {...state, items: [...state.items, action.payload]}
      console.log(state.items);
    break;
    case 'toggleFavorite':
      // console.log(action.payload);
      if(state.favorites.includes(action.payload)) {
        state = {
          ...state, 
          favorites: 
            [...state.favorites.filter(el => el !== action.payload)]}
      } else {
          state = 
          {...state, 
            favorites: 
              [...state.favorites, action.payload]}
      }
    break;
    case 'checkedOut':
      // console.log(action.payload);
      if(state.checkedOut.includes(action.payload)) {
        state = {
          ...state, 
          checkedOut: 
            [...state.checkedOut.filter(el => el !== action.payload)]}
      } else {
          state ={
            ...state, 
            checkedOut: 
              [...state.checkedOut, action.payload]}
      }
      // console.log(state.checkedOut);
    break;
    case 'saveSet':
      state = {
        ...state,
        setSetter: 
          [...state.setSetter, action.payload]
      }
    break;
    case 'clearDrawer':
      state = {
        ...state,
        checkedOut: []
      }
    break;
    case 'clothesDrawer':
      if(!action.payload) {
        state = {
          ...state, clothesDrawer: !state.clothesDrawer
        }
      } else {
        state = {
          ...state,
          clothesDrawer: action.payload
        }
      }
    break;
    case 'login':
      state = {...state, currentUser: action.payload};
      break;
    case 'logout':
      state = {...state, currentUser: undefined};
      break;
    default:
      // console.log(action);
    break;
    }
    return state;
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
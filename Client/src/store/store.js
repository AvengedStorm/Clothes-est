import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

function reducer(state = {
    items: [],
    darkmode: false,
    favorites: [],
    checkedOut: [],
    setSetter: [],
    drawerContent: [],
    currentUser: null
  }, action){
  switch (action.type) {
    case 'openAccordion':
      // open the accordion and check if value is different
      if(action.payload === state.openAccordion) {
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
    case 'addToDrawer':
      if(state.drawerContent.includes(action.payload)) {
        state = {
            ...state,
            drawerContent: 
              [...state.drawerContent.filter(el => el !== action.payload)]}
      } else {
        state = {
          ...state,
          drawerContent:
            [...state.drawerContent, action.payload]}
      };
      console.log(state.drawerContent);
    break;
    case 'clearDrawer':
      state = {
        ...state,
        checkedOut: []
      }
    break;
    case 'login':
      state = {...state, currentUser: [...state.currentUser, action.payload]}
      break;
    case 'logout':
      state = {...state, currentUser: null}
      break;
    default:
      console.log(action);
    break;
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
import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
function reducer(state = {
    items: [],
    openAccordion: false,
    darkmode: false,
    favorites: [],
    checkedOut: [],
    clothesDrawer: true,
    setSetter: [],
    drawerContent: [],
    currentUser: "",
    belongsTo: "",
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
          state = {
            ...state, 
              currentUser: 
                action.payload.token, 
              belongsTo: 
                action.payload.ID
              };
          break;
        case 'logout':
          state = {...state, currentUser: action.payload.currentUser, belongsTo: action.payload.belongsTo};
          console.log(state);
          break;
        default:
        break;
      }
  return state;
}
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
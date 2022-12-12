import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import { createStore } from 'redux'
import { Provider } from 'react-redux' 

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import 'swiper/swiper-bundle.css';
//import { MemoryRouter as Router } from 'react-router';
const store = createStore(rootReducer, composeWithDevTools()) // 스토어 생성

const root = ReactDOMClient.createRoot(document.getElementById("root")); 
root.render(
     
      <Provider store={store}>
      <App />
     </Provider>
     
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

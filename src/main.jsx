import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import globalslice from "./state/index.js"
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js'
import { adminApi } from './state/api.js'
import persistStore from 'redux-persist/es/persistStore';
import store from './state/index.js'
import { PersistGate } from 'redux-persist/integration/react'




const persistedStore = persistStore(store);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore} >
        <App />
      </PersistGate>

    </Provider>
  </React.StrictMode>
)

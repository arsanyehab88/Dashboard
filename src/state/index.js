/* import { createSlice } from "@reduxjs/toolkit";

let id = undefined
if(localStorage.getItem("User")) { id = JSON.parse(localStorage.getItem("User"))?._id }
console.log(id);
const initialState = {
    mode: "dark",
    userID: id
}

const globalslice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    },
})





export const { setMode } = globalslice.actions

export default globalslice.reducer */

import {configureStore} from '@reduxjs/toolkit'
 
//presist our store
import  storage  from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { adminApi } from './api.js'
import userSlice from './userSlice.js'

//reducers
const reducer = combineReducers({
    user:userSlice,
    [adminApi.reducerPath]:adminApi.reducer
})

const persistConfig = {
    key :"root",
    storage,
    blackList:[adminApi.reducerPath]
}


const persistedReducer = persistReducer(persistConfig , reducer)


//creating store

const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk,adminApi.middleware]
})

export default store;

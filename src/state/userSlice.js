import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "./api.js";

const initialState = {
    mode: "dark",
}
export const userSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    },
    extraReducers: (builder) => {
        //save user after sign up
        builder.addMatcher(adminApi.endpoints.SignUp.matchFulfilled, (state, { payload }) =>({
            ...state,
            user: payload.user,
          }))
        //save user after sign up
        builder.addMatcher(adminApi.endpoints.SignIn.matchFulfilled, (state, { payload }) => ({
      ...state,
      user: payload.user,
    }))
        //delete persist
        builder.addMatcher(adminApi.endpoints.LogOut.matchFulfilled, (state, { payload }) => ({
            ...state,
            user: null,
          }))

    }

})

export const {setMode}=userSlice.actions

export default userSlice.reducer

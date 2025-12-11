import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Feature/UserSlice"; 
import postsReducer from "../Feature/PostSlice"; 

export const store = configureStore({
    reducer: 
    {
        user: usersReducer,
        posts: postsReducer,


    },
})
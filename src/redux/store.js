import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import blogs from './reducers/blogs';

export const store = configureStore({
    reducer : {
        user,
        blogs
    }
})
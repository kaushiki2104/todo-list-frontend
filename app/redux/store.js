import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import todoReducer from './features/todoSlice';


export const store = configureStore({
    reducer:{
        auth:authReducer,
        todo: todoReducer,
    },
})
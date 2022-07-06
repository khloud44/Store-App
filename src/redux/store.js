import { configureStore } from "@reduxjs/toolkit";
import CartSlice  from "./reducer/CartSlice";
import LoginSclice from "./reducer/LoginSclice";
import UsersSlice from "./reducer/UsersSlice";


export const store =configureStore({
    reducer:{
        users:UsersSlice,
        cart:CartSlice,
        login:LoginSclice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, 
    })
});
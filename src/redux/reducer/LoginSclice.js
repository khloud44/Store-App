import {createSlice} from '@reduxjs/toolkit';
import db from '../../Data/db';

export const LoginSclice = createSlice({
    name: 'login',
    initialState : {
        currentUsers:[]
    },
    reducers: {
        loginUser: async(state,action) =>{
            await db.currentUser.add(action.payload);
        },
        logoutUser:async(state,action) => {
            
            db.currentUser.delete(action.payload.id);
        },
    }

})


export const {loginUser , logoutUser } = LoginSclice.actions;
export default  LoginSclice.reducer

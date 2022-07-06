import {createSlice} from '@reduxjs/toolkit';
import db from '../../Data/db';

export const UsersSlice = createSlice({
    name: 'users',
    initialState : {
        users:[]
    },
    reducers: {
        addUser: async(state,action) =>{
            await db.users.add(action.payload);
        },
        deleteUser:async(state,action) => {
            db.users.delete(action.payload.id);
            return state.users.map( x => x.id !== action.payload.id )
        },
        updateUser:async(state,action) => {
            await db.users.update(action.payload.id,{
                    name:action.payload.name,
                    email:action.payload.email,
                    password:action.payload.password
                })
        },
    }

})


export const {addUser , deleteUser , updateUser} = UsersSlice.actions;
export default  UsersSlice.reducer

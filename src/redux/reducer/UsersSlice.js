import {
    createSlice
} from '@reduxjs/toolkit';
import db from '../../Data/db';

export const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userData: {},
        successLogin: false,
        errorMessage:""
    },
    reducers: {
        getAllUsers:  state => {
            const users =  JSON.parse(localStorage.getItem('Store-users'));
            users ? state.users = [...users] : state.users = []
        },
        addUser:  (state, {
            payload
        }) => {
                state.users.push(payload);
                state.userData={...payload};
                state.successLogin = true;
                localStorage.setItem('Store-users', JSON.stringify(state.users));
            
        },
        loginUser:  (state, {
            payload
        }) => {
            const loginUser = state.users.filter(user => user.email === payload.email && user.password === payload.password);
            if (loginUser) {
                state.successLogin = true;
                state.userData = [...loginUser]
                state.errorMessage ="";
            } else {
                state.errorMessage ="Your email or password is incorrect";
                state.successLogin = false;
            }
        },
        deleteUser:  (state, action) => {
            db.users.delete(action.payload.id);
            return state.users.map(x => x.id !== action.payload.id)
        },
        updateUser:  (state, action) => {
                db.users.update(action.payload.id, {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            })
        },
    }

})


export const {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
} = UsersSlice.actions;
export default UsersSlice.reducer
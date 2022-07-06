import {createSlice} from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState :[],
    reducers: {
        ADDITEM: (state,action) =>{
                const exist =state.find(x=>x.id===action.payload.id);
                if(exist){
                    return state.map(x => x.id ===action.payload.id ? {...x,qty: x.qty + 1} : x );

                }else{
                    const product = action.payload;
                    return[
                        ...state,
                        {
                            ...product,
                            qty:1
                        }
                    ]
                };
        },
        DELITEM: (state,action) =>{
                const exist =state.find(x=>x.id===action.payload.id);
                if(exist.qty === 1 ){
                    return state.filter(x => x.id !== action.payload.id);
                }else{
                    return state.map( x => x.id === action.payload.id ? {...x , qty : x.qty-1} : x)
                }
        },

    },
})


export const {ADDITEM ,DELITEM } = CartSlice.actions;
export default  CartSlice.reducer


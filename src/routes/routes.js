import React from 'react'
import {Routes ,Route} from 'react-router-dom'; 
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Product from '../Pages/Product';
import Cart from '../Pages/Cart';
import NotFound from '../Pages/NotFound';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/Login';
import Checkout from '../Pages/Checkout';
import BillPage from '../Pages/BillPage';
import UserList from '../Pages/UserList';
import UpdateUser from '../Pages/UpdateUser';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products/:categoryParam"  element={<Products/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/bill" element={<BillPage/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/updateUser/:id" element={<UpdateUser/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        )
}

export default RoutesApp
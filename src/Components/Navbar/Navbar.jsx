import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import db from '../../Data/db';
import { logoutUser } from '../../redux/reducer/LoginSclice';

const Navbar = () => {
    const state = useSelector(state => state.cart)
    const [data , setData] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const getUsers=async()=>{
            let allUsers= await db.currentUser.toArray();
            setData(allUsers);
        }
        getUsers();
    },[data])

    return (
        <nav className={`navbar  navbar-expand-lg navbar-light bg-white shadow-sm `}>
            {/* {console.log(data)} */}
            <div className="container ">
                <Link to={"/"} className={`navbar-brand fw-bold fs-2 text-dark`} href="#">MYSTORE</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} className={`nav-link active text-dark`} aria-current="page" href="#">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/products/all Products"} className={`nav-link active text-dark`} aria-current="page" href="#">PRODUCTS</Link>
                        </li>
                        {data.role = "admin"&&
                            <li className="nav-item">
                                <Link to={"/users"} className={`nav-link active text-dark`} aria-current="page" href="#">USERS</Link>
                            </li>
                        }
                        {data.length ===0? 
                            <li className="nav-item">
                                <Link to={"/login"} className={`nav-link text-dark`} href="#">SIGN IN</Link>
                            </li>
                        :
                            <li className="nav-item">
                                <button className={`nav-link text-dark btn`} data-bs-toggle="modal" data-bs-target="#exampleModal">LOG OUT</button>
                            </li>
                        }
                        <li className="nav-item">
                            <Link to={"/cart"} href="#" className={`  text-secondary border-0 p-1 mt-1 position-relative `}>
                                <i className="fa-solid fa-cart-shopping "></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {state.length}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        {/*  */}


        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">LOG OUT</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                Are You Sure?!...
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>dispatch(logoutUser(data[0]))} >Log out</button>
            </div>
            </div>
        </div>
        </div>
        {/*  */}
        </nav>
    )
}

export default Navbar
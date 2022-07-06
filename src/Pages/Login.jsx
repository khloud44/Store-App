import React, { useEffect, useState } from "react";
import db from "../Data/db";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/reducer/LoginSclice";

export default function Login() {
    const [data , setData] = useState({})
    const [userData , setUserData] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [loginError , setLoginError] = useState("")
    const [loginFlag, setLoginFlag] = useState(false);

    const navigate = useNavigate()
    const disptch = useDispatch()
    const handleChange = e => { 
        setUserForm({
        ...userForm,
        [e.target.id]: e.target.value,
        });
    };
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
    });


    useEffect(()=>{
        const getUsers=async()=>{
            let allUsers= await db.users.toArray();
            setData(allUsers);
        }
        getUsers();
    },[])

    useEffect(() => {
        if(loginFlag)
            search();
    }, [userData]);

    const submitForm = async (e) => {
        e.preventDefault();
        setUserData( data.filter(user=> {
            setLoginFlag(true);
            if(user.email===userForm.email && user.password===userForm.password) 
            return user;
        }))
    };

    const search = () => {
        if (userData[0] !== undefined){
            disptch(loginUser(userData))
            navigate("/")
        }else{
            setLoginError("Invalid LogIn")
        }
    }

    return (
        <div className="container my-5 p-3 w-md-50 ">
            <h2 className="mt-5 mb-3 text-center fw-blod">Sign In</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    {loginError &&
                        <p className="bd-danger alert alert-danger p-3  w-75 m-auto text-center fs-4">{loginError}</p>
                    }
                    <form onSubmit={(e) => submitForm(e)} className='border p-3 shadow w-75 mx-auto mt-3'>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className='form-control'
                                id="email"
                                aria-describedby="usernameHelp"
                                value={userForm.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="mb-2 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className='form-control'
                                value={userForm.password}
                                onChange={(e) => handleChange(e)}
                            />
                            <div className='text-muted px-3 py-2 position-absolute top-1 right showPassword around' onClick={()=>setShowPassword(!showPassword)}>
                                    {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 my-3">Login</button>
                        <p className="text-center">New Customer<Link to={"/signup"} className="text-decoration-none"> Start Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

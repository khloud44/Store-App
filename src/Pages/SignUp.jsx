import React from 'react';
import { useNavigate} from "react-router-dom";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducer/UsersSlice";

const SignUp = () => {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [confirmPassword , setconfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
        
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors([]);
        if (
        name === undefined ||
        name.trim() === "" ||
        email === undefined ||
        email === "" ||
        password === undefined ||
        password === "" ||
        confirmPassword === undefined ||
        confirmPassword === ""  
        ) {
        return setErrors(["Please fill out all fields"]);
        }
        if (password.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return setErrors(["Email do not Valid"]);
        }
        if (password!== confirmPassword) {
        return setErrors(["Passwords do not match"]);
        }
        const payload = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        };
        dispatch(addUser(payload));
        navigate("/login");
    };

    return (
            <div className="container my-5 p-3 w-md-50">
            <h2 className="mt-5 mx-auto mb-3 fw-blod">Sign Up</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                {errors?.map((error) => (
                    <p className="bd-danger alert alert-danger">{error}</p>
                ))}
                <form onSubmit={handleSubmit} className="border p-5 shadow">
                    <div className="mb-3">
                        <label htmlFor="userName">Name</label>
                        <input
                            id="userName"
                            type="userName"
                            className="form-control "
                            value ={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 ">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control p-2 "
                        aria-describedby="emailHelp"
                        value ={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-3 position-relative">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control p-2 "
                        value ={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div
                        className="text-muted px-3 py-2 position-absolute right showPassword around "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                        ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                        )}
                    </div>
                    </div>
                    <div className="mb-3 position-relative">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id='confirmPassword'
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control p-2 "
                        value ={confirmPassword}
                        onChange={(e)=>setconfirmPassword(e.target.value)}
                    />
                    <div
                        className="text-muted px-3 py-2 position-absolute right showPassword around "
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                        <i className="fa-solid fa-eye"></i>
                        ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                        )}
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                    </button>
                </form>
                </div>
            </div>
            </div>
    )
}

export default SignUp
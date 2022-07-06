import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/reducer/UsersSlice";
import db from "../Data/db";
import { useLiveQuery } from 'dexie-react-hooks';

const UpdateUser = () => {
    const { id } = useParams();
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [currentPassword , setCurrentPassword] = useState("")
    const [password , setPassword] = useState("")
    const [confirmPassword , setconfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const users = useLiveQuery(
        () => db.users.toArray()
    );

    const userData= users?.filter(user=>(user.id === Number(id)))
        
    
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
        confirmPassword === ""  ||
        currentPassword === undefined ||
        currentPassword === ""
        ) {
        return setErrors(["Please fill out all fields"]);
        }
        if (password.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return setErrors(["Email do not Valid"]);
        }
        if (currentPassword!== userData[0]?.password) {
        return setErrors(["Incorrect Current Password"]);
        }
        if (password!== confirmPassword) {
        return setErrors(["Passwords do not match"]);
        }
        const payload = {
        id: userData[0]?.id,
        name: name,
        email: email,
        password: password,
        };
        dispatch(updateUser(payload, { id: userData.id }));
        navigate("/");
    };

    return (
            <div className="container my-5 p-3 w-md-50">
            <h2 className="mt-5 mx-auto mb-3 fw-blod">Update User</h2>
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
                    <div className="mb-3 position-relative ">
                    <label htmlFor="currentpassword">Current Password</label>
                    <input
                        id="currentpassword"
                        type={showPassword ? "text" : "password"}
                        className="form-control p-2 "
                        value ={currentPassword}
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                        
                    />
                    <div
                        className="text-muted px-3 py-2 position-absolute right showPassword around "
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                        {showCurrentPassword ? (
                        <i className="fa-solid fa-eye"></i>
                        ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                        )}
                    </div>
                    </div>
                    <div className="mb-3 position-relative">
                    <label htmlFor="password">New Password</label>
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
                    Update
                    </button>
                </form>
                </div>
            </div>
            </div>
    )
}

export default UpdateUser
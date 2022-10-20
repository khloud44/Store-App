import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../Components/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import { addUser, getAllUsers } from "../redux/reducer/UsersSlice";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

export default function Login() {
    const {users} = useSelector(state => state.users)
    const navigate = useNavigate()
    const disptch = useDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const  [errorMessage, setErrorMessage]=useState("");
    useEffect(()=>{
        disptch(getAllUsers);
        console.log(users);
    })

    const handleSubmitForm =userData => {
        if(users.length === 0 ){
            disptch(addUser(userData));
            setErrorMessage("");
            navigate("/");
            toast.success('Successfully created!',{
                duration:8000
            });
        }else{
            for (const user of users){
                if(user.email === userData.email){
                    setErrorMessage("this Email already Exist"); 
                }else{
                    setErrorMessage("");
                    disptch(addUser(userData));
                    navigate("/");
                    toast.success('Successfully created!',{
                        duration:8000
                    });
                } 
            }
        }
        //toaser
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center  vh-100">
            <h2 className="mb-3 fs-1 font-thin  text-center">
                Sign Up
            </h2>
            <div className="shadow  p-5  col-lg-5 col-md-7 col-sm-10">
                <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="w-100 py-3"
                >
                {errorMessage && 
                    <div class="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                }
                <InputField 
                    type='name'
                    register={register("name", {
                        required: "Please enter your name address",
                        pattern: {
                            value: /^[a-zA-Z]+[ ]{0,1}[a-zA-Z]{0,}$/,
                            message: "Invalid Name, it must be only characters",
                        },
                        })}
                        errors={errors.name}
                        placeholder="Enter your name"
                />
                <InputField 
                    type='email'
                    register={register("email", {
                        required: "Please enter your email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid E-mail",
                        },
                        })}
                        errors={errors.email}
                        placeholder="Enter your email"
                />
                <InputField 
                    type='password'
                    register={register("password", {
                        required: "Please enter your password .",
                        minLength: {
                            value: 3,
                            message: " Password must be at least 8 characters",
                        },
                        })}
                        errors={errors.password}
                        placeholder="Enter your password"
                />
                <InputField 
                    type='password'
                    rel
                    register={register("passwordConfirmation", {
                        required: "Password Confirmation is required",
                        validate: (value) => {
                            if (value !== password.current)
                                return "Passwords do not match";
                        },
                        })}
                        errors={errors.passwordConfirmation}
                        placeholder="Re-enter your password"
                />
                <button
                    value="submit"
                    className="btn btn-primary w-100"
                >
                    SIGN UP<i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>
                </button>
                </form>
                Already have an account? {" "}
                <NavLink to={'/login'}>Login</NavLink>
            </div>
        </div>
    );
}

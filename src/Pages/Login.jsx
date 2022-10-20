import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducer/LoginSclice";
import { useForm } from "react-hook-form";
import InputField from "../Components/InputField";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
    const users = useSelector(state => state.users)
    const navigate = useNavigate()
    const disptch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleSubmitForm = (userData) => {
        disptch(loginUser(userData)) 
        users.successLogin ? 
        navigate("/")
        :
        navigate("/login")
        //toaser

    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center  vh-100">
            <h2 className="mb-3 fs-1 font-thin  text-center">
                Login
            </h2>
            <div className="shadow  p-5  col-lg-5 col-md-7 col-sm-10">
                <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="w-100 py-3"
                >
                <InputField 
                    type='email'
                    register={register("email", {
                        required: "Please enter your email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invaild E-mail",
                        },
                        })}
                        errors={errors.email}
                        placeholder="Enter Your email"
                />
                <InputField 
                    type='password'
                    register={register("password", {
                        required: "Please enter your password .",
                        })}
                        errors={errors.password}
                        placeholder="Enter your Password"
                />
                <button
                    value="submit"
                    className="btn btn-primary w-100"
                >
                    LOGIN <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
                </form>
                Don't have any account? {" "}
                <NavLink to={'/signup'}>Sign Up</NavLink>
            </div>
        </div>
    );
}

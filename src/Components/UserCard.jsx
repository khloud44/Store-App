import React from 'react'
import { Link } from 'react-router-dom'
import { deleteUser } from '../redux/reducer/UsersSlice';
import { useDispatch} from "react-redux";

const UserCard = ({user}) => {
    const dispatch =useDispatch();
    return (
        <div className="card shadow p-2 my-3">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <div>
                    <Link to={`/updateUser/${user.id}`} className="btn btn-outline-warning border-0 "><i className="fa-solid fa-square-pen"></i></Link>
                    <button onClick={()=>dispatch(deleteUser(user))} className="btn btn-outline-danger border-0"><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
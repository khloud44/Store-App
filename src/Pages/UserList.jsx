import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import UserCard from '../Components/UserCard';
import db from '../Data/db';

const UserList = () => {

    const users = useLiveQuery(
        () => db.users.toArray()
    );

    const allusers= users?.filter(user=>(user.role !== "admin"))

    return (

        <div className="container text-center " style={{marginTop:"100px"}}>
            {allusers?.length ===0 ? <h2 className='alert alert-danger w-50 m-auto text-center'>No Users Yet ...</h2> :
                <>
                    <h2>All Users</h2>
                    <div className="row d-flex justify-content-center mt-4">
                        {allusers?.map(user=>(
                            <div className="col-md-4" key={user.id}>
                                <UserCard user={user}/>
                            </div>

                        ))}
                    </div>
                </>
            }
        </div>

    )
}

export default UserList
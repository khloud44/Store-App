import React from 'react'
import { useNavigate } from 'react-router-dom'
import notFOuntd from '../assets/1.1.gif';

export default function NotFound() {
    const navigate=useNavigate();
    
    return (
        <div className='text-center' style={{marginTop:"100px"}}>
        <h2 className='mt-5'>Page Not Found</h2>
        <img src={notFOuntd} className='my-3 shadow' alt="Page_Not_Found"/>
        <br/>
        <button className='btn btn-secondary mt-3' onClick={()=>{
            navigate(-1)
        }}>Go Back</button>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import  QRCode  from 'qrcode';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const state = useSelector(state => state.cart);
    const [qrcod , setQrcode]=useState('');
    let data='';

    useEffect(() => {
        QRCode.toDataURL(data,{width:300}).then((setQrcode)).catch(err=>console.log(err));
        console.log(data);
    }, [data])

    const getTatalPrice = ()=>(
        state.reduce((sum,item) => sum+(item.price*item.qty) , 0)
    );

    data=`
    TAX (3%) = $${(getTatalPrice() * .03).toFixed(2)}, 
    Total Price = $${((getTatalPrice() *.03) + getTatalPrice()).toFixed(2)}

    `; 

    return (
        <div className='container w-75 'style={{marginTop:"100px"}}>
            <h3>Your Order </h3>
            <ul className="list-group my-3">
                <li className="list-group-item d-flex text-start justify-content-around">
                    <b>Product</b>
                    <b>Total Price</b>
                </li>
                {state.map(item =>(
                    <li className="list-group-item d-flex justify-content-around" key={item.id}>
                        <span className='text-center  w-50'>{item.title} * {item.qty}</span>
                        <span className='text-center  w-50'>${item.price * item.qty}</span>
                    </li>
                ))}
                    <li className="list-group-item d-flex justify-content-around">
                        <span className='text-center  w-50'>TAX</span>
                        <span className='text-center  w-50'>${ (.03 * getTatalPrice()).toFixed(2) }</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-around">
                        <span className='text-center  w-50'>Total</span>
                        <span className='text-center  w-50'>${ ((.03 * getTatalPrice()) + getTatalPrice()).toFixed(2)}</span>
                    </li>
                
            </ul>
            <Link to={'/bill'} className="btn btn-primary w-100" >Get Bill Page</Link>
            <h5 className='mt-3'>QR Code For Your Total Price :</h5>
            <div className='d-flex align-items-center flex-wrap justify-content-center'>
                <img src={qrcod} alt="" />
            </div>
        </div>
    )
}

export default Checkout
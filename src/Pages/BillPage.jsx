import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import  QRCode  from 'qrcode';

const BillPage = () => {
    const state = useSelector(state => state.cart);
    const [qrcod , setQrcode]=useState('');
    let data='';
    
    useEffect(() => {
        QRCode.toDataURL(data,{width:300}).then((setQrcode)).catch(err=>console.log(err));
        console.log(data);
    }, [data])
    

    const getTatalPrice = ()=>(
        state.reduce((sum,item) => sum+(item.price*item.qty) , 0)
    )

    data=`${state.map(item => (`${item.title} * ${item.qty}`))}
        TAX (3%) = $${(getTatalPrice() * .03).toFixed(2)}, 
        Total Price = $${((getTatalPrice() *.03) + getTatalPrice()).toFixed(2)}

    `; 

    return (
        <div className='container w-75 'style={{marginTop:"100px"}}>
            <h3>Your Billing </h3>
            <table className='table table-hover text-center'>
                <thead className='table-light'>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map(item =>(
                        
                        <tr key={item.id}>
                            <td><img src={item.image}
                                alt={item.title}
                                width="50px"
                                height="50px"
                                />
                            </td>
                            <td>${item.price}</td>
                            <td>{item.qty}</td>
                            <td>${item.qty * item.price}</td>
                        </tr>

                    ))}
                    <tr>
                        <td colSpan={3}>Tax (3%)</td>
                        <td>${ (.03 * getTatalPrice()).toFixed(2) }</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Total Price</td>
                        <td>${ ((.03 * getTatalPrice()) + getTatalPrice()).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <h5 className='mt-3'>QR Code For Your Billing :</h5>
            <div className='d-flex align-items-center flex-wrap justify-content-center'>
                <img src={qrcod} alt="" />
            </div>
            </div>
    )
}

export default BillPage
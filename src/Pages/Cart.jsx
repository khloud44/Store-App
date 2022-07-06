import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { ADDITEM, DELITEM } from '../redux/reducer/CartSlice';
export default function Cart() {

    const state = useSelector(state=> state.cart);
    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(ADDITEM(product));
    };
    const delProduct = (product) => {
        dispatch(DELITEM(product));
    };


    return (
        <div style={{marginTop:"100px"}}>
            {state.length ===0 ? <h2 className='alert alert-danger w-50 m-auto text-center'>Cart is Empty Please add Some Products</h2> :
                <div className='container w-75 w-ms-100'>
                    {state.map(product =>(
                        <div  key={product.id}>
                            <div className="row mt-5  p-3  shadow">
                                <div className="col-md-4 mx-3 text-center mb-2">
                                    <img src={product.image} alt={product.title} 
                                        height="200px" width="100%"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <h3>{product.title}</h3>
                                    <p className='lead fw-bold my-3'>
                                        {product.qty} * ${product.price}= ${product.qty * product.price}
                                    </p>
                                    <div className='col-md-6 d-flex justify-content-between align-items-center w-50 text-center'>
                                        <button className='btn btn-outline-secondary '
                                        onClick={()=>delProduct(product)}
                                        >
                                            <i className='fa fa-minus'></i>
                                        </button>
                                        <b className='m-4'>{product.qty}</b>
                                        <button className='btn btn-outline-secondary me-4'
                                        onClick={()=>addProduct(product)}
                                        >
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link to={'/checkout'} className='btn btn-primary my-3 w-100'>Ckeck Out</Link>
                </div>
            }
        </div>
    )
}

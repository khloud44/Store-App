import React from 'react'
import { NavLink } from 'react-router-dom';


const ProductCard = ({product}) => {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
        <div className="card h-100 text-center p-3">
            <img src={product.image} className="card-img-top"height="250px" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{product.title.substring(0,12)}...</h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <NavLink to={`/product/${product.id}`} className="btn btn-outline-secondary w-100">Details</NavLink>
            </div>
        </div>
    </div>
    )
}

export default ProductCard
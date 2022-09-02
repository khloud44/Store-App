import React ,{useEffect, useState}from 'react'
import Loading from './Loading';
import ProductCard from './ProductCard';

const ProductTopRating = () => {
    const [filter , setFilter] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        const getProducts = async ()=>{
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            let data = await response.json();
            setFilter(data.filter(product => product.rating.rate > 3))
            setLoading(false);
        }
        getProducts();
    },[]);

    const ShowProductsTOpRating = ()=>(
        <>
            {filter?.map( (product)=>(
                    <ProductCard  product={product}  key={product.id}/>
            ))}
        </>
    )

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 text-center">
                        <h2 className='display-6 mt-5  text-capitalize'>Products Top Rating</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading/> : <ShowProductsTOpRating/>}
                </div>
            </div>
        </div>
    )
}

export default ProductTopRating
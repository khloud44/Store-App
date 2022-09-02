import React ,{useEffect, useState}from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import ProductCard from '../Components/ProductCard';

export default function Products() {
    const { categoryParam } = useParams();
    const [filter , setFilter] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        const getProducts = async ()=>{
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            let data = await response.json();
            categoryParam==="all Products"? setFilter(data) :setFilter(data.filter(product => product.category === categoryParam))
            setLoading(false);
        }
        getProducts();
    },[categoryParam]);


    const ShowProducts = ()=>(
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
                    <div className="col-12 mb-5">
                        <h3 className='display-6 fw-bolder  text-capitalize'>{categoryParam}</h3>
                        <hr width="25%"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
            </div>
        </div>
    )
}

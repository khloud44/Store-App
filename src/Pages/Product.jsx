import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADDITEM } from "../redux/reducer/CartSlice";
import Loading from "../Components/Loading";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const dispatch = useDispatch();

  let changeDisable = btnDisable ? "disabled" : "";
  const addProduct = (product) => {
    dispatch(ADDITEM(product));
    setBtnDisable(true);
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const reponse = await fetch(`http://fakestoreapi.com/products/${id}`);
      setProduct(await reponse.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);


  const ShowProduct = () => (
    <>
      <div className="col-md-6 ">
        <img
          src={product.image}
          alt={product.title}
          height="400px"
          width="400px"
        />
      </div>
      <div className="col-md-6">
        <h1 className="display-5">{product.title}</h1>
        <p className="lead"> {product.description} </p>
        <p className="lead fw-bold">
          Rating {product.rating && product.rating.rate}
          <i className="fa fa-star text-warning"></i>
        </p>
        <h3 className="display-6 fw-bold my-4">${product.price}</h3>
        <button
          className={`btn btn-primary pxx-4 py-2  ${changeDisable}`}
          onClick={() => addProduct(product)}
        >
          Add to Card
        </button>
        <NavLink to="/cart" className="btn btn-success ms-2 px-3 py-2">
          Go to Card
        </NavLink>
      </div>
    </>
  );

  return (
    <div>
      <div className="container py-5">
        <div className="row my-5 py-4">
          {loading ? <Loading/> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}

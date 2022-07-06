import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./CategorySlider.css";


import reqImgs from "../../module/imageModule";
import { categoryContent } from "../../Data/Data";
import { Link } from "react-router-dom";

const CategorySlider=()=> {
    return (
        <div className="container my-5 text-center category">
            <h2> Categories </h2>
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            loop={true}
            pagination={{
            clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper  my-5 "
        >
            {categoryContent.map((item,index) => (
                <SwiperSlide 
                    key={index}
                    className="col-md-6 col-sm-12 shadow d-flex flex-column justify-content-end"
                    style={{ background: `url('${reqImgs[item.image]}') no-repeat center center` }}>
                    <b>{item.title}</b>
                    <Link to={`/products/${item.category}`} className="btn btn-outline-secondary w-100">See All</Link>
                </SwiperSlide>

            ))}
        </Swiper>
        </div>
    );
}

export default  CategorySlider;
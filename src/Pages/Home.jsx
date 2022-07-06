import React from 'react'
import CategorySlider from '../Components/CategorySlider/CategorySlider';
import ProductTopRating from '../Components/ProductTopRating';
import SimpleSlider from '../Components/SimpleSlider/SimpleSlider';

const Home = () => {
    return (
        <>
            <SimpleSlider/>
            <CategorySlider/>
            <ProductTopRating/>
        </>
    )
}

export default Home
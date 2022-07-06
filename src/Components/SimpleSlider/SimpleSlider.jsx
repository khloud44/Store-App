import React from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import './SimpleSlider.css';

import {HeaderContent} from "../../Data/Data";
import reqImgs from '../../module/imageModule';



const SimpleSlider = ()=>{

    return(
        <Slider autoplay={1000}>

            {HeaderContent.map(item => (
                <div className='sliderImage d-flex align-items-center justify-content-end h-100 w-100 px-5'
                style={{ background: `url('${reqImgs[item.image]}') no-repeat center center` }}
                    key={item.id}
                >
                    <div className=" text-end px-5 text-light">
                        <h1 className='card-title display-2 fw-bolder mb-0 '>{item.title}</h1>
                        <p className="card-text lead fs-2">{item.description}</p>
                    </div>
                </div>
            ))}

        </Slider>

    )
}

export default SimpleSlider;


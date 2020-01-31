import React from 'react';
import './slider-item.style.scss';

import img from '../../images/slide-show/slide 1.jpg';


const SliderItem = (props) => (
    <div className="slider-item" >
        <div className="background-image" style={{
            // backgroundImage: `url(${props.urlImg[1]})`
            // backgroundImage: `url(${img})`
        }} />
        <div className="left opacity" >
            <p>left</p>
        </div>
        <div className="center opacity">
            center
        </div>
        <div className="right opacity">
            <p>right</p>
        </div>
        <img src={`${props.imgUrl}`} alt="" />
    </div>
);

// I can leave with image instead of background image
// i can keep the left and write steady
// I can keep dynamic just the link, so it can be changed with images

export default SliderItem;
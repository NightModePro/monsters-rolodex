import React from 'react';
import './homepage-image.style.scss';

import desktopImg from '../../images/iancu/front-page-image.jpg';
import mobilImg from '../../images/iancu/front-page-image-mobile.jpg';

const HomePageImage = () => (
    <div className="image size">
        <img className="desktop-img" src={`${desktopImg}`} alt="iancu avram" />
        <img className="mobile-img" src={`${mobilImg}`} alt="iancu avram" />
    </div>
);

export default HomePageImage;
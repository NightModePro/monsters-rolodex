import React from 'react';

import './homepage.style.scss';

import HomePadeDescription from '../../components/homepage-description/homepage-description.component';
import HomePageImage from '../../components/homepage-image/homepage-image.component';

const Homepage = () => (
    <div className="homepage">
        <HomePadeDescription />
        <HomePageImage />
    </div>
)

export default Homepage
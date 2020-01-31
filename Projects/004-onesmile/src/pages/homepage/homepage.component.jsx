import React from 'react'
import './homepage.style.scss';

import Menu from '../../components/menu/menu.component';
import Content from '../../components/content/content.componenet';
import Recommendaton from '../../components/recommendation/recommendation.component';

const HomePage = () => (
    <div className='homepage'>
        <div className="header">
            header
        </div>
        <div className="homepage-content">
            <Menu />
            <Content />
            <Recommendaton />
        </div>
    </div>
);

export default HomePage;
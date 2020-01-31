import React from 'react';

import './homepage-description.style.scss';

const HomePadeDescription = () => (
    <div className="text size">
        <h1 id="name">Iancu <span id="name-thin">Avram</span></h1>
        <h1 id="moto">I don't make photos,<br />I CREATE MEMORIES</h1>
        <h3 id="description">i am here to imprese you more than zoro was able to impress the peasents</h3>
        <a href="my-work.html" id="my-work">My Work</a>
        <div className="social-media">
            <a href="#" className="facebook"><img src="../../images/icons/facebook-logo.png"
                alt="iancu avram photography facebook" /></a>
            <a href="#" id="instagram"><img src="../../images/icons/instagram.png"
                alt="iancu avram photography instagram" /></a>
        </div>
    </div>
);

export default HomePadeDescription; 
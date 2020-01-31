import React from 'react';
import './menu-item.style.scss';

const MenuItem = (props) => (
    <a className='a' href={`${props.link}`}>{props.name}</a>
);

export default MenuItem;
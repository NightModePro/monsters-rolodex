import React from 'react';
import './menu.style.scss';

import MenuItem from '../menu-item/menu-item.component';

const Menu = () => (
    <div className='menu'>
        <MenuItem name='Home' link='#' />
        <MenuItem name='Services' link='#' />
        <MenuItem name='About Me' link='#' />
        <MenuItem name='Contact' link='#' />
    </div>
);

export default Menu;
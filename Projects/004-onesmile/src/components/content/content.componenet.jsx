import React from 'react';
import './content.style.scss';

import Post from '../post/post.component';

const Content = () => (
    <div className="content">
        <Post />
        <Post />
        <Post />
    </div>
);

export default Content;
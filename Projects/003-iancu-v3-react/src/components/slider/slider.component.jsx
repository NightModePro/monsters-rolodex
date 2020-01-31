import React from 'react';
import './slider.style.scss';


import SliderItem from '../slider-item/slider-item.component';

class Slider extends React.Component {
    constructor() {
        super();

        this.state = {
            images: [
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Delicatearch.png',
                    link: '#'
                },
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Crossing_the_River_Styx.jpg',
                    link: '#'
                },
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Themistokles_von_Eckenbrecher_Utsikt_over_L%C3%A6rdals%C3%B8ren.jpeg',
                    link: '#'
                },
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Stroll_About_InSpring.jpg',
                    link: '#'
                },
            ]
        };
    }


    render() {
        return (
            <div className='slider'>
                <SliderItem {...this.state.images[0]} />
            </div>
        )
    }
}


export default Slider;
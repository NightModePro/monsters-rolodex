import React from 'react';
import './recommendation.style.scss';

import RecommendationItem from '../recommendation-item/recommendation-item.component';

const Recommendation = () => (
    <div className="recommendation">
        <RecommendationItem />
        <RecommendationItem />
        <RecommendationItem />
    </div>
);

export default Recommendation;
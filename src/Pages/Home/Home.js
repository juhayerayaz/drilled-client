import React from 'react';
import SlicedItems from '../Items/SlicedItems';
import Teams from '../Teams/Teams';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Career from './Career';
import SwiperReview from './Review/SwiperReview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SlicedItems></SlicedItems>
            <BusinessSummary></BusinessSummary>
            <SwiperReview></SwiperReview>
            <Teams></Teams>
            <Career></Career>
        </div>
    );
};

export default Home;
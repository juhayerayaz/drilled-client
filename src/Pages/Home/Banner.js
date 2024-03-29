import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Banner = () => {
    return (
        <div className='mb-16'>
            <div data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center">
                <div className="carousel w-full h-[300px] lg:h-[650px]">
                    <div id="slide1" className="carousel-item relative w-full ">
                        <div className='banner-img-1 text-white text-center'>
                            <h1 className='text-5xl lg:text-9xl font-bold drop-shadow-xl mt-[90px] lg:mt-[140px]'>Best Drilling
                                <br /> <span className='text-4xl lg:text-8xl'>Manufacterer</span>
                            </h1>
                            <Link to='/about'><button className='btn text-current btn-outline btn-lg font-bold drop-shadow-xl mt-6'>Learn More</button></Link>
                        </div>
                        <div className='hidden lg:block'>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className='banner-img-2  text-white text-center'>
                            <h1 className='text-5xl lg:text-9xl font-bold drop-shadow-xl mt-[90px] lg:mt-[140px]'>New & Advanced
                                <br /> <span className='text-4xl lg:text-8xl'>Technology</span>
                            </h1>
                            <Link to='/items'><button className='btn text-current btn-outline btn-lg font-bold drop-shadow-xl mt-6'>Buy Tools</button></Link>
                        </div>
                        <div className='hidden lg:block'>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className='banner-img-3  text-white text-center'>
                            <h1 className='text-5xl lg:text-9xl font-bold drop-shadow-xl mt-[90px] lg:mt-[140px]'>High Quality
                                <br /> <span className='text-4xl lg:text-8xl'>Engineers</span>
                            </h1>
                            <Link to='/team'><button className='btn text-current btn-outline btn-lg font-bold drop-shadow-xl mt-6'>Visit now</button></Link>
                        </div>
                        <div className='hidden lg:block'>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
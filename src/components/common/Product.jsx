import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Proudct1 from '../../assets/images/mens/eight.jpg'
import Proudct2 from '../../assets/images/mens/eleven.jpg'
import Proudct3 from '../../assets/images/mens/fivee.jpg'


const Product = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4)
    

    return (

        <Layout>
            <div className="container py-5 product-detail">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Product Title</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={Proudct1}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={Proudct2}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>


                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={Proudct3}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>

                            </div>

                            <div className="col-10">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={Proudct1}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={Proudct2}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={Proudct3}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h2>Product Title</h2>
                        <Rating
                            size={25}
                            readonly
                            initialValue={rating}
                            className='mb-1'
                        />
                        <span className='ps-2'>10 Reviews</span>

                        <div className='price h5 py-3'>
                            $20 <span className='text-decoration-line-through'>$25</span>
                        </div>

                        <div>
                            100% Original Products <br />
                            Pay on delivery might be available <br />
                            Easy 15 days returns and exchanges
                        </div>
                        <div className='pt-2'>
                            <strong className=''>Select Size</strong>
                            <div className='sizes pt-2'>

                                <button className='btn btn-size'>M</button>
                                <button className='btn btn-size'>L</button>
                                <button className='btn btn-size'>XL</button>
                                <button className='btn btn-size'>XXL</button>
                            </div>
                        </div>

                        <div className='add-to-cart my-3'>
                            <button className='btn btn-primary text-uppercase'>Add To Cart</button>
                        </div>


                        <hr />

                        <div>
                            <strong>SKU: </strong>
                            DDSSKK234

                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Description">
                                Tab content for Description
                            </Tab>
                            <Tab eventKey="profile" title="Reviews (10)">
                                Reviews
                            </Tab>
                     
                        </Tabs>
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default Product

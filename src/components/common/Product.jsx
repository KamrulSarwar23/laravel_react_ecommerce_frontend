import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl, fileUrl } from '../common/Http'


const Product = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4)
    const params = useParams();
    const [productDetails, setProductDetails] = useState([]);

    const getProductDetails = async () => {
        const res = await fetch(`${apiUrl}products-details/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setProductDetails(result.data)
                } else {
                    console.log('Something went wrong');
                }
            })
    }


    useEffect(() => {
        getProductDetails();
    }, [])

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

                                    {
                                        productDetails.product_images && productDetails.product_images.map((image, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className='content'>
                                                        <img
                                                            src={image.image_url}
                                                            alt=""
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

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

                                    {
                                        productDetails.product_images && productDetails.product_images.map((image, index) => {
                                            return (
                                                <SwiperSlide key={`product-${index}`} >
                                                    <div className='content'>
                                                        <img
                                                            src={`${fileUrl}uploads/products/large/${image.image}`}
                                                            alt=""
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }





                                </Swiper>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h2>{productDetails.title}</h2>
                        <Rating
                            size={25}
                            readonly
                            initialValue={rating}
                            className='mb-1'
                        />
                        <span className='ps-2'>10 Reviews</span>

                        <div className='price h5 py-3'>
                            ${productDetails.price}

                            {
                                productDetails.compare_price && <span className='ms-2 text-decoration-line-through'> ${productDetails.compare_price}</span>
                            }

                        </div>

                        <div>
                            100% Original Products <br />
                            Pay on delivery might be available <br />
                            Easy 15 days returns and exchanges
                        </div>
                        <div className='pt-2'>
                            <strong className=''>Select Size</strong>
                            <div className='sizes pt-2'>
                                {
                                    productDetails.sizes && productDetails.sizes.map((size, index) => {
                                        return (
                                            <button key={index} className='btn btn-size'>{size.name}</button>
                                        )
                                    })
                                }


                            </div>
                        </div>

                        <div className='add-to-cart my-3'>
                            <button className='btn btn-primary text-uppercase'>Add To Cart</button>
                        </div>


                        <hr />

                        <div>
                            <strong>SKU: </strong>
                            {productDetails.sku}

                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: productDetails.description }} />
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

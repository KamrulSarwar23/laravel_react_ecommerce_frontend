import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl, customerToken, fileUrl } from '../common/Http'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { format } from "date-fns";
import { CustomerAuthContext } from '../context/CustomerAuth';

const Product = () => {
    const navigate = useNavigate();
    const { user } = useContext(CustomerAuthContext)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const params = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [colors, setColors] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviewCount, setReviewCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [stock, setStock] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const [selectedRating, setSelectedRating] = useState(null);

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        if (selectedRating == null) {
            toast.error('Please Select a rating');
        }

        const newData = { ...data, "rating": selectedRating};
        const res = await fetch(`${apiUrl}product-review-submit/${params.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            },
            body: JSON.stringify(newData),
        });

        const result = await res.json();

        if (result.status == 200) {
            getProductReviews();
            setSelectedRating('')
            toast.success(result.message);
            reset();

        } else {
            toast.error(result.errors);
            setSelectedRating('')
        }
    };

    const getProductReviews = async () => {
        try {
            const res = await fetch(`${apiUrl}product-review-list/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const result = await res.json();

            if (result.status === 200) {
                setReviews(result.data);
                setReviewCount(result.reviewCount)
                setRatingCount(result.ratingCount)

            } else {
                console.error('Something went wrong:', result);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };


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
                    setStock(result.data.qty)

                    if (result.data.colors) {
                        const colorArray = result.data.colors.split(",").map((color) => color.trim());
                        setColors(colorArray);

                    }

                } else {
                    console.log('Something went wrong');
                }
            })
    }

    const getSuggestedProducts = async () => {
        const res = await fetch(`${apiUrl}suggested-products/${params.id}`, {

            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setSuggestedProducts(result.data)
                } else {
                    console.log('something went wrong')
                }
            })
    }


    const handleAddToCart = async (productId, quantity, size, color) => {

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${customerToken()}`,
                },
                body: JSON.stringify({ product_id: productId, quantity, size, color }),
            });

            const result = await res.json();

            if (result.status === 200) {
                setCart(result.data);
                toast.success(result.message);
                // navigate('/cart')
                // Reset form
                setSelectedSize("");
                setSelectedColor("");
                setQuantity(1);

            } else if (result.status === 400 && result.errors) {
                if (result.errors.size) {
                    toast.error(result.errors.size[0]);
                }
                if (result.errors.color) {
                    toast.error(result.errors.color[0]);
                }
            } else if (result.status === 401) {
                toast.error(result.message);
            } else if (result.status === 402) {
                toast.error(result.message);
            }
            else {
                navigate('/login')
                toast.error("Login First");

            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };

    useEffect(() => {
        getProductDetails();
        getSuggestedProducts();
        getProductReviews();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [params.id]);

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

                    <div className="col-md-5 mb-3">
                        <div className="row">
                            <div className="col-2 smallImagesSlider">
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
                                    className="mySwiper mt-2">

                                    {
                                        productDetails.product_images && productDetails.product_images.map(image => {
                                            return (
                                                <SwiperSlide key={`image-${image.id}`}>
                                                    <div className='content smallImage'>
                                                        <img
                                                            src={image.image_url}
                                                            alt=""

                                                            height={120}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>

                            </div>

                            <div className="col-sm-10 ">
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
                                        productDetails.product_images && productDetails.product_images.map(image => {
                                            return (
                                                <SwiperSlide key={`image-${image.id}`} >
                                                    <div className='content largeImage'>
                                                        <img
                                                            src={`${fileUrl}uploads/products/large/${image.image}`}
                                                            alt=""
                                                            height={650}
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

                        <div className='d-flex align-items-center'>
                            <div>
                     
                                {[...Array(5)].map((_, i) => {
                                    const isFullStar = i < Math.floor(ratingCount);
                                    const isHalfStar = i === Math.floor(ratingCount) && ratingCount % 1 !== 0;

                                    return (
                                        <span
                                            key={i}
                                            className={isFullStar ? "ratingStar text-warning" : isHalfStar ? "ratingStar text-warning" : "ratingStar text-secondary"}
                                        >
                                            {isFullStar ? '★' : isHalfStar ? '⯪' : '☆'}
                                        </span>
                                    );
                                })}

                            </div>
                            <span className='ps-2'>{reviewCount} Reviews</span>
                        </div>

                        <div className='price h5 py-3'>
                            <span>৳</span>{productDetails.price}

                            {
                                productDetails.compare_price && <span className='ms-2 text-decoration-line-through'> <span>৳</span>{productDetails.compare_price}</span>
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

                                        const isSelected = selectedSize === size.name;
                                        return (

                                            <button
                                                key={index}
                                                onClick={() => setSelectedSize(size.name)}
                                                className={`btn btn-size mb-2 px-3 py-1 rounded border  ${isSelected ? "bg-secondary text-white" : "bg-gray-200 text-black"
                                                    }`}
                                            >
                                                {size.name}
                                            </button>
                                        )
                                    })
                                }


                            </div>
                        </div>

                        {
                            colors && colors.length > 0 &&

                            <div className='pt-3 colorList'>
                                <select value={selectedColor || ""}
                                    onChange={(e) => setSelectedColor(e.target.value)} className='form-control' name="" id="">
                                    <option disabled value="">Select Color</option>
                                    {
                                        colors && colors.map((color, index) => {
                                            return (
                                                <option key={`color-${index}`} value={color}>{color}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        }


                        <div className="quantity-container flex items-center gap-2 mt-3">
                            <button
                                onClick={handleDecrease}
                                className="quantity-btn decrease bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-red-600 transition-all"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                id="quantityInput"
                                value={quantity}
                                min="1"
                                disabled
                                onChange={handleInputChange}
                                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleIncrease}
                                className="quantity-btn increase bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-green-600 transition-all"
                            >
                                +
                            </button>
                        </div>

                        <div className='mt-3 text-danger'>
                            {
                                stock == 0 && <h3>Stock Out</h3>
                            }
                        </div>

                        <div className='add-to-cart my-3'>
                            <button disabled={stock == 0} onClick={() => handleAddToCart(productDetails.id, quantity, selectedSize, selectedColor)} className='btn btn-primary text-uppercase'>Add To Cart</button>
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

                            <Tab eventKey="profile" title={`Reviews (${reviewCount})`}>
                                <div className="row">
                                    <div className="col-md-8">  
                                        <h4 className="mb-3">Customer Reviews</h4>
                                        <div className="list-group">
                                            {reviews.length > 0 ? (reviews.map((review, index) => (
                                                <div key={index} className="list-group-item p-3 mb-3 shadow-sm">
                                                    <div className="d-flex justify-content-between">
                                                        <h5 className="mb-1">{review.user.name}</h5>
                                                        <small className="text-muted">
                                                            {review.created_at ? format(new Date(review.created_at), "PPP p") : "Unknown Date"}
                                                        </small>
                                                    </div>
                                                    <div className="mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < review.rating ? "ratingStar text-warning" : "ratingStar text-secondary"}>
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className="mb-1">{review.comment}</p>
                                                </div>
                                            ))
                                            ) : (
                                                <p className="text-muted">No reviews yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {
                                        user && <div className="col-md-4">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                      
                                                <div>
                                                    <label>Select Rating</label>
                                                    <div className="star-rating mb-2">
                                                        {[1, 2, 3, 4, 5].map(num => (
                                                            <span
                                                                key={num}
                                                                className={num <= selectedRating ? "text-warning ratingStar" : "text-secondary ratingStar"}
                                                                onClick={() => handleRatingClick(num)}
                                                                style={{ cursor: "pointer", fontSize: "28px", marginRight: "5px" }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>

                                                </div>

                                                <textarea
                                                    className='form-control mb-3'
                                                    placeholder="Leave a comment"
                                                    {...register('comment', { required: 'Comment is required' })}
                                                    rows={4}
                                                />
                                                {errors.comment && <p className="text-danger">{errors.comment.message}</p>}

                                                <div>
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    }


                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>

            </div>

            <div className="section-2">
                <div className="container">

                    <h2>Featured Products</h2>

                    <hr />

                    <div className="row mt-4">

                        {suggestedProducts && suggestedProducts.length > 0 ? (
                            suggestedProducts.map((product, index) => (
                                <div key={`featured-product${index}`} className="col-lg-3 col-md-4 col-6 mb-4">
                                    <div className="product card border-0">
                                        <div className="card-img">
                                            <Link to={`/product/${product.id}`}>
                                                <img className="w-100" src={product.image_url} alt={product.title} />
                                            </Link>
                                        </div>
                                        <div className="card-body pt-3">
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            <div className="price">
                                                ৳{product.price}
                                                {product.compare_price && (
                                                    <span className="ms-2 text-decoration-line-through">৳{product.compare_price}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center mb-5">
                                <h3 className="mt-5">No Products Found</h3>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </Layout>

    )
}

export default Product

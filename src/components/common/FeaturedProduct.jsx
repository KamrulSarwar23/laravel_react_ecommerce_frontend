import React, { useEffect, useState } from 'react'

import { apiUrl } from '../common/Http'
import { Link } from 'react-router-dom'

const FeaturedProduct = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);

    const getFeaturedProducts = async () => {
        const res = await fetch(`${apiUrl}get-featured-products`, {

            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setFeaturedProducts(result.data)
                } else {
                    console.log('something went wrong')
                }
            })
    }

    useEffect(() => {
        getFeaturedProducts();
    }, [])
    return (
        <div className="section-2">
            <div className="container">
                <h2>Featured Arrivals</h2>
                <div className="row mt-4">

                    { 
                        featuredProducts && featuredProducts.map((featuredProduct, index) => {
                            return (
                                <div key={`featured-product${index}`} className='col-lg-3 col-md-4 col-6 mb-4'>
                                    <div className="product card border-0">
                                        <div className='card-img'>
                                            <Link to={`/product/${featuredProduct.id}`}>
                                                <img className='w-100' src={featuredProduct.image_url} alt="" />
                                            </Link>
                                        </div>

                                        <div className="card-body pt-3">
                                            <Link to={`/product/${featuredProduct.id}`}>{featuredProduct.title}</Link>
                                            <div className='price'>
                                                ${featuredProduct.price} 
                                                
                                                {
                                                    featuredProduct.compare_price && <span className='ms-2 text-decoration-line-through'>${featuredProduct.compare_price}</span>
                                                }
                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct

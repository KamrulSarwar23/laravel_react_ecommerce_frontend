import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiUrl } from '../common/Http'
import Loader from './Loader';

const LatestProduct = () => {

    const [latestProducts, setLatestProduct] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(true);

    const getLatestProducts = async () => {
        setLoading(true);
        const res = await fetch(`${apiUrl}get-latest-products/`, {

            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setLoading(false);
                    setLatestProduct(result.data)
                } else {
                    setLoading(false);
                    console.log('something went wrong')
                }
            })
    }

    useEffect(() => {
        getLatestProducts();
    }, [])

    return (
        <div className="section-2 py-5">
            <div className="container">
                <h2>New Arrivals</h2>

                <hr />

                <div className="row mt-4">

                    {loading ? (
                        <div className="col-12 text-center">
                            <Loader />
                        </div>
                    ) :
                        latestProducts && latestProducts.map((latestProduct, index) => {
                            return (
                                <div key={`latest-product${index}`} className='col-lg-3 col-md-4 col-6 mb-4'>

                                    <div className="product card border-0">
                                        <div className='card-img'>
                                            <Link to={`/product/${latestProduct.id}`}>
                                                <img className='w-100' src={latestProduct.image_url} alt="" />
                                            </Link>

                                        </div>

                                        <div className="card-body pt-3">
                                            <Link to={`/product/${latestProduct.id}`}>{latestProduct.title}</Link>
                                            <div className='price'>
                                            <span>৳</span>{latestProduct.price}

                                                {
                                                    latestProduct.compare_price && <span className='ms-2 text-decoration-line-through'> <span>৳</span>{latestProduct.compare_price}</span>
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

export default LatestProduct

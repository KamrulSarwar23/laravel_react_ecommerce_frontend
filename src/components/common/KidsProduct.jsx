import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../common/Http'
import Loader from './Loader';
import Layout from './Layout';

const KidsProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getKidsProducts = async () => {
        setLoading(true);
        const res = await fetch(`${apiUrl}kids-products`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setLoading(false);
                    setProducts(result.data)
                } else {
                    setLoading(false);
                    console.log('something went wrong')
                }
            })
    }

    useEffect(() => {
        getKidsProducts();
    }, [])

    return (
        <Layout>
            <div className="section-2 py-5">
            <div className="container">
                <h2>Kids Products</h2>

                <hr />

                <div className="row mt-4">

                    {loading ? (
                        <div className="col-12 text-center">
                            <Loader />
                        </div>
                    ) :
                    products && products.map((product, index) => {
                            return (
                                <div key={`latest-product${index}`} className='col-lg-3 col-md-4 col-6 mb-4'>

                                    <div className="product card border-0">
                                        <div className='card-img'>
                                            <Link to={`/product/${product.id}`}>
                                                <img className='w-100' src={product.image_url} alt="" />
                                            </Link>

                                        </div>

                                        <div className="card-body pt-3">
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            <div className='price'>
                                            <span>৳</span>{product.price}

                                                {
                                                    product.compare_price && <span className='ms-2 text-decoration-line-through'> <span>৳</span>{product.compare_price}</span>
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
        </Layout>
    )
}

export default KidsProduct

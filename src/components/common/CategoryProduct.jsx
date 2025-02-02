import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from './Http'
import Loader from './Loader';
import Layout from './Layout';
import { useParams } from 'react-router-dom';
const CategoryProduct = () => {

    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);
    const [paginator, setPaginator] = useState(null);

    const getCategoryProducts = async (url = `${apiUrl}product-by-category/${params.id}`) => {
        setLoading(true);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setLoading(false);
                    setProducts(result.data.data)
                    console.log(result.category)
                    setCategory(result.category)

                    setPaginator({
                        links: result.data.links,
                        total: result.data.total,
                        from: result.data.from,
                        to: result.data.to,
                        per_page: result.data.per_page,
                      });

                } else {
                    setLoading(false);
                    console.log('something went wrong')
                }
            })
    }

    const handlePageChange = (url) => {
        if (url) getCategoryProducts(url);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    };

    useEffect(() => {
        getCategoryProducts();

 
    }, [params.id])

    return (
        <Layout>
            <div className="section-2 py-5">
                <div className="container">
                    <h2>{category} Products</h2>

                    <hr />

                    <div className="row mt-4">
                        {loading ? (
                            <div className="col-12 text-center">
                                <Loader />
                            </div>
                        ) : products && products.length > 0 ? (
                            products.map((product, index) => (
                                <div key={`latest-product${index}`} className='col-lg-3 col-md-4 col-6 mb-4'>
                                    <div className="product card border-0">
                                        <div className='card-img'>
                                            <Link to={`/product/${product.id}`}>
                                                <img className='w-100' src={product.image_url} alt={product.title} />
                                            </Link>
                                        </div>
                                        <div className="card-body pt-3">
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            <div className='price'>
                                                <span>৳</span>{product.price}
                                                {product.compare_price && (
                                                    <span className='ms-2 text-decoration-line-through'>
                                                        <span>৳</span>{product.compare_price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <h4>No Products Found</h4>
                            </div>
                        )}
                    </div>


                        {/* Pagination */}
              {paginator && paginator.total > paginator.per_page && (
                <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
                  <div className="d-flex flex-wrap gap-2">
                    {paginator.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(link.url)}
                        disabled={!link.url}
                        className={[
                          "btn btn-sm px-4 py-2 rounded-pill transition-all",
                          !link.url
                            ? "btn-secondary disabled text-white"
                            : "btn-outline-primary",
                          link.active
                            ? "btn-primary text-white fw-bold"
                            : "btn-outline-primary text-dark border-primary",
                        ].join(" ")}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: link.label }}
                          className="text-center"
                        ></span>
                      </button>
                    ))}
                  </div>
                  <span className="mt-3 text-muted fw-semibold">
                    Showing <span className="text-primary fw-bold">{paginator.from}</span> to{" "}
                    <span className="text-primary fw-bold">{paginator.to}</span> of{" "}
                    <span className="text-primary fw-bold">{paginator.total}</span> items
                  </span>
                </div>
              )}

                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct

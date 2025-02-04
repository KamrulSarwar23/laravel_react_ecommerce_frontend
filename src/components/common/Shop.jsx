import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link, useSearchParams } from 'react-router-dom';
import { apiUrl } from '../common/Http';
import Loader from './Loader';

export const Shop = () => {


  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryChecked, setCategoryChecked] = useState(() => {
    const category = searchParams.get('category')
    return category ? category.split(',') : [];
  });

  const [brandChecked, setBrandChecked] = useState(() => {
    const brand = searchParams.get('brand')
    return brand ? brand.split(',') : [];
  });

  const [loading, setLoading] = useState(true);
  const [paginator, setPaginator] = useState(null);


  const getCategories = () => {
    try {
      fetch(`${apiUrl}categories-by-product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      }).then(res => res.json())
        .then(result => {

          if (result.status == 200) {
            setCategories(result.data);
          } else {
            console.log('Something went wrong')
          }
        })

    } catch (error) {
      console.log(error);
    }
  };


  const getBrands = () => {
    try {
      fetch(`${apiUrl}brands-by-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      }).then(res => res.json())
        .then(result => {
          if (result.status == 200) {
            setBrands(result.data);
          } else {
            console.log('Something went wrong')
          }
        })
    } catch (error) {
      console.log(error);
    }
  };


  // const getProducts = (url = null) => {

  //   setLoading(true)
  //   let search = []
  //   let params = '';

  //   if (categoryChecked.length > 0) {
  //     search.push(['category', categoryChecked])
  //   }

  //   if (brandChecked.length > 0) {
  //     search.push(['brand', brandChecked])
  //   }

  //   if (search.length > 0) {
  //     params = new URLSearchParams(search)
  //     setSearchParams(search)
  //   } else {
  //     setSearchParams([])
  //   }

  //   const fetchUrl = url ? url : `${apiUrl}get-all-products?${params}`;

  //   fetch(fetchUrl, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     }
  //   }).then(res => res.json())
  //     .then(result => {

  //       if (result.status == 200) {
  //         setLoading(false)
  //         setLoading(false)
  //         setAllProducts(result.data.data);

  //         setPaginator({
  //           links: result.data.links,
  //           total: result.data.total,
  //           from: result.data.from,
  //           to: result.data.to,
  //           per_page: result.data.per_page,
  //         });

  //       } else {
  //         setLoading(false)
  //         console.log('Something went wrong');
  //       }
  //     })

  // };

  const getProducts = (url = null) => {
    setLoading(true);
    let search = new URLSearchParams();
  
    if (categoryChecked.length > 0) {
      search.append('category', categoryChecked.join(',')); // Convert array to string
    }
  
    if (brandChecked.length > 0) {
      search.append('brand', brandChecked.join(',')); // Convert array to string
    }
  
    setSearchParams(search); // Update search params state
  
    // If paginating, ensure filters are included in the request
    const fetchUrl = url ? `${url}&${search.toString()}` : `${apiUrl}get-all-products?${search.toString()}`;
  
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          setAllProducts(result.data.data);
  
          setPaginator({
            links: result.data.links,
            total: result.data.total,
            from: result.data.from,
            to: result.data.to,
            per_page: result.data.per_page,
          });
        } else {
          setLoading(false);
          console.log('Something went wrong');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Fetch error:', error);
      });
  };
  

  const handleCategory = (e) => {

    const { checked, value } = e.target;

    if (checked) {
      setCategoryChecked(prev => [...prev, value])
    } else {
      setCategoryChecked(categoryChecked.filter(id => id != value))
    }
  };


  const handleBrand = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setBrandChecked(prev => [...prev, value])
    } else {
      setBrandChecked(brandChecked.filter(id => id != value))
    }
  };


  const handlePageChange = (url) => {
    if (url) {
      getProducts(url);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {

    getCategories();
    getBrands();
    getProducts();

  }, [categoryChecked, brandChecked]);



  return (
    <div>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className="py-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shop
              </li>
            </ol>
          </nav>

          <div className="row proudctPage">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="mb-4">
                    {categories &&
                      categories.map(category => (
                        <li key={`category-${category.id}`}>
                          <input

                            id={`category-${category.id}`}
                            className="me-2"
                            value={category.id}
                            defaultChecked={searchParams.get('category') ? searchParams.get('category').includes(category.id) : false}
                            onClick={handleCategory}
                            type="checkbox"
                          />
                          <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className="mb-3">Brands</h3>
                  <ul className="mb-4">
                    {brands &&
                      brands.map(brand => (
                        <li key={`brand-${brand.id}`}>
                          <input

                            id={`brand-${brand.id}`}
                            value={brand.id}
                            onClick={handleBrand}
                            className="me-2"
                            defaultChecked={searchParams.get('brand') ? searchParams.get('brand').includes(brand.id) : false}
                            type="checkbox"
                          />
                          <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">

              <div className="row">
                {loading ? ( // Conditionally render loader while fetching data
                  <div className="col-12 text-center">
                    <Loader />
                  </div>
                ) : allProducts && allProducts.length > 0 ? (
                  allProducts.map((product, index) => (
                    <div key={`products${index}`} className="col-lg-4 col-md-6 col-6 mb-4">
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to={`/product/${product.id}`}>
                            <img className="w-100" src={product.image_url} alt={product.title} />
                          </Link>
                        </div>
                        <div className="card-body pt-3">
                          <Link to={`/product/${product.id}`}>{product.title}</Link>
                          <div className="price">
                            <span>৳</span>{product.price}
                            {product.compare_price && (
                              <span className="ms-2 text-decoration-line-through">
                                <span>৳</span>{product.compare_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center pt-5">
                    <h3>No products found matching your Criteria.</h3>
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
        </div>
      </Layout>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { apiUrl } from '../common/Http';
import Loader from './Loader';

export const Shop = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginator, setPaginator] = useState(null);
  

  const getCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}categories-by-product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const result = await res.json();
      setCategories(result.data);




    } catch (error) {
      console.log(error);
    }
  };


  const getBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}brands-by-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const result = await res.json();
      setBrands(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getAllProducts = async (url = `${apiUrl}get-all-products`, categories = [], brands = []) => {

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ categories, brands }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
      const text = await res.text();
      const result = text ? JSON.parse(text) : {};

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
    } catch (error) {
      console.log(error);
    }
  };


  const handleCategoryChange = (id) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updatedCategories);
    getAllProducts(`${apiUrl}get-all-products`, updatedCategories, selectedBrands);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const handleBrandChange = (id) => {
    const updatedBrands = selectedBrands.includes(id)
      ? selectedBrands.filter((brandId) => brandId !== id)
      : [...selectedBrands, id];
    setSelectedBrands(updatedBrands);
    getAllProducts(`${apiUrl}get-all-products`, selectedCategories, updatedBrands);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const handlePageChange = (url) => {
    if (url) {
      getAllProducts(url, selectedCategories, selectedBrands);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    getAllProducts();
    getCategories();
    getBrands();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);


  useEffect(() => {
    if (selectedCategories.length === 0 && selectedBrands.length === 0) {
      getAllProducts(); // Fetch all products if no filters are applied
    } else {
      getAllProducts(selectedCategories, selectedBrands); // Filter products based on selected categories and brands
    }
  }, [selectedCategories, selectedBrands]);


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
                      categories.map((category, index) => (
                        <li key={index}>
                          <input
                            onChange={() => handleCategoryChange(category.id)}
                            id={`category-${category.id}`}
                            className="me-2"
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
                      brands.map((brand, index) => (
                        <li key={index}>
                          <input
                            onChange={() => handleBrandChange(brand.id)}
                            id={`brand-${brand.id}`}
                            className="me-2"
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

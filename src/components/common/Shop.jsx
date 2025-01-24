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

  const getAllProducts = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await fetch(`${apiUrl}get-all-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const result = await res.json();
      if (result.status === 200) {
        setLoading(false);
        setAllProducts(result.data);

      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = async (categories, brands) => {
    setLoading(true); // Set loading to true when filtering data
    try {
      const res = await fetch(`${apiUrl}products-filter-by-category-and-brand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ categories, brands }),
      });

      const result = await res.json();
      if (result.status === 200) {
        setLoading(false);
        setAllProducts(result.data);
      } else {
        setLoading(false);  
        setAllProducts([]);
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
    filterProducts(updatedCategories, selectedBrands);
  };

  const handleBrandChange = (id) => {
    const updatedBrands = selectedBrands.includes(id)
      ? selectedBrands.filter((brandId) => brandId !== id)
      : [...selectedBrands, id];
    setSelectedBrands(updatedBrands);
    filterProducts(selectedCategories, updatedBrands);
  };

  useEffect(() => {
    getAllProducts();
    getCategories();
    getBrands();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedBrands.length === 0) {
      getAllProducts(); // Fetch all products if no filters are applied
    } else {
      filterProducts(selectedCategories, selectedBrands); // Filter products based on selected categories and brands
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
                            ${product.price}
                            {product.compare_price && (
                              <span className="ms-2 text-decoration-line-through">
                                ${product.compare_price}
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
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

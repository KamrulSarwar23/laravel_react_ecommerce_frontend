import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { apiUrl } from '../common/Http'

export const Shop = () => {


  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

    const getCategories = async () => {
  
      try {
        const res = await fetch(`${apiUrl}categories-by-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        });
  
        const result = await res.json();
        setCategories(result.data);
  
      } catch (error) {
  
        console.log(error)
      }
  
  
    }
  
    const getBrands = async () => {
  
      try {
        const res = await fetch(`${apiUrl}brands-by-products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
  
          }
        });
  
        const result = await res.json();
        setBrands(result.data);
  
      } catch (error) {
  
        console.log(error)
      }
  
    }

  const getAllProducts = async () => {
    const res = await fetch(`${apiUrl}get-all-products`, {

      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setAllProducts(result.data)
        } else {
          console.log('something went wrong')
        }
      })
  }

  useEffect(() => {
    getAllProducts();
    getCategories();
    getBrands();
  }, [])


  return (
    <div>

      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className='py-4'>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Shop</li>
            </ol>
          </nav>


          <div className="row proudctPage">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Categories</h3>
                  <ul className='mb-4'>

                  {
                    categories && categories.map((category, index) => {
                      return (
                        <li key={index}>
                        <input id='mens' className='me-2' type="checkbox" />
                        <label htmlFor="mens">{category.name}</label>
                      </li>
                      )
                    })
                  }

            
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Brands</h3>
                  <ul className='mb-4'>

                    
                  {
                    brands && brands.map((brand, index) => {
                      return (
                        <li key={index}>
                        <input id='mens' className='me-2' type="checkbox" />
                        <label htmlFor="mens">{brand.name}</label>
                      </li>
                      )
                    })
                  }

    

                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">

                {
                  allProducts && allProducts.map((product, index) => {
                    return (
                      <div key={`products${index}`} className='col-lg-4 col-md-6 col-6 mb-4'>
                        <div className="product card border-0">
                          <div className='card-img'>
                            <Link to="/product">
                              <img className='w-100' src={product.image_url} alt="" />
                            </Link>

                          </div>

                          <div className="card-body pt-3">
                            <Link to="/product">{product.title}</Link>
                            <div className='price'>
                              ${product.price}

                              {
                                product.compare_price && <span className='ms-2 text-decoration-line-through'> ${product.compare_price}</span>
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

        </div>
      </Layout>

    </div>
  )
}

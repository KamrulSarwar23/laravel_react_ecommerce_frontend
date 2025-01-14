import React from 'react'
import Layout from './Layout'
import Proudct1 from '../../assets/images/mens/eight.jpg'
import Proudct2 from '../../assets/images/mens/eleven.jpg'
import Proudct3 from '../../assets/images/mens/fivee.jpg'
import Proudct4 from '../../assets/images/mens/seven.jpg'
import Proudct5 from '../../assets/images/mens/four.jpg'
import Proudct6 from '../../assets/images/mens/six.jpg'
import { Link } from 'react-router-dom'

export const Shop = () => {
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
                    <li>
                      <input id='mens' className='me-2' type="checkbox" />
                      <label htmlFor="mens">Mens</label>
                    </li>

                    <li>
                      <input id='womens' className='me-2' type="checkbox" />
                      <label htmlFor="womens">Womens</label>
                    </li>

                    <li>
                      <input id='kids' className='me-2' type="checkbox" />
                      <label htmlFor="kids">Kids</label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-3'>Brands</h3>
                  <ul className='mb-4'>
                    <li>
                      <input id='levis' className='me-2' type="checkbox" />
                      <label htmlFor="levis">Levis</label>
                    </li>

                    <li>
                      <input id='rokies' className='me-2' type="checkbox" />
                      <label htmlFor="rokies">Rokies</label>
                    </li>

                    <li>
                      <input id='americaneagle' className='me-2' type="checkbox" />
                      <label htmlFor="americaneagle">American Eagle</label>
                    </li>

                    <li>
                      <input id='cargo' className='me-2' type="checkbox" />
                      <label htmlFor="cargo">Cargo</label>
                    </li>

                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">
                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct1} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct2} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct3} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct4} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct5} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className='col-lg-4 col-md-6 col-6 mb-4'>
                  <div className="product card border-0">
                    <div className='card-img'>
                      <Link to="/product">
                        <img className='w-100' src={Proudct6} alt="" />
                      </Link>

                    </div>

                    <div className="card-body pt-3">
                      <Link to="/product">Red Check Shirt</Link>
                      <div className='price'>
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>

    </div>
  )
}

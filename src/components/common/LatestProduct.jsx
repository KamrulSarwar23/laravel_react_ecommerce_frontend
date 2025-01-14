import React from 'react'

import Proudct1 from '../../assets/images/mens/eight.jpg'
import Proudct2 from '../../assets/images/mens/eleven.jpg'
import Proudct3 from '../../assets/images/mens/fivee.jpg'
import Proudct4 from '../../assets/images/mens/seven.jpg'
import { Link } from 'react-router-dom'


const LatestProduct = () => {
    return (
        <div className="section-2 py-5">
            <div className="container">
                <h2>New Arrivals</h2>
                <div className="row mt-4">

                    <div className='col-lg-3 col-md-4 col-6 mb-4'>
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

                    <div className='col-lg-3 col-md-4 col-6 mb-4'>
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

                    <div className='col-lg-3 col-md-4 col-6 mb-4'>
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

                    <div className='col-lg-3 col-md-4 col-6 mb-4'>
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
                </div>
            </div>
        </div>
    )
}

export default LatestProduct

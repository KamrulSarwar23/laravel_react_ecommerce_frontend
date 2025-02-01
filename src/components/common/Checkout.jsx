import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import Proudct1 from '../../assets/images/mens/eight.jpg'
const Checkout = () => {

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }

    return (
        <div>
            <Layout>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className='py-4'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item" aria-current="page"><Link to="/cart">Cart</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            <h3 className='border-bottom pb-2'><strong>Billing Details</strong></h3>

                            <form className='mt-4' action="">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Name' />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className='form-control' placeholder='Email' />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <textarea type="text" className='form-control' placeholder='Address' rows={3} />
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='City' />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className='form-control' placeholder='State' />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Zip' />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className='form-control' placeholder='Phone' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-5">
                            <h3 className='border-bottom pb-2'><strong>Items</strong></h3>

                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td width={100}> <img width={80} src={Proudct1} alt="" /> </td>
                                        <td width={200}>
                                            <div className="">
                                                <div>Product Name Goes Here</div>
                                                <div className="d-flex align-items-center">
                                                    <span><span>৳</span>10</span>
                                                    <button className='ms-4 btn btn-size'>L</button>
                                                    <div className='ps-4'>
                                                        x 1
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>

                                    <tr>
                                        <td width={100}> <img width={80} src={Proudct1} alt="" /> </td>
                                        <td width={500}>
                                            <div className="">
                                                <div>Product Name Goes Here</div>
                                                <div className="d-flex align-items-center">
                                                    <span><span>৳</span>10</span>
                                                    <button className='ms-4 btn btn-size'>L</button>
                                                    <div className='ps-4'>
                                                        x 1
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td width={100}> <img width={80} src={Proudct1} alt="" /> </td>
                                        <td width={500}>
                                            <div className="">
                                                <div>Product Name Goes Here</div>
                                                <div className="d-flex align-items-center">
                                                    <span><span>৳</span>10</span>
                                                    <button className='ms-4 btn btn-size'>L</button>
                                                    <div className='ps-4'>
                                                        x 1
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <div className='pt-3'>

                                <div className="d-flex mb-2 justify-content-between border-bottom">
                                    <div className='me-2'> <strong>Sub Total:</strong> </div>
                                    <div>$120</div>

                                </div>

                                <div className="d-flex mb-2 justify-content-between border-bottom">
                                    <div className='me-2'> <strong>Shipping:</strong> </div>
                                    <div>$5</div>

                                </div>

                                <div className="d-flex justify-content-between border-bottom mb-4">
                                    <div className='me-2'> <strong>Grand Total:</strong> </div>
                                    <div>$120</div>

                                </div>

                              
                            </div>

                            <h3 className='border-bottom pb-3'><strong>Payment Methods</strong></h3>

                             <div className='d-flex'>
                             <div className='me-4'>
                                    <input onClick={handlePaymentMethod} id='stripe' checked={paymentMethod == 'stripe'} value={'stripe'} className='me-1' type="radio" />
                                    <label htmlFor="stripe">Stripe</label>
                                </div>

                                <div>
                                    <input onClick={handlePaymentMethod} id='cod' checked={paymentMethod == 'cod'} value={'cod'} className='me-1' type="radio" />
                                    <label htmlFor="cod">COD</label>
                                </div>

                             </div>

                            <div className="d-flex mt-3">
                                    <button className='btn btn-primary'>Pay Now</button>
                                </div>


                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Checkout

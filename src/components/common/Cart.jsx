import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import Proudct1 from '../../assets/images/mens/eight.jpg'

const Cart = () => {
    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Cart</li>
                            </ol>
                        </nav>
                    </div>


                    <div className="col-md-12">
                        <h2 className='border-bottom pb-3'>
                            Cart
                        </h2>

                        <table className='table'>
                            <tbody>

                                <tr className="align-middle">
                                    <td style={{ width: "100px" }}>
                                        <img
                                            style={{
                                                width: "80px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                            }}
                                            src={Proudct1}
                                            alt="Product"
                                        />
                                    </td>
                                    <td style={{ width: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                                                Product Name Goes Here
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{ fontSize: "14px", color: "#555" }}>$10</span>
                                                <button className='ms-3 btn btn-size'>L</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ width: "150px" }}>
                                        <input
                                            className="form-control form-control-sm"
                                            type="number"
                                            value={1}
                                            min={1}
                                            style={{ maxWidth: "100px" }}
                                        />
                                    </td>
                                    <td style={{ width: "50px", textAlign: "right" }}>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>

                                <tr className="align-middle">
                                    <td style={{ width: "100px" }}>
                                        <img
                                            style={{
                                                width: "80px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                            }}
                                            src={Proudct1}
                                            alt="Product"
                                        />
                                    </td>
                                    <td style={{ width: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                                                Product Name Goes Here
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{ fontSize: "14px", color: "#555" }}>$10</span>
                                                <button className='ms-3 btn btn-size'>L</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ width: "150px" }}>
                                        <input
                                            className="form-control form-control-sm"
                                            type="number"
                                            value={1}
                                            min={1}
                                            style={{ maxWidth: "100px" }}
                                        />
                                    </td>
                                    <td style={{ width: "50px", textAlign: "right" }}>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>

                                <tr className="align-middle">
                                    <td style={{ width: "100px" }}>
                                        <img
                                            style={{
                                                width: "80px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                            }}
                                            src={Proudct1}
                                            alt="Product"
                                        />
                                    </td>
                                    <td style={{ width: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                                                Product Name Goes Here
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{ fontSize: "14px", color: "#555" }}>$10</span>
                                                <button className='ms-3 btn btn-size'>L</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ width: "150px" }}>
                                        <input
                                            className="form-control form-control-sm"
                                            type="number"
                                            value={1}
                                            min={1}
                                            style={{ maxWidth: "100px" }}
                                        />
                                    </td>
                                    <td style={{ width: "50px", textAlign: "right" }}>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="row justify-content-end py-3 pb-3">
                    <div className='col-md-3'>
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

                        <div className="d-flex justify-content-end">
                            <button className='btn btn-primary'>Proceed To Checkout</button>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart

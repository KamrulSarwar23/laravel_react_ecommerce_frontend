import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useNavigate } from 'react-router-dom'
import Proudct1 from '../../assets/images/mens/eight.jpg'
import { apiUrl, customerToken, fileUrl } from './Http'
import { toast } from 'react-toastify'

const Cart = () => {


    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal, setSubTotal] = useState([]);

    const getCartProducts = async () => {
        const res = await fetch(`${apiUrl}cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setCartProducts(result.cart)
                    const total = result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    setSubTotal(total);

                } else {
                    console.log('Something went wrong');
                }
            })
    }


    const removeProduct = async (id) => {
        const res = await fetch(`${apiUrl}remove/cart/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    toast.success(result.message);
                    getCartProducts()
                    setSubTotal()
                    
                } else {
                    console.log('Something went wrong');
                }
            })
    }

    const handleQuantityChange = async (productId, newQuantity) => {

        if (newQuantity < 1) return;

        const res = await fetch(`${apiUrl}cart/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: newQuantity,
            }),
        });

        const result = await res.json();

        if (result.status === 200) {
            toast.success(result.message);

            setCartProducts(prevCart => {
                const updatedCart = prevCart.map(item =>
                    item.product_id === productId ? { ...item, quantity: newQuantity } : item
                );

                const newSubTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setSubTotal(newSubTotal);

                return updatedCart;
            });
        } else if(result.status === 401) {
            toast.error(result.message);
        }
    };


    useEffect(() => {
        getCartProducts();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

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
                        <table className="table">

                            <th>
                                <td>Image</td>
                            </th>

                            <th>
                                <td>Details</td>
                            </th>

                            <th>
                                <td>Quantity</td>
                            </th>

                            <th>
                                <td>SubTotal</td>
                            </th>

                            <th>
                                <td>Action</td>
                            </th>

                            <tbody>
                                {cartProducts && cartProducts.length > 0 ? (
                                    cartProducts.map((product, index) => (
                                        <tr key={index} className="align-middle">
                                            <td style={{ width: "100px" }}>
                                                <img
                                                    style={{
                                                        width: "80px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                    src={`${fileUrl}uploads/products/small/${product.image}`}
                                                    alt="Product"
                                                />
                                            </td>
                                            <td style={{ width: "auto" }}>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                                                        {product.title}
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        <span style={{ fontSize: "14px", color: "#555" }}>
                                                            ৳{product.price}
                                                        </span>

                                                        <div>
                                                            {product.size && (
                                                                <button className="ms-3 btn btn-size">Size: {product.size}</button>
                                                            )}

                                                            {product.color && (
                                                                <span className="ms-3 btn btn-size">Color: {product.color}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ width: "150px" }}>
                                                <input
                                                    className="form-control form-control-sm"
                                                    type="number"
                                                    value={product.quantity}
                                                    min={1}
                                                    style={{ maxWidth: "100px" }}
                                                    onChange={(e) =>
                                                        handleQuantityChange(product.product_id, parseInt(e.target.value))
                                                    }
                                                />
                                            </td>
                                            <td style={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>
                                                ৳{parseFloat(product.price * product.quantity).toFixed(2)}
                                            </td>
                                            <td style={{ width: "50px", textAlign: "right" }}>
                                                <button
                                                    onClick={() => removeProduct(product.id)}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            <strong>No Product in the cart</strong>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>


                    </div>

                </div>

                <div className="row justify-content-end py-3 pb-3">
                    <div className='col-md-3'>
                        <div className="d-flex mb-4 justify-content-between border-bottom">
                            <div className='me-2'> <strong>Sub Total:</strong> </div>
                            <div><span>৳</span>{subTotal}</div>

                        </div>


                        {
                            cartProducts.length > 0 && <div className="d-flex justify-content-end">
                                <Link to={'/checkout'} className='btn btn-primary'>Proceed To Checkout</Link>
                            </div>
                        }


                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Cart

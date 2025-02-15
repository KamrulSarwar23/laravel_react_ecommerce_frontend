import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl, customerToken, fileUrl } from './Http';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [cartProducts, setCartProducts] = useState([]);
    const [shippings, setShipping] = useState([]);
    const [subtotal, setSubTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const [selectShipping, setSelectShipping] = useState(null);


    // Fetch cart products
    const getCartProducts = async () => {
        const res = await fetch(`${apiUrl}cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            },
        }).then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setCartProducts(result.cart);
                    const total = result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    setSubTotal(total);
                } else {
                    console.log('Something went wrong');
                }
            });
    };

    const getShipping = async () => {
        const res = await fetch(`${apiUrl}get-shipping`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            },
        }).then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setShipping(result.data);
                    console.log(result.data)
                } else {
                    console.log('Something went wrong');
                }
            });
    };

    // Handle payment method selection
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    };

    const shippingMethod = (e) => {
        const selected = shippings.find(shipping => shipping.method === e.target.value);
        setSelectShipping(selected);
    };

    // Handle Cash on Delivery
    const cashOnDelivery = async (data) => {

        if (selectShipping == null) {
            setIsLoading(false);
            toast.error('Select Shipping Method');
        } else {
            setIsLoading(true);

            const payload = {
                ...data,
                payment_method: paymentMethod,
                shipping_amount: selectShipping.amount,
                shipping_method: selectShipping.method,
            };

            const res = await fetch(apiUrl + "pay-with-cash-on-delivery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${customerToken()}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.status === 200) {
                toast.success(result.message);
                getCartProducts();
                navigate('/customer/order/list');
            } else {
                if (result.status === 400) {
                    toast.error(result.errors.name[0]);
                } else {
                    toast.error(result.message || 'Something went wrong');
                }
            }
            setIsLoading(false); // Set loading to false
        }


    };



    const stripePayment = async (data) => {
        setIsLoading(true);

        const stripe = await loadStripe('pk_test_51OJbidEB4hM63P3ZjEWE3NMurrlB0gst4TUBk9q3GmXf98idAXVGHCe3Zybufud2Sr3T5IAzaSZ542ML9UYZUUw000XLl5AvLQ');

        const payload = {
            ...data,
            payment_method: paymentMethod,
        };

        const res = await fetch(apiUrl + "pay-with-stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${customerToken()}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (result.status === 200) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: result.sessionId,
            });

            if (error) {
                console.error('Stripe Error:', error); // Debugging
                toast.error(error.message);
            }
        } else {
            toast.error(result.message || 'Something went wrong');
        }
        setIsLoading(false);
    };

    // Handle form submission
    const onSubmit = (data) => {
        if (paymentMethod === 'cod') {
            cashOnDelivery(data);
        } else if (paymentMethod === 'stripe') {
            stripePayment(data);
        }
    };

    useEffect(() => {
        getCartProducts();
        getShipping();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

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

                            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                placeholder='Name'
                                                {...register("name", {
                                                    required: "The name field is required",
                                                })}
                                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder='Email'
                                                {...register("email", {
                                                    required: "The email field is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            />
                                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                placeholder='City'
                                                {...register("city", {
                                                    required: "The city field is required",
                                                })}
                                                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                                            />
                                            {errors.city && <span className="text-danger">{errors.city.message}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder='Phone'
                                                {...register("phone", {
                                                    required: "The phone field is required",
                                                })}
                                                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                            />
                                            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <textarea
                                            placeholder='Address'
                                            rows={3}
                                            {...register("address", {
                                                required: "The address field is required",
                                            })}
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                        />
                                        {errors.address && <span className="text-danger">{errors.address.message}</span>}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <button type="submit" className='btn btn-primary' disabled={isLoading}>
                                        {isLoading ? (
                                            <span>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </span>
                                        ) : (
                                            paymentMethod === 'cod' ? 'Proceed With Cash On Delivery' : 'Proceed With Stripe'
                                        )}
                                    </button>


                                </div>
                            </form>
                        </div>

                        <div className="col-md-5">
                            <div className='d-flex justify-between border-bottom'>
                                <h3 className='pb-2 me-5'><strong>Items</strong></h3>
                                <Link className='text-primary' to={'/cart'}>Modify Order</Link>
                            </div>

                            <table className='table'>
                                <tbody>
                                    {cartProducts.map((product) => (
                                        <tr key={`product-${product.id}`}>
                                            <td width={100}>
                                                <img width={80} src={`${fileUrl}uploads/products/small/${product.image}`} alt="" />
                                            </td>
                                            <td width={200}>
                                                <div className="">
                                                    <div>{product.name}</div>
                                                    <div className="d-flex align-items-center">
                                                        <button className='btn btn-size'>{product.size}</button>
                                                        <span className='me-3'>{product.color}</span>
                                                        <div className='pe-2'>{product.quantity} Pcs</div>
                                                        <span><span>৳</span>{product.price}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <span className='text-info'>You will get the delivery within 2-3 Days after confirmation.</span>
                            <div className='pt-3'>
                                <div className="d-flex mb-2 justify-content-between border-bottom">
                                    <div className='me-2'> <strong>Sub Total:</strong> </div>
                                    <div>৳{subtotal}</div>
                                </div>

                                <div className="d-flex mb-2 justify-content-between border-bottom">
                                    <div className='me-2'> <strong>Shipping:</strong> </div>
                                    <div>৳ {selectShipping ? selectShipping.amount : '0'}</div>
                                </div>

                                <div className="d-flex justify-content-between border-bottom mb-4">
                                    <div className='me-2'> <strong>Grand Total:</strong> </div>
                                    <div>৳ {subtotal + (selectShipping?.amount || 0)}</div>
                                </div>
                            </div>

                            <h3 className='border-bottom pb-3'><strong>Shipping Methods</strong></h3>

                            <div className='d-flex'>
                                {shippings.map((shipping) => (
                                    <div key={shipping.id} className='me-4'>
                                        <input
                                            id={`shipping-${shipping.id}`}
                                            name="shipping"
                                            checked={selectShipping?.method === shipping.method}
                                            value={shipping.method}
                                            className='me-1'
                                            type="radio"
                                            onChange={shippingMethod}
                                        />
                                        <label htmlFor={`shipping-${shipping.id}`}>{shipping.method}</label>
                                    </div>
                                ))}
                            </div>

                            <h3 className='border-bottom pb-2 mt-3'><strong>Payment Methods</strong></h3>

                            <div className='d-flex'>
                                <div className='me-4'>
                                    <input
                                        onClick={handlePaymentMethod}
                                        id='stripe'
                                        checked={paymentMethod === 'stripe'}
                                        value={'stripe'}
                                        className='me-1'
                                        type="radio"
                                    />
                                    <label htmlFor="stripe">Stripe</label>
                                </div>

                                <div>
                                    <input
                                        onClick={handlePaymentMethod}
                                        id='cod'
                                        checked={paymentMethod === 'cod'}
                                        value={'cod'}
                                        className='me-1'
                                        type="radio"
                                    />
                                    <label htmlFor="cod">Cash on Delivery</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Checkout;
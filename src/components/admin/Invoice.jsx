import React, { useEffect, useState } from 'react'

import { format } from "date-fns";
import Layout from '../common/Layout';
import SideBar from '../common/SideBar';
import { apiUrl, fileUrl, token } from '../common/Http';
import Loader from '../common/Loader';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const Invoice = () => {

    const params = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState();
    const [orderStatus, setOrderStatus] = useState();
    // Fetch categories from API
    const fetchOrderItems = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}invoice/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            if (result.status == 200) {
                setLoader(false)
                setOrderItems(result.data);
                setPaymentStatus(result.data.payment_status)
                setOrderStatus(result.data.order_status)
              
            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const changePaymentStatus = async () => {



        const res = await fetch(`${apiUrl}change-payment-status/${params.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
        });

        const result = await res.json();

        if (result.status == 200) {
         toast.success(result.message)
          
        } else {
            
            toast.error('Something Went Wrong')
        }
    }

    const changeOrderStatus = async () => {


        const res = await fetch(`${apiUrl}change-order-status/${params.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
        });

        const result = await res.json();

        if (result.status == 200) {
         toast.success(result.message)
          
        } else {
            
            toast.error('Something Went Wrong')
        }
    }



    useEffect(() => {
        fetchOrderItems();
    }, []);

    return (
        <Layout>
            <div>
                <main className="my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <SideBar />
                            </div>

                            <div className="col-md-9">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h4 className="h5">Order Items</h4>

                                            <h4 className="h5">Invoice Id: {orderItems.invoice_id}</h4>

                                          <div className="d-flex justify-content-between">
                                          <select onChange={changePaymentStatus} className='form-control me-3' name="" id="">
                                                <option disabled value="">Payment Status</option>
                                                <option selected={paymentStatus == 0} value="0">Pending</option>
                                                <option selected={paymentStatus == 1} value="1">Paid</option>
                                            </select>
                                            <select onChange={changeOrderStatus} className='form-control me-3' name="" id="">
                                                <option disabled value="">Order Status</option>
                                                <option selected={orderStatus == 'pending'} value="pending">Pending</option>
                                                <option selected={orderStatus == 'delivered'} value="delivered">Delivered</option>
                                            </select>
                                          </div>

                                 
                                
                                        </div>

                                        <hr />

                                        {
                                            loader == true && <Loader />
                                        }
                                          <div className="table-responsive">
                                          <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Product Image</th>
                                                    <th>Product Name</th>
                                                    <th>Unit Price</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                     <th>Order Date</th>
                                               
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {orderItems.order_items && orderItems.order_items.length > 0 ? (
                                                    orderItems.order_items.map((orderItem, index) => (
                                                        <tr key={orderItem.id}>
                                                            <td>{index+1}</td>
                                                        
                                                            <td><img width={70} src={`${fileUrl}uploads/products/small/${orderItem.image}`} alt="" /> </td>
                                                            <td>{orderItem.product_name}</td>
                                                            <td>{orderItem.unit_price}</td>
                                                            <td>{orderItem.qty}</td>
                                                            <td>{orderItem.unit_price * orderItem.qty}</td>
                                                            <td>
                                                                {format(new Date(orderItem.created_at), "PPP")}
                                                            </td>

                                                   
                                                            <td>
                                                     
                                                          
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className='text-center py-5' colSpan="8">No Invoice Available</td>
                                                    </tr>
                                                )}
                                            </tbody>

                                       
                                        </table>
                                          </div>
                                       
                                    </div>

                                    <div className="row">
                                    <div className="col-md-12 text-end">
                                    <div className='me-3 mb-3'>
                                        <h4>SubTotal: {orderItems.sub_total}</h4>
                                        <h4>Delivery Fee: 60</h4>
                                        <h4>Total: {orderItems.amount}</h4>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Invoice;

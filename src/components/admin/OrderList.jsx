import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import Layout from '../common/Layout';
import SideBar from '../common/SideBar';
import { apiUrl, token } from '../common/Http';
import Loader from '../common/Loader';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchOrders = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}order-list`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            if (result.data) {
                setLoader(false)
                setOrders(result.data);

            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchOrders();
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
                                            <h4 className="h5">Order List</h4>
                                      
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
                                                        <th>Invoice Id</th>
                                                        <th>Product Quantity</th>
                                                        <th>Total</th>
                                                        <th>Payment Status</th>
                                                        <th>Order Status</th>
                                                        <th>Order Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {orders && orders.length > 0 ? (
                                                        orders.map((order, index) => (
                                                            <tr key={order.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.invoice_id}</td>

                                                                <td className='text-center'>{order.product_qty}</td>
                                                              



                                                                <td>৳{order.amount}</td>


                                                                {
                                                                    order.payment_status == 0 && <td>Pending</td>
                                                                }

                                                                {
                                                                    order.payment_status == 1 && <td>Paid</td>
                                                                }

                                                                <td>{order.order_status == 'pending' ? 'Pending' : 'Delivered'}</td>

                                                                <td>
                                                                    {format(new Date(order.created_at), "PPP p")}
                                                                </td>

                                                                <td>
                                                                    <Link to={`/admin/invoice/${order.id}`} className='btn btn-primary'>Invoice</Link>
                                                                </td>
                                                                <td>


                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="12">No Orders Available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
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

export default OrderList;

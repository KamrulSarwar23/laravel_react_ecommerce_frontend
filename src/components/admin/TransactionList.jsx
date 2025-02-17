import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import Layout from '../common/Layout';
import SideBar from '../common/SideBar';
import { apiUrl, token } from '../common/Http';
import Loader from '../common/Loader';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchOrders = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}transaction-list`, {
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
                setTransactions(result.data);

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
                                            <h4 className="h5">Transaction List</h4>

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
                                                        <th>Transaction Id</th>
                                                        <th>Payment Method</th>
                                                        <th>Payment Status</th>
                                                        <th>Amount</th>
                                                        <th>Created At</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {transactions && transactions.length > 0 ? (
                                                        transactions.map((transaction, index) => (
                                                            <tr key={transaction.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{transaction.order.invoice_id}</td>
                                                                <td>{transaction.transaction_id}</td>

                                                                <td>{transaction.payment_method == 'cod' ? 'Cash On Delivery' : 'Stripe Payment'}</td>

                                                                {
                                                                    transaction.payment_status == 0 && <td>Pending</td>
                                                                }

                                                                {
                                                                    transaction.payment_status == 1 && <td>Paid</td>
                                                                }

                                                                <td>৳{transaction.amount}</td>


                                                                <td>
                                                                    {format(new Date(transaction.created_at), "PPP p")}
                                                                </td>
                                                                <td>


                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="7">No Transactions Available</td>
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

export default TransactionList;

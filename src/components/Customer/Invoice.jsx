import React, { useEffect, useRef, useState } from 'react'

import { format } from "date-fns";
import Layout from '../common/Layout';
import Loader from '../common/Loader';
import { useParams } from 'react-router-dom';
import { apiUrl, customerToken, fileUrl } from "../common/Http";
import SideBar from './SideBar';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Invoice = () => {

    const params = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');

    // Fetch categories from API
    const fetchOrderItems = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}customer-invoice/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${customerToken()}`,
                },
            });

            const result = await res.json();

            if (result.status == 200) {
                setLoader(false)
                setOrderItems(result.data);
                setShippingAddress(result.data.shipping_address)

            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const invoiceRef = useRef(); // Ref for printing


    const handleDownloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${orderItems.invoice_id}.pdf`);
        });
    };
    

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

                                <div className="d-flex justify-content-end mb-3">
                                   
                                    <button onClick={handleDownloadPDF} className="text-white btn btn-info">
                                        Download Invoice
                                    </button>
                                </div>
                                <div className="card shadow border-0" ref={invoiceRef}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h4 className="h5">Order Items</h4>
                                            <h4 className="h5">Invoice Id: {orderItems.invoice_id}</h4>
                                        </div>

                                        <hr />

                                        {
                                            loader == true && <Loader />
                                        }

                                        <div className='row py-4'>

                                            <div className='col-md-6'>
                                                <h4>Customer Name: {shippingAddress.name}</h4>
                                                <h4>Customer Email: {shippingAddress.email}</h4>
                                                <h4>Customer Phone: {shippingAddress.phone}</h4>
                                                <h4>Customer City: {shippingAddress.city}</h4>
                                                <h4>Shipping Address: {shippingAddress.address}</h4>
                                            </div>

                                            <div className='col-md-6 text-end'>


                                                <h4>Shipping Zone: {orderItems.shipping_method}</h4>
                                                <h4>Shipping Cost: ৳{orderItems.shipping_amount}</h4>
                                                <h4>Payment Method: {orderItems.payment_method == 'cod' ? 'Cash On Delivery' : 'Stripe Payment'}</h4>
                                                <h4>Payment Status: {orderItems.payment_status == 0 ? 'Pending' : 'Paid'}</h4>
                                                <h4>Order Status: {orderItems.order_status == 'pending' ? 'Pending' : 'Delivered'}</h4>
                                            </div>
                                        </div>



                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Product Image</th>
                                                        <th>Product Name</th>
                                                        <th>Size</th>
                                                        <th>Color</th>
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
                                                                <td>{index + 1}</td>
                                                                <td><img width={70} src={`${fileUrl}uploads/products/small/${orderItem.image}`} alt="" /> </td>
                                                                <td>{orderItem.product_name}</td>
                                                                <td>{orderItem.size}</td>
                                                                <td>{orderItem.color || '-'}</td>
                                                                <td>৳{orderItem.unit_price}</td>
                                                                <td>{orderItem.qty}</td>
                                                                <td>৳{orderItem.unit_price * orderItem.qty}</td>
                                                                <td>
                                                                    {format(new Date(orderItem.created_at), "PPP p")}
                                                                </td>


                                                                <td>


                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="9">No Invoice Available</td>
                                                        </tr>
                                                    )}
                                                </tbody>


                                            </table>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 text-end">
                                            <div className='me-3 mb-3'>
                                                <h4>SubTotal: ৳{orderItems.sub_total}</h4>
                                                <h4>Delivery Fee: ৳{orderItems.shipping_amount}</h4>
                                                <h4>Total: ৳{orderItems.amount}</h4>
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

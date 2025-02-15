import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { format } from "date-fns";
import Layout from '../common/Layout';
import SideBar from '../common/SideBar';
import { apiUrl, token } from '../common/Http';
import Loader from '../common/Loader';

const ProductReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchOrders = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}product-reviews`, {
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
                setReviews(result.data);

            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Delete category

    const deleteReview = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const res = await fetch(`${apiUrl}remove-product-review/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token()}`,
                        },
                    });

                    const result = await res.json();

                    if (result.status === 200) {
                        setReviews(reviews.filter((review) => review.id !== id));

                        Swal.fire("Deleted!", result.message, "success");
                    } else if (result.status === 400) {
                        Swal.fire("Error!", result.message, "error");
                    } else {
                        Swal.fire("Error", result.message, "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the category. Please try again.", "error");
                }
            }
        });
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
                                            <h4 className="h5">Product Review</h4>

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
                                                        <th>Comment</th>
                                                        <th>Rating</th>
                                                        <th>Created At</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {reviews && reviews.length > 0 ? (
                                                        reviews.map((review, index) => (
                                                            <tr key={review.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{review.comment}</td>
                                                                <td>

                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i} className={i < review.rating ? "text-warning" : "text-secondary"}>
                                                                            ★
                                                                        </span>
                                                                    ))}

                                                                </td>


                                                                <td>
                                                                    {format(new Date(review.created_at), "PPP p")}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => deleteReview(review.id)}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        <i className="fa-solid fa-trash"></i>
                                                                    </button>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="6">No Transactions Available</td>
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

export default ProductReview;

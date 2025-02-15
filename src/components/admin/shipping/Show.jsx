import React, { useEffect, useState } from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import { apiUrl, token } from '../../common/Http';
import Swal from "sweetalert2";
import { format } from "date-fns";
import Loader from '../../common/Loader';

const Show = () => {
    const [shippings, setShipping] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchShipping = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}shipping`, {
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
                setShipping(result.data);
            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Delete category
    const deleteShipping = async (id) => {
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

                    const res = await fetch(`${apiUrl}shipping/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token()}`,
                        },
                    });

                    const result = await res.json();

                    if (result.status === 200) {
                        setShipping(shippings.filter((shipping) => shipping.id !== id));

                        Swal.fire("Deleted!", result.message, "success");
                    } else if (result.status === 400) {
                        Swal.fire("Error!", result.message, "error");
                    } else {
                        Swal.fire("Error", result.message, "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the shipping. Please try again.", "error");
                }
            }
        });
    };

    useEffect(() => {
        fetchShipping();
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
                                            <h4 className="h5">Shipping</h4>
                                            <Link
                                                className="btn btn-primary"
                                                to={"/admin/shipping/create"}
                                            >
                                                Create
                                            </Link>
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
                                                        <th>Method</th>
                                                        <th>Amount</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {shippings && shippings.length > 0 ? (
                                                        shippings.map((shipping, index) => (
                                                            <tr key={shipping.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{shipping.method}</td>

                                                                <td>{shipping.amount}</td>

                                                                <td className='d-flex'>
                                                                    <Link
                                                                        to={`/admin/shipping/edit/${shipping.id}`}
                                                                        className="btn btn-sm btn-info me-2"
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                                    </Link>

                                                                    <button
                                                                        onClick={() => deleteShipping(shipping.id)}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        <i className="fa-solid fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="5">No Categories Available</td>
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

export default Show;



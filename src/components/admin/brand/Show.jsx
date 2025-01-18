import React, { useEffect, useState } from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import { apiUrl, token } from '../../common/Http';
import Swal from "sweetalert2";
import { format } from "date-fns";
import Loader from '../../common/Loader';

const Show = () => {
    const [brands, setBrands] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchBrands = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}brands`, {
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
                setBrands(result.data);
            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Delete category
    const deleteBrand = async (id) => {
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

                    const res = await fetch(`${apiUrl}brands/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token()}`,
                        },
                    });

                    const result = await res.json();

                    if (result.status === 200) {
                        setBrands(brands.filter((brand) => brand.id !== id));
                        Swal.fire("Deleted!", result.message, "success");
                    } else {
                        Swal.fire("Error", result.message, "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the brand. Please try again.", "error");
                }
            }
        });
    };

    useEffect(() => {
        fetchBrands();
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
                                            <h4 className="h5">Brands</h4>
                                            <Link
                                                className="btn btn-primary"
                                                to={"/brands/create"}
                                            >
                                                Create
                                            </Link>
                                        </div>

                                        <hr />

                                        {
                                            loader == true && <Loader />
                                        } 
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {brands && brands.length > 0 ? (
                                                    brands.map((brand, index) => (
                                                        <tr key={brand.id}>
                                                            <td>{index+1}</td>
                                                            <td>{brand.name}</td>
                                                            <td>
                                                                {brand.status === 1 ? <span className='badge text-bg-success'>Active</span> : <span className='badge text-bg-danger'>Inactive</span>}
                                                            </td>
                                                            <td>
                                                                {format(new Date(brand.created_at), "PPP")}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/brands/edit/${brand.id}`}
                                                                    className="btn btn-sm btn-info me-2"
                                                                >
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </Link>

                                                                <button
                                                                    onClick={() => deleteBrand(brand.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className='text-center py-5' colSpan="5">No Brands Available.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

import React, { useEffect, useState } from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import { apiUrl, token } from '../../common/Http';
import Swal from "sweetalert2";
import { format } from "date-fns";

const Show = () => {
    const [categories, setCategories] = useState([]);


    // Fetch categories from API
    const fetchArticles = async () => {
        try {

            const res = await fetch(`${apiUrl}categories`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            if (result.data) {
                setCategories(result.data);
            } else {
               console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
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
                  
                    const res = await fetch(`${apiUrl}categories/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token()}`,
                        },
                    });

                    const result = await res.json();

                    if (result.status === 200) {
                        setCategories(categories.filter((category) => category.id !== id));
                        Swal.fire("Deleted!", result.message, "success");
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
        fetchArticles();
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
                                            <h4 className="h5">Categories</h4>
                                            <Link
                                                className="btn btn-primary"
                                                to={"/categories/create"}
                                            >
                                                Create
                                            </Link>
                                        </div>

                                        <hr />

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
                                                { categories.length > 0 ? (
                                                    categories.map((category) => (
                                                        <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.name}</td>
                                                            <td>
                                                                {category.status === 1 ? "Active" : "Inactive"}
                                                            </td>
                                                            <td>
                                                                {format(new Date(category.created_at), "PPP")}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/categories/edit/${category.id}`}
                                                                    className="btn btn-sm btn-info me-2"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    onClick={() => deleteCategory(category.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5">No Categories Available.</td>
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

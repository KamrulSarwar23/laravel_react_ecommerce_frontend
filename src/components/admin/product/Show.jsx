import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout';
import SideBar from '../../common/SideBar';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { apiUrl, fileUrl, token } from '../../common/Http';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const Show = () => {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [paginator, setPaginator] = useState(null);


    const fetchProducts = async (url = `${apiUrl}products`) => {

        try {
            setLoader(true)
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                }
            });

            const result = await res.json();
            console.log(result);
            if (result.status == 200) {
                setLoader(false)
                setProducts(result.data.data);

                setPaginator({
                    links: result.data.links,
                    total: result.data.total,
                    from: result.data.from,
                    to: result.data.to,
                    per_page: result.data.per_page,
                });

            } else {
                setLoader(false)
                console.log(result.error)
            }

        } catch (error) {
            setLoader(false)
            console.log(error)

        } finally {
            setLoader(false);
        }

    }

    const deleteProduct = async (id) => {
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

                    const res = await fetch(`${apiUrl}products/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token()}`,
                        },
                    });

                    const result = await res.json();

                    if (result.status === 200) {
                        setProducts(products.filter((product) => product.id !== id));

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

    const handlePageChange = (url) => {
        if (url) fetchProducts(url);
    };

    // Function to update a single product's property in state
    const updateProductState = (id, key, value) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, [key]: value } : product
            )
        );
    };

    const handleStatus = async (productId) => {
        const isChecked = document.getElementById(`statusSwitchDefault-${productId}`).checked;

        try {
            const response = await fetch(`${apiUrl}change-product-status/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
                body: JSON.stringify({ status: isChecked }),
            });

            const result = await response.json();

            if (result.status === 200) {
                toast.success(result.message);
                // Update the product state
                updateProductState(productId, "status", isChecked);
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error:", error);
        }
    };

    const handleIsFeatured = async (productId) => {
        const isChecked = document.getElementById(
            `isFeaturedSwitchDefault-${productId}`
        ).checked;

        try {
            const response = await fetch(`${apiUrl}change-product-is_featured/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
                body: JSON.stringify({ is_featured: isChecked }),
            });

            const result = await response.json();

            if (result.status === 200) {
                toast.success(result.message);
                // Update the product state
                updateProductState(productId, "is_featured", isChecked ? "yes" : "no");
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

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
                                            <h4 className="h5">Products</h4>
                                            <Link
                                                className="btn btn-primary"
                                                to={"/admin/products/create"}
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
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Price</th>
                                                    <th>Category</th>
                                                    <th>Brand</th>
                                                    
                                                    <th>Status</th>
                                                    <th>Is Featured</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {products && products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <tr key={`product-${index}`}>
                                                            <td>{product.id}</td>
                                                            <td>
                                                                {
                                                                    product.image_url == "" ? <img width={55} src={`${fileUrl}img_placeholder.jpg`} alt="" /> : <img width={55} src={product.image_url} alt="" />
                                                                }

                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>${product.price}</td>

                                                            <td>{product.category.name}</td>

                                                            {
                                                                product.brand ? <td>{product.brand.name}</td> : <td>--</td>
                                                            }

                                                      


                                                            <td>

                                                                <div className="form-check form-switch">
                                                                    <input onChange={() => handleStatus(product.id)} checked={product.status} className="form-check-input" type="checkbox" id={`statusSwitchDefault-${product.id}`} />

                                                                </div>

                                                            </td>

                                                            <td>

                                                                <div className="form-check form-switch">
                                                                    <input onChange={() => handleIsFeatured(product.id)} checked={product.is_featured === "yes"} className="form-check-input" type="checkbox" id={`isFeaturedSwitchDefault-${product.id}`} />
                                                                </div>

                                                            </td>

                                                            <td>
                                                                <Link
                                                                    to={`/admin/products/edit/${product.id}`}
                                                                    className="btn btn-sm btn-info me-2"
                                                                >
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </Link>

                                                                <button
                                                                    onClick={() => deleteProduct(product.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className='text-center py-5' colSpan="9">No Products Available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {/* Pagination */}
                                        {paginator && paginator.total > paginator.per_page && (
                                            <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {paginator.links.map((link, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handlePageChange(link.url)}
                                                            disabled={!link.url}
                                                            className={[
                                                                "btn btn-sm px-4 py-2 rounded-pill transition-all",
                                                                !link.url
                                                                    ? "btn-secondary disabled text-white"
                                                                    : "btn-outline-primary",
                                                                link.active
                                                                    ? "btn-primary text-white fw-bold"
                                                                    : "btn-outline-primary text-dark border-primary",
                                                            ].join(" ")}
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                                className="text-center"
                                                            ></span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="mt-3 text-muted fw-semibold">
                                                    Showing <span className="text-primary fw-bold">{paginator.from}</span> to{" "}
                                                    <span className="text-primary fw-bold">{paginator.to}</span> of{" "}
                                                    <span className="text-primary fw-bold">{paginator.total}</span> items
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default Show

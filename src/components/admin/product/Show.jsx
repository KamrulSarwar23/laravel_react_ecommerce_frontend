import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout';
import SideBar from '../../common/SideBar';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { apiUrl, fileUrl, token } from '../../common/Http';
import Swal from "sweetalert2";

const Show = () => {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    

    const fetchProducts = async () => {

        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                }
            });

            const result = await res.json();
            if (result.status == 200) {
                setLoader(false)
                setProducts(result.data);

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
                                                    <th>Qty</th>
                                                    <th>SKU</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {products && products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <tr key={product.id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                            {
                                                                product.image_url == "" ?  <img width={55} src={`${fileUrl}img_placeholder.jpg`} alt="" /> :  <img width={55} src={product.image_url} alt="" />
                                                            }
                                                            
                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>${product.price}</td>
                                                            <td>{product.qty}</td>
                                                            <td>{product.sku}</td>
                                                            <td>
                                                                {product.status === 1 ? <span className='badge text-bg-success'>Active</span> : <span className='badge text-bg-danger'>Inactive</span>}
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
                                                        <td className='text-center py-5' colSpan="8">No Products Available</td>
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
}

export default Show

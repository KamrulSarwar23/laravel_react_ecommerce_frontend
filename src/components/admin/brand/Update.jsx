import React, { useState } from 'react'
import SideBar from '../../common/SideBar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, token } from '../../common/Http';
import Layout from '../../common/Layout';


const Update = () => {
    const [isDisable, setIsDisable] = useState(false);
    const navigate = useNavigate();
    const params = useParams();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'brands/' + params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();

            return {
                name: result.data.name,
                status: result.data.status,
            }
        }
    });


    const onSubmit = async (data) => {
        setIsDisable(true)
        const res = await fetch(apiUrl + "brands/" + params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.status == 200) {
            toast.success(result.message);
            setIsDisable(false)
            navigate("/admin/brands");
        } else {

            if (result.status == 400) {
                toast.error(result.errors.name[0])
                setIsDisable(false)
            }

            toast.error(result.message);
        }
    };

    return (
        <div>

           <Layout>
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
                                        <h4 className="h5">Edit Brand</h4>
                                    </div>

                                    <hr />

                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                placeholder="Name"
                                                {...register("name", {
                                                    required: "The name field is required",
                                                })}
                                                type="text"
                                                id="title"
                                                className={`form-control ${errors.name ? "is-invalid" : ""
                                                    }`}
                                            />

                                            {errors.name && (
                                                <p className="invalid-feedback">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">
                                                Status
                                            </label>
                                            <select
                                                {...register("status", {
                                                    required: "The status field is required",
                                                })}
                                                id="status"
                                                className={`form-control ${errors.status ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                            {errors.status && (
                                                <p className="invalid-feedback">
                                                    {errors.status.message}
                                                </p>
                                            )}
                                        </div>

                                        <button disabled={isDisable} type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
           </Layout>

        </div>
    );
}

export default Update

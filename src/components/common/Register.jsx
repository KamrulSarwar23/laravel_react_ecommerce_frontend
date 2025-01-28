import React, { useState } from 'react';
import Layout from '../common/Layout';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await fetch(`${apiUrl}register`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {

                if (result.status == 200) {

                    toast.success('Register Successfully')
                    navigate('/login');

                } else {

                    if (result.status == 400) {
                        setLoading(false);
                        toast.error(result.errors.password[0])
                        toast.error(result.errors.name[0])
                        toast.error(result.errors.email[0])
                    }

                    setLoading(false);
                }
            })
    };

    return (
        <div>
            <Layout>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="card p-5 shadow border-0 loginform">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-4">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        {...register("name", {
                                            required: "The name field is required",
                                        })}
                                        className={`form-control ${errors.name && 'is-invalid'
                                            }`}
                                        type="text"
                                        placeholder="Name"
                                    />
                                    {errors.name && (
                                        <p className="invalid-feedback">{errors.name?.message}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        {...register("email", {
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Please enter a valid email address",
                                            },
                                        })}
                                        className={`form-control ${errors.email && 'is-invalid'
                                            }`}
                                        type="text"
                                        placeholder="Valid Email"
                                    />
                                    {errors.email && (
                                        <p className="invalid-feedback">{errors.email?.message}</p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        {...register("password", {
                                            required: "The password field is required",
                                        })}
                                        className={`form-control ${errors.password && 'is-invalid'
                                            }`}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="invalid-feedback">{errors.password?.message}</p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password_confirmation">Confirm Password</label>
                                    <input
                                        id="password_confirmation"
                                        {...register("password_confirmation", {
                                            required: "The password field is required",
                                        })}
                                        className={`form-control ${errors.password_confirmation && 'is-invalid'
                                            }`}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="invalid-feedback">{errors.password_confirmation?.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>{' '}
                                            Logging in...
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                </button>

                                   <div className='mt-3'>
                                   <span>Already have an account?  <Link className='text-primary' to="/login"> Login</Link></span>
                                   </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Register;

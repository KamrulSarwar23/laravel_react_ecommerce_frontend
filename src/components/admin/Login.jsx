import React, { useContext, useState } from 'react';
import Layout from '../common/Layout';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {

    const navigate = useNavigate();
    
    const { login } = useContext(AdminAuthContext)
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await fetch(`${apiUrl}login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {

                if (result.status == 200) {

                    const adminInfo = {
                        token: result.token,
                        id: result.id,
                        name: result.name
                    }

                    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
                    login(adminInfo);
                    toast.success('Login Successfully')
                    navigate('/dashboard');


                } else {
                    toast.error(result.message)
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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <p className="invalid-feedback">{errors.password?.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
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
                                        'Submit'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Login;

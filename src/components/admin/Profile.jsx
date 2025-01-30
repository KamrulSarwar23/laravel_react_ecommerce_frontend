import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../common/Layout";
import SideBar from "../common/SideBar";
import { apiUrl, token } from "../common/Http";

const Profile = () => {
    // Separate forms for profile and password updates
    const { register: registerProfile, handleSubmit: handleProfileSubmit, setValue, formState: { errors: profileErrors } } = useForm();
    const { register: registerPassword, reset, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${apiUrl}admin/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token()}`,
                    },
                });
                const result = await res.json();
                if (res.ok) {
                    setUser(result.data);
                    setValue("name", result.data.name);
                    setValue("email", result.data.email);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [setValue]);

    // Profile update function
    const onSubmitProfile = async (data) => {
        try {
            const res = await fetch(`${apiUrl}admin/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.status === 200) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // Password update function
    const onSubmitPassword = async (data) => {
        try {
            const res = await fetch(`${apiUrl}admin/update-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
                body: JSON.stringify({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    newPassword_confirmation: data.confirmPassword, // Laravel requires '_confirmation'
                }),
            });
    
            const result = await res.json();
            if (res.ok) {
                reset()
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    
    return (
        <Layout>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3">
                        <SideBar />
                    </div>
                    <div className="col-md-9">
                        {/* Profile Update Form */}
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h4 className="h5">Profile</h4>
                                <hr />
                                <form onSubmit={handleProfileSubmit(onSubmitProfile)}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            {...registerProfile("name", { required: "Name is required" })}
                                            className={`form-control ${profileErrors.name ? "is-invalid" : ""}`}
                                        />
                                        {profileErrors.name && <p className="invalid-feedback">{profileErrors.name.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input disabled {...registerProfile("email")} className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Profile</button>
                                </form>
                            </div>
                        </div>

                        {/* Password Update Form */}
                        <div className="card shadow border-0 mt-5">
                            <div className="card-body">
                                <h4 className="h5">Change Password</h4>
                                <hr />
                                <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                                    <div className="mb-3">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            {...registerPassword("currentPassword", { required: "Current password is required" })}
                                            className={`form-control ${passwordErrors.currentPassword ? "is-invalid" : ""}`}
                                        />
                                        {passwordErrors.currentPassword && <p className="invalid-feedback">{passwordErrors.currentPassword.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            {...registerPassword("newPassword", { required: "New password is required" })}
                                            className={`form-control ${passwordErrors.newPassword ? "is-invalid" : ""}`}
                                        />
                                        {passwordErrors.newPassword && <p className="invalid-feedback">{passwordErrors.newPassword.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            {...registerPassword("confirmPassword", { required: "Please confirm new password" })}
                                            className={`form-control ${passwordErrors.confirmPassword ? "is-invalid" : ""}`}
                                        />
                                        {passwordErrors.confirmPassword && <p className="invalid-feedback">{passwordErrors.confirmPassword.message}</p>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

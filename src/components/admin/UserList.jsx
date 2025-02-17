import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import Layout from '../common/Layout';
import SideBar from '../common/SideBar';
import { apiUrl, token } from '../common/Http';
import Loader from '../common/Loader';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch categories from API
    const fetchUsers = async () => {
        try {
            setLoader(true)
            const res = await fetch(`${apiUrl}user-list`, {
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
                setUsers(result.data);

            } else {
                setLoader(false)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchUsers();
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
                                            <h4 className="h5">Users List</h4>
                                     
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
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Created At</th>
                                                        <th>Updated At</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {users && users.length > 0 ? (
                                                        users.map((user, index) => (
                                                            <tr key={user.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>
                                                                    {format(new Date(user.created_at), "PPP")}
                                                                </td>
                                                                <td>

                                                                    {format(new Date(user.updated_at), "PPP")}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center py-5' colSpan="5">No Users Available</td>
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

export default UserList;

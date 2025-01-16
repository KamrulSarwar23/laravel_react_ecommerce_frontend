import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'

const Dashboard = () => {

    const {logout} = useContext(AdminAuthContext);
  return (
    <div>
        <Layout>
        <h1>Dashboard</h1>

        <button onClick={logout}>Logout</button>
        </Layout>
    </div>
  )
}

export default Dashboard

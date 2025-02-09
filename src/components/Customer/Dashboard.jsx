import React from 'react'
import Layout from '../common/Layout'
import SideBar from '../Customer/SideBar'

const Dashboard = () => {


  return (
    <div>
      <Layout>

        <div className="container">
          <div className="row">

          
            <div className="d-flex justify-content-between mt-3">
              <h4 className='h4 pb-0 mb-0'>Customer Dashboard</h4>
            </div>
            <div className="col-md-3 py-4">
              <SideBar />
            </div>

            <div className="col-md-9">
              <div className="row mt-4">

                <div className="col-md-12 mb-3">
                  <div className='card shadow'>
                    <div className="card-body text-center py-5">
                     
                      <h2>Customer Dashboard</h2>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>

      </Layout>
    </div>
  )
}

export default Dashboard

import React, { useState } from 'react'
import SideBar from '../../common/SideBar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { apiUrl, token } from '../../common/Http';
import Layout from '../../common/Layout';


const Show = () => {
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    setIsDisable(true)

    const res = await fetch(apiUrl + "shipping", {
      method: "POST",
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
      navigate("/admin/shipping");
    } else {

      if (result.status == 400) {
        toast.error(result.errors.name[0])
        setIsDisable(false)
      }

      toast.error(result.errors);
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
                    <h4 className="h5">Create Shipping</h4>
                  </div>

                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                      <label htmlFor="method" className="form-label">
                        Name
                      </label>
                      <input
                        placeholder="Shipping Zone"
                        {...register("method", {
                          required: "The method field is required",
                        })}
                        type="text"
                        id="method"
                        className={`form-control ${errors.method ? "is-invalid" : ""
                          }`}
                      />

                      {errors.method && (
                        <p className="invalid-feedback">
                          {errors.method.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        Name
                      </label>
                      <input
                        placeholder="Amount"
                        {...register("amount", {
                          required: "The amount field is required",
                        })}
                        type="number"
                        id="amount"
                        className={`form-control ${errors.amount ? "is-invalid" : ""
                          }`}
                      />

                      {errors.amount && (
                        <p className="invalid-feedback">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    <button disabled={isDisable} type="submit" className="btn btn-primary">
                      Submit
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

export default Show

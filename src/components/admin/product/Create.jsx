import React, { useState, useRef, useMemo, useEffect } from "react";
import SideBar from '../../common/SideBar'
import { useForm } from 'react-hook-form';
import Layout from '../../common/Layout';
import { apiUrl, token } from '../../common/Http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import JoditEditor from "jodit-react";


const Create = () => {

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter content here...",
    }),
    []
  );

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCategories = async () => {

    try {
      const res = await fetch(`${apiUrl}get-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        }
      });

      const result = await res.json();
      setCategories(result.data);

    } catch (error) {

      console.log(error)
    }


  }

  const getBrands = async () => {

    try {
      const res = await fetch(`${apiUrl}get-brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        }
      });

      const result = await res.json();
      setBrands(result.data);

    } catch (error) {

      console.log(error)
    }


  }

  const getSizes = async () => {

    try {
      const res = await fetch(`${apiUrl}sizes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        }
      });

      const result = await res.json();
      setSizes(result.data);

    } catch (error) {

      console.log(error)
    }


  }

  const storeProduct = async (data) => {
    const newData = { ...data, "description": content, "gallery": gallery };
    setIsDisable(true)

    const res = await fetch(apiUrl + "products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();

    if (result.status == 200) {

      console.log(result);
      toast.success(result.message);
      setIsDisable(false)
      navigate("/admin/products");
    } else {

      if (result.status == 400) {
        toast.error(result.errors.sku[0]);
        setIsDisable(false);
      }
      toast.error(result.errors);
    }
  };


  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setIsDisable(true);

    const res = await fetch(apiUrl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData
    }).then(res => res.json())
      .then(result => {

        gallery.push(result.data.id)
        setGallery(gallery)
        galleryImages.push(result.data.image_url)
        setGalleryImages(galleryImages)

        setIsDisable(false);

        e.target.value = ""
        toast.success(result.message);
      })
  }

  const removeImage = (image) => {

    // Find the index of the image to be removed in galleryImages
    const imageIndex = galleryImages.indexOf(image);

    if (imageIndex !== -1) {

      // Remove the image from galleryImages
      const updatedGalleryImages = [...galleryImages];
      updatedGalleryImages.splice(imageIndex, 1);
      setGalleryImages(updatedGalleryImages);

      // Remove the corresponding ID from gallery
      const updatedGallery = [...gallery];
      updatedGallery.splice(imageIndex, 1);
      setGallery(updatedGallery);
    }
  };


  useEffect(() => {
    getCategories();
    getBrands();
    getSizes();
  }, []);

  return (
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
                    <h4 className="h5">Create Product</h4>
                  </div>

                  <hr />

                  <form onSubmit={handleSubmit(storeProduct)}>

                    <h3 className="py-3 border-bottom mb-4">Product Details</h3>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        placeholder="Title"
                        {...register("title", {
                          required: "The title field is required",
                        })}
                        type="text"
                        id="title"
                        className={`form-control ${errors.title ? "is-invalid" : ""
                          }`}
                      />

                      {errors.title && (
                        <p className="invalid-feedback">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            Category
                          </label>

                          <select
                            className={`form-control ${errors.category ? "is-invalid" : ""
                              }`}
                            id="category"
                            {...register("category", {
                              required: "The category field is required",
                            })}

                          >
                            <option value="">Select Category</option>
                            {categories && categories.length > 0
                              ? categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))
                              : null}
                          </select>

                          {errors.category && (
                            <p className="invalid-feedback">{errors.category.message}</p>
                          )}
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="brand" className="form-label">
                            Brand
                          </label>

                          <select
                            className="form-control"
                            id="brand"
                            {...register("brand")}
                          >
                            <option value="">Select Brand</option>
                            {brands && brands.length > 0
                              ? brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                  {brand.name}
                                </option>
                              ))
                              : null}
                          </select>

                          {errors.brand && (
                            <p className="invalid-feedback">{errors.brand.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="short_description" className="form-label">
                            Short Descriprion
                          </label>

                          <textarea className='form-control' name="" id="" rows={5}
                            {...register("short_description", {

                            })}
                          >

                          </textarea>

                          {errors.short_description && (
                            <p className="invalid-feedback">
                              {errors.short_description.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}

                            onChange={(newContent) => setContent(newContent)}
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="py-3 border-bottom mb-4">Pricing</h3>
                    <div className="row">
                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="price" className="form-label">
                            Offer Price (৳)
                          </label>
                          <input
                            placeholder="Price"
                            {...register("price", {
                              required: "The price field is required",
                            })}
                            type="number"
                            id="title"
                            className={`form-control ${errors.price ? "is-invalid" : ""
                              }`}
                          />

                          {errors.price && (
                            <p className="invalid-feedback">
                              {errors.price.message}
                            </p>
                          )}
                        </div>

                      </div>

                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="compare_price" className="form-label">
                            Regular Price (৳)
                          </label>
                          <input
                            placeholder="Compare Price"
                            {...register("compare_price")}
                            type="number"
                            id="compare_price"
                            className={`form-control ${errors.compare_price ? "is-invalid" : ""
                              }`}
                          />

                          {errors.compare_price && (
                            <p className="invalid-feedback">
                              {errors.compare_price.message}
                            </p>
                          )}
                        </div>

                      </div>
                    </div>

                    <h3 className="py-3 border-bottom mb-4">Inventory</h3>
                    <div className="row">
                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="Quantity" className="form-label">
                            Quantity
                          </label>
                          <input
                            placeholder="Quantity"
                            {...register("qty")}
                            type="number"
                            id="Quantity"
                            className={`form-control ${errors.qty ? "is-invalid" : ""
                              }`}
                          />

                          {errors.qty && (
                            <p className="invalid-feedback">
                              {errors.qty.message}
                            </p>
                          )}
                        </div>

                      </div>

                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="SKU" className="form-label">
                            SKU
                          </label>
                          <input
                            placeholder="SKU"
                            {...register("sku", {
                              required: "The sku field is required",
                            })}
                            type="text"
                            id="SKU"
                            className={`form-control ${errors.sku ? "is-invalid" : ""
                              }`}
                          />

                          {errors.sku && (
                            <p className="invalid-feedback">
                              {errors.sku.message}
                            </p>
                          )}
                        </div>

                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="barcode" className="form-label">
                            Barcode
                          </label>
                          <input
                            placeholder="Barcode"
                            {...register("barcode")}
                            type="text"
                            id="title"
                            className={`form-control ${errors.barcode ? "is-invalid" : ""
                              }`}
                          />

                          {errors.barcode && (
                            <p className="invalid-feedback">
                              {errors.barcode.message}
                            </p>
                          )}
                        </div>

                      </div>

                      <div className="col-md-6">

                        <div className="mb-3">
                          <label htmlFor="is_featured" className="form-label">
                            Is Featured
                          </label>
                          <select
                            {...register("is_featured", {
                              required: "The is_featured field is required",
                            })}
                            id="status"
                            className={`form-control ${errors.is_featured ? "is-invalid" : ""
                              }`}
                          >
                            <option value="">Select Status</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>

                          {errors.is_featured && (
                            <p className="invalid-feedback">
                              {errors.is_featured.message}
                            </p>
                          )}
                        </div>

                      </div>


                    </div>

                    <div className="row">
                      <div className="col-md-6">
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

                        <div className="col-md-6">

                        </div>
                      </div>




                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="sizes" className="form-label">
                            Sizes
                          </label> <br />

                          {
                            sizes && sizes.map(size => {
                              return (

                                <div key={`size-${size.id}`} className="form-check-inline py-1 me-3">
                                  <input
                                    {
                                    ...register("sizes")
                                    }
                                    className="form-check-input me-1" type="checkbox" value={size.id} id={`size-${size.id}`} />
                                  <label className="form-check-label" htmlFor={`size-${size.id}`}>
                                    {size.name}
                                  </label>
                                </div>

                              )
                            })
                          }
                        </div>


                      </div>

                      <div className="col-md-12">

                        <div className="mb-3">
                          <label htmlFor="colors" className="form-label">
                            Colors
                          </label>
                          <input
                            placeholder="Colors Exp: Red, Blue, Green"
                            {...register("colors")}
                            type="text"
                            id="colors"
                            className={`form-control ${errors.colors ? "is-invalid" : ""
                              }`}
                          />

                          {errors.colors && (
                            <p className="invalid-feedback">
                              {errors.colors.message}
                            </p>
                          )}
                        </div>

                      </div>

                    </div>


                    <h3 className="py-3 border-bottom mb-3">Files</h3>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <input onChange={handleFile} className="form-control" type="file" />
                      </div>
                    </div>

                    <div className="py-3">
                      <div className="row">
                        {
                          galleryImages && galleryImages.map(image => {
                            return (
                              <div key={image} className="col-md-3 mb-3">
                                <img className="w-100 mb-2" src={image} alt="" />
                                <button onClick={() => removeImage(image)} className="w-100 btn btn-danger">Delete</button>
                              </div>
                            )
                          })
                        }

                      </div>
                    </div>


                    <button type="submit" disabled={isDisable} className="btn btn-primary">
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
  )
}

export default Create

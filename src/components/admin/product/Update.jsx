import React, { useState, useRef, useMemo, useEffect } from "react";
import SideBar from '../../common/SideBar'
import { useForm } from 'react-hook-form';
import Layout from '../../common/Layout';
import { apiUrl, fileUrl, token } from '../../common/Http';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const Update = () => {

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter content here...",
    }),
    []
  );

  const params = useParams();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [productImages, setProductImages] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + 'products/' + params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      setProductImages(result.data.product_images)
      setContent(result.data.description)
      setProductSizes(result.productSizes);


      return {
        title: result.data.title,
        category: result.data.category_id,
        brand: result.data.brand_id,
        short_description: result.data.short_description,
        price: result.data.price,
        compare_price: result.data.compare_price,
        qty: result.data.qty,
        sku: result.data.sku,
        colors: result.data.colors,
        barcode: result.data.barcode,
        is_featured: result.data.is_featured,
        status: result.data.status,

      }
    }


  });

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

  const updateProduct = async (data) => {
    const newData = { ...data, "description": content };
    setIsDisable(true)

    const res = await fetch(apiUrl + "products/" + params.id, {
      method: "PUT",
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

  const handleFile = async (e) => {

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("product_id", params.id);
    setIsDisable(true);

    const res = await fetch(apiUrl + "save-product-image", {

      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData
    }).then(res => res.json())
      .then(result => {

        if (result.status == 200) {
          productImages.push(result.data)
          setProductImages(productImages)
          toast.success(result.message);
        } else {
          toast.error(result.errors.image[0]);

        }

        setIsDisable(false);
        e.target.value = ""

      })
  }

  const deleteImage = async (id) => {

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

          const res = await fetch(`${apiUrl}delete-image-while-update/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token()}`,
            }

          }).then(res => res.json())
            .then(result => {
              if (result.status == 200) {
                const newProductImages = productImages.filter((Productimage) => Productimage.id !== id)
                setProductImages(newProductImages);
                toast.success(result.message)
                Swal.fire("Deleted!", result.message, "success");
              } else {

                Swal.fire("Error", result.message, "error");
              }
            });
        } catch (error) {
          Swal.fire("Error", "Failed to delete the category. Please try again.", "error");
        }
      }
    });
  };


  const setDefaultImage = async (image) => {

    const res = await fetch(`${apiUrl}change-product-default-image?product_id=${params.id}&image=${image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      }

    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          toast.success(result.message)
        } else {
          console.log("Something went wrong");
        }
      });
  }

  const handleSizeChange = (e, sizeId) => {
    if (e.target.checked) {
      // Add size to the productSizes array
      setProductSizes((prev) => [...prev, sizeId]);
    } else {
      // Remove size from the productSizes array
      setProductSizes((prev) => prev.filter((id) => id !== sizeId));
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
                    <h4 className="h5">Edit Product</h4>
                  </div>

                  <hr />

                  <form onSubmit={handleSubmit(updateProduct)}>

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
                            Price
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
                            Compare Price
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

                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="sizes" className="form-label">
                            Sizes
                          </label>
                          <br />
                          {sizes &&
                            sizes.map((size) => (
                              <div key={`size-${size.id}`} className="form-check-inline py-1 me-3">
                                <input
                                  {...register("sizes")}
                                  className="form-check-input me-1"
                                  type="checkbox"
                                  value={size.id}
                                  id={`size-${size.id}`}
                                  checked={productSizes.includes(size.id)}
                                  onChange={(e) => handleSizeChange(e, size.id)}
                                />
                                <label className="form-check-label" htmlFor={`size-${size.id}`}>
                                  {size.name}
                                </label>
                              </div>
                            ))}
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
                          productImages && productImages.map((productImage, index) => {
                            return (
                              <div key={`image-${index}`} className="col-md-3 mb-3">
                                <img className="w-100 mb-2" src={productImage.image_url} alt="" />
                                <button type="button" onClick={() => deleteImage(productImage.id)} className="w-100 btn btn-danger mb-2">Delete</button>
                                <button type="button" onClick={() => setDefaultImage(productImage.image)} className="w-100 btn btn-info">Set Default</button>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>


                    <button type="submit" disabled={isDisable} className="btn btn-primary">
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
  )
}

export default Update
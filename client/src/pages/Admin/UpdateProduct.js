import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, } from "antd";
import { useNavigate,useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
const { Option } = Select;

function UpdateProduct() {

    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  
    //get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/category/`
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting catgeory");
      }
    };

    const getSingleProduct = async()=>{
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/product/${params.slug}`)
        setTitle(data.product.title);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id)
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while getting ")
      }
    }
    useEffect(() => {
     getSingleProduct();
    }, []);

    useEffect(() => {
      getAllCategory();
    }, []);
  
    //create product function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("title", title);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
       photo && productData.append("image", photo);
        productData.append("category", category);
        const { data } = axios.put(
          `${process.env.REACT_APP_API}/product/${id}`,
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Updated Successfully");
          navigate("/dashboard/admin/products")
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };

    const hanldeDelete = async()=>{
      try {
        let answer = window.prompt('Are You Sure to Delete');
        if(!answer) return;
        const {data} = await axios.delete(`${process.env.REACT_APP_API}/product/${id}`);
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products")
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                value={category}
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (<div className="text-center">
                <img
                  src={`${process.env.REACT_APP_API}/product/image/${id}`}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>)}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="write a title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update PRODUCT
                </button>
              </div>
              <div className="mb-3">
              <button className="btn btn-danger pr-4" onClick={hanldeDelete}>
                  Delete PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default UpdateProduct
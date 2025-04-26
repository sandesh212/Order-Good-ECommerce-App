// CreateCategory.js
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import "@fortawesome/fontawesome-free/css/all.css";
import { Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  //states
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [Selected, setSelected] = useState(null);
  const [updatedValue, setupdatedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();

  //functions
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  //submit Category Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/category/`,
        { name }
      );
      const { data, status } = response;
  
      if (data.status) {
        toast.success(`${name} is Created!`);
        getAllCategories();
      } else if (status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Add Category");
    }
  };
  //Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/category/${Selected._id}`,
        { name: updatedValue }
      );
      if(data.status){
        toast.success(data.message); 
        setSelected(null);
        setupdatedValue("")
        setIsModalOpen(false);
        getAllCategories();
      }else{
        toast.success(data.message); 
      }
    } catch (error) {
      console.log(error);
      toast.message("can't delete category!")
    }
  };
  //delete Category
  const deleteCategory = async({id})=>{
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/category/${id}`);
      if(data.status){
        toast.success(data.message);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error()
    }
  }
  //Modal Functions
  const showModal = (name) => {
    setIsModalOpen(true);
    setupdatedValue(name);
  };

  const handleOk = (name) => {
    setIsModalOpen(false);
    setupdatedValue(name);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="containter-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className='text-center'>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  Value={name}
                  setValue={setName}
                />
              </div>
              <div className="w-100">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col" class="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Categories.map((category, index) => (
                      <tr>
                        <td key={category._id}>{index + 1}</td>
                        <td>{category.name}</td>
                        <td class="text-center">
                          <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => {showModal(category.name); setSelected(category)}}
                            style={{ marginRight: 75 }}
                          ></i>
                          <i className="fa-solid fa-trash" onClick={()=>{deleteCategory({id: category._id})}}></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                title="Edit Category"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <CategoryForm
                  Value={updatedValue}
                  setValue={setupdatedValue}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;

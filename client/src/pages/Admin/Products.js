import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { message } from "antd";
import CustomCard from "../../components/utils/Card";

function Products() {
  const [products, setProducts] = useState([]);

  // Function to get products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/`);
      if (data.status) {
        setProducts(data.product);
      } else {
        message.error(data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Error While fetching products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="row">
              {products.map((product, index) => (
                <div className="col-md-4" key={product._id}>
                  <CustomCard
                    src={`${process.env.REACT_APP_API}/product/image/${product._id}`}
                    name={product.title}
                    description={product.description.substring(0, 50)}
                    price={product.price}
                    link={`/dashboard/admin/product/${product.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;

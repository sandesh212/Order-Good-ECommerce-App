import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/user/orders`
      );
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Orders</h1>
            <div className="border">
              {orders.map((order, index) => (
                <div key={order._id} className="container mt-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="6">Order #{index + 1}</th>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Order Date</th>
                        <th>Payment Status</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    {order?.products?.map((p) => (
                      <div key={p._id} className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            src={`${process.env.REACT_APP_API}/product/image/${p._id}`}
                            alt="product_photo"
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p?.title}</h5>
                            <p className="card-text">
                              {p?.description?.substring(0, 50)}
                            </p>
                            <p className="card-text">Price: {p?.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;

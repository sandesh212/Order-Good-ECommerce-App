import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

function AdminOrder() {
  const [status, setStatus] = useState([
    "pending",
    "completed",
    "cancelled",
    "delivered",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useState();

  const [orders, setOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/user/all-orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/user/order-status/${orderId}`,
        { status: value }
      );
      getAllOrders();   
    } catch (error) {
      console.log(error);
    }
  
  }
  useEffect(() => {
    getAllOrders();
  }, [auth?.token]);
  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border">
              {orders.map((order, index) => (
                <div key={order._id} className="container mt-2 mb-2">
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value,orderId) => handleChangeStatus(order?._id,value)}
                            defaultValue={order.status}
                          >
                            {status.map((s) => (
                              <>
                                <Option key={s} value={s}>
                                  {s}
                                </Option>
                              </>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
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
      </Layout>
    </>
  );
}

export default AdminOrder;

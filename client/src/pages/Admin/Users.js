import React, { useEffect, useState } from 'react';
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout";
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/user/users`);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllUser();
  }, [users]);
  return (
    <>
    <Layout>
    <div className='containter-fluid m-3 p-3'>
    <div className='row'>
      <div className='col-md-3'>
          <AdminMenu/>
      </div>
      <div className='col-md-9'>
        <h1 className='text-center'>Users</h1>
        <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
    </div>
    </Layout>
    </>
  );
};

export default Users;

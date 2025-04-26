import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  
  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/user/forgot-password`,email);
      if(data.success === false){
        toast.error(data.message)
      }else{
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <Layout>
    <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">ForgotPassword</p>
                <form className="mx-1 mx-md-4" >
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" onChange={handleChange} name='email' placeholder='Email' id="email" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c"></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Login</button>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </Layout>
    </>
  )
}

export default ForgotPassword
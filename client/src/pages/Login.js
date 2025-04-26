import React,{useState} from 'react'
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from '../components/layout/Layout';
import { toast } from 'react-toastify';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../components/context/auth';

function Login() {
    const Navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const  [auth,setAuth] = useAuth();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.post(`http://localhost:5001/user/login`,
        formData
        )
        if(response.data.status){
          toast.success(response.data.message);
          setFormData({
            email:'',
            password:'',
          })
          setAuth({
            ...auth,
            user: response.data.user,
            token: response.data.token
          })
          localStorage.setItem('auth',JSON.stringify(response.data))
          setTimeout(()=>{
            Navigate(location.state || "/");
          },1000)
        }else if(response.data.status === "false"){
          toast.error(response.data.message)
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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" name='email' placeholder='Email' onChange={handleChange} value={formData.email} id="form3Example3c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c"></label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name='password' placeholder='Password' onChange={handleChange} value={formData.password} id="form3Example4c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c"></label>
                    </div>
                  </div>
                  <div className="form-check d-flex justify-content-center mb-3">
                    <label className="form-check-label" htmlFor="form2Example3">
                      <Link to="/forgotPassword">Forgot Password ?</Link>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
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

export default Login
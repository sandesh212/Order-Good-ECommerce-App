import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (confirmPassword !== password) {
      toast.error("Passwords don't match");
      return;
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/user/reset-password/${userId}/${token}`,
          { password: password } // Pass password in the request body
        );
  
        if (data.success === true) {
          toast.success(data.message);
        } else {
          toast.error("Failed to reset password");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("Failed to reset password. Please try again later.");
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Layout>
        <section className="vh-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Reset Password
                        </p>
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="password"
                              ></label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="confirm-password"
                                placeholder="Confirm Password"
                                id="confirm-password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <label
                                className="form-label"
                                htmlFor="confirm-password"
                              ></label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 ml-3 mb-3 mb-lg-4">
                            <label
                              for="check"
                              className="form-label"
                              htmlFor="confirm-password"
                            >
                              Show Password
                            </label>
                            <input
                              type="checkbox"
                              className="ml-3"
                              value={`${showPassword ? "Hide" : "Show"}`}
                              onClick={togglePasswordVisibility}
                            />
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
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
  );
}

export default ResetPassword;

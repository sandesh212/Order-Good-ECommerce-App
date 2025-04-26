import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className="bg-dark text-light p-3">
  <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#3e4551' }}>
    <div className="container p-4 pb-0">
      <section className="">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Order Good</h5>
            <p>
              
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li><NavLink to="/contact" className="text-white">Contact User</NavLink></li>
              <li><a href="#!" className="text-white">Link 2</a></li>
              <li><a href="#!" className="text-white">Link 3</a></li>
              <li><a href="#!" className="text-white">Link 4</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-white">Link 1</a></li>
              <li><a href="#!" className="text-white">Link 2</a></li>
              <li><a href="#!" className="text-white">Link 3</a></li>
              <li><a href="#!" className="text-white">Link 4</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-white">Link 1</a></li>
              <li><a href="#!" className="text-white">Link 2</a></li>
              <li><a href="#!" className="text-white">Link 3</a></li>
              <li><a href="#!" className="text-white">Link 4</a></li>
            </ul>
          </div>
        </div>
      </section>
      <hr className="mb-4" />
      <section className="">
        <p className="d-flex justify-content-center align-items-center">
          <span className="me-3">Register for free</span>
          <NavLink  type="button" to="/signup" className="btn btn-outline-light btn-rounded">Sign up!</NavLink>
        </p>
      </section>
      <hr className="mb-4" />
      <section className="mb-4 text-center">
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-twitter"></i></a>
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-google"></i></a>
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-instagram"></i></a>
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-github"></i></a>
      </section>
    </div>
    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      © 2023 Copyright: <a className="text-white" href="https://mdbootstrap.com/">Alpha Tech</a>
    </div>
  </footer>
</div>

  )
}

export default Footer
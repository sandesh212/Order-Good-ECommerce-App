import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout(porps) {
  return (
    <div>
        <Header></Header>
        <main style={{minHeight:"80vh"}}>
        <ToastContainer />
        {porps.children}
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Layout
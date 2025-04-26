import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/routes/Private";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";
import AdminOrder from "./pages/Admin/AdminOrder";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/category/:slug" element={<CategoryProducts/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />}></Route>
          <Route path="admin/users" element={<Users />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>
          <Route path="admin/orders" element={<AdminOrder/>}></Route>
        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:userId/:token" element={<ResetPassword />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;

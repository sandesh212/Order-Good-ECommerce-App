import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../components/context/auth";
import axios from "axios";
import { message } from "antd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cart";
import { toast } from "react-toastify";
import image from "../images/banner.jpeg";
import  "../styles/Homepage.css";

function HomePage() {
  const navigate = useNavigate();
  const [cart,setCart]  = useCart();
  const [products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get total count of products
  const getProductCount = async () => {
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/product/count`);
      setTotal(data?.total);
    }catch(error){
      console.log(error);
    }
  }
  
  const getProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/list/${page}`);
      setLoading(false)
      if (data.success) {
        setProducts(data.products);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      message.error("Error While fetch product");
    }
  };

  const handleFilter = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      message.error("Error While filter product");
    }
  };

  //load more product
  const loadMore = async()=>{
    try {
      setLoading(true)
      const {data} = axios.get(`${process.env.REACT_APP_API}/product/list/${page}`);
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  useEffect(() => {
    if(page === 1) return;
    loadMore();
    }, [page])

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in getting catgeory");
    }
  };

    //get filter product
    const filterProduct = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/product/filter`,
          { checked, radio }
        );
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getProducts();
    }
    getAllCategory();
    getProductCount();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked.length, radio.length]);


  return (
    <Layout>
      {/* banner image */}
      <img
        src={image}
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category </h4>
          <div className="d-flex flex-column ml-3">
            {Categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*Price Filter*/}
          <h4 className="text-center mt-3">Filter by Price</h4>
          <div className="d-flex flex-column ml-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p?._id}>
                  <Radio value={p?.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-3 ml-3 d-flex flex-column">
            <button className="btn btn-danger" onClick={()=> window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product, index) => (
              <Card sx={{ maxWidth: 340 }} className="mr-3 mt-3 mb-3">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={`${process.env.REACT_APP_API}/product/image/${product._id}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.substring(0, 50)}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{navigate(`/product/${product?.slug}`)}}>More Details</Button>
                  <Button size="small" onClick={()=>{
                  setCart([...cart, product]);
                  localStorage.setItem('cart',JSON.stringify([...cart,products]))
                  toast.success("Product added to cart");
                  console.log("Cart", cart)
                  }}>Add Cart</Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning" onClick={()=>{
                setPage(page + 1);
              }}>
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

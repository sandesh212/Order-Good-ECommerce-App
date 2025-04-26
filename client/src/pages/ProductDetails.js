import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "antd";
import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [realtedProducts, setRelatedProducts] = useState([]);

  // Fetch product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch related products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/related/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial details
  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/product/image/${product._id}`}
              alt="product_photo"
              height={"350px"}
              className="img img-responsive"
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h4>Name: {product?.title}</h4>
            <p className="text-muted">{product?.description}</p>
            <h4>Price: ${product?.price}</h4>
            <h4>Quantity: {product?.quantity}</h4>
            <h4>Category: {product?.category?.name}</h4>
            <Button className="mt-2" size="medium">
              Add Cart
            </Button>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col">
            <h1>Similar Products</h1>
            <div className="d-flex flex-wrap">
              {realtedProducts.map((product, index) => (
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
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/product/${product?.slug}`);
                      }}
                    >
                      More Details
                    </Button>
                    <Button size="small">Add Cart</Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;

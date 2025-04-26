import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Button, Card } from "antd";
import { useParams,useNavigate } from "react-router-dom";
import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function CategoryProducts() {
const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/category/${params.slug}`
      );
      setProduct(data?.product);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h2 className="text-center">{category[0]?.name}</h2>
        <h4 className="text-center">
          {product?.length > 0 ? `${product?.length} results` : `No Results`}
        </h4>
        <div className="row">
        <div className="d-flex flex-wrap">
              {product?.map((product, index) => (
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
    </Layout>
  );
}

export default CategoryProducts;

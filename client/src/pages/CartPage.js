import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/cart";
import Layout from "../components/layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((p) => {
        total += p.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce  } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/braintree/payment`,
        {
          nonce ,
          cart,
          id: auth?.user?.id,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfull");
    } catch (error) { 
      console.log(error);
      setLoading (false);
      toast.error("Payment Failed");
    }
  };
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item?.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/braintree/token/`
      );
      setClientToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mt-2">
                {`Hello ${auth?.token && auth?.user?.name}, Your Cart Items`}
              </h1>
              <h4 className="text-center">
                {cart?.length > 0
                  ? `Total ${cart?.length} products in cart`
                  : "No products in cart"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p, index) => (
                <div className="row p-3 mb-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/product/image/${p._id}`}
                      alt="product_photo"
                      width="100px"
                      height="100px"
                      className="img img-responsive"
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p?.title}</p>
                    <p>{p?.description?.substring(0, 50)}</p>
                    <p>Price: {p?.price}</p>
                    <Button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p?._id)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <Button
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/user/address")}
                      size="small"
                    >
                      Change Address
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <Button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/user/address")}
                        size="small"
                      >
                        Update Address
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                        size="small"
                      >
                        Please Login to checkout
                      </Button>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {
                  !clientToken || !cart?.length ?  ("") : (<>
                          <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                    card: {
                      overrides: {
                        fields: {
                          number: {
                            selector: "#card-number",
                          },
                          cvv: {
                            selector: "#cvv",
                          },
                        },
                        styles: {
                          input: {
                            'font-size': '16px'
                          },
                          ':focus': {
                            'color': 'blue'
                          }
                        },
                      },
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={
                    !clientToken ||
                    !instance ||
                    !auth?.user?.address
                  }
                >
                 {loading ? "Processing..." : "Pay Now"}
                </button>
                  </>)
                }
        
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CartPage;

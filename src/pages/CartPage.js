import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "./CartPage.css";

const CartPage = () => {
  const baseUrl="https://ecommerce-server-zfc6.onrender.com"
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth:", auth);
    console.log("Cart:", cart);
    console.log("Client Token:", clientToken);
    console.log("DropIn Instance:", instance);
    console.log("User Address:", auth?.user?.address);
  }, [auth, cart, clientToken, instance]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log("Total Price Error:", error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log("Remove Item Error:", error);
    }
  };

  // ✅ Fixed: Fetch and log token properly
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/product/braintree/token`);
      console.log("Fetched token:", data);
      setClientToken(data?.clientToken || data?.clientToken?.clientToken);
    } catch (error) {
      console.log("Token Error:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // ✅ Fixed: Guard against null instance and log error
  const handlePayment = async () => {
    try {
      if (!instance) {
        console.log("DropIn instance is null");
        return;
      }
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${baseUrl}/api/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log("Payment Error:", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12 cart-guest-box">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-7">
              {cart?.map((p) => (
                <div className="row card flex-row card-borde responsive" key={p._id}>
                  <div className="col-md-4 responsive-img">
                    <img
                      src={`${baseUrl}/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4 cart-detail responsive-detail">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 20)}..</p>
                    <p>Price : ${p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn responsive-button">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", { state: "/cart" })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  <h2>Loading ....</h2>
                ) : (
                  <>
                        <DropIn
        options={{
          authorization: clientToken,
          paypal: {
            flow: "vault",
          },
        }}
        onInstance={(instance) => {
          console.log("DropIn initialized", instance);
          setInstance(instance);
        }}
      />
      {/* Fallback inputs if DropIn fails */}
      <div className="custom-card-fields">
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="MM/YY" />
        <input type="text" placeholder="CVV" />
        <small style={{ color: "#999" }}>
          If payment UI doesn't appear above, it's likely a browser issue.
        </small>
      </div>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

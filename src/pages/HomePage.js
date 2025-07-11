import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "./HomePage.css";

const HomePage = () => {
  const baseUrl="https://ecommerce-server-zfc6.onrender.com"
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.category || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/product/product-count`);
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // load more products on scroll
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...(data?.products || [])]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <img
        src="/images/banner_image.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {Array.isArray(categories) &&
              categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger addtoCart"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
        <hr></hr>
          <div className="d-flex flex-wrap justify-content-start">
           {loading ? (
    <h2 className="text-center w-100">Loading...</h2>
  ) : (
    Array.isArray(products) &&
    products.map((p) => (
      <div className="card m-2 " key={p._id}>
        <img
          src={`${baseUrl}/api/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
        />
        <div className="card-body">
          <div className="card-name-price">
            <h5 className="card-title">{p.name}</h5>
            <h5 className="card-title card-price">
              {p.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
          </div>
          <p className="card-text">
            {p.description?.substring(0, 10)}...
          </p>
          <div className="card-name-price ">
            <button
              className="btn btn-info ms-1 moreDetail"
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button>
            <button
              className="btn btn-dark ms-1 addtoCart"
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    ))
  )}
          </div>

          <div className="m-2 p-3">
            {products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : <>Load More <AiOutlineReload /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

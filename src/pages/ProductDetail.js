import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import { useCart } from "../context/cart";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetails = () => {
  const baseUrl="https://ecommerce-server-zfc6.onrender.com"
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useCart();


  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${baseUrl}/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Select Size:</h6>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {product?.size?.map((size) => (
          <div
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              padding: '10px 15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: selectedSize === size ? '#000' : '#fff',
              color: selectedSize === size ? '#fff' : '#000',
            }}
          >
            {size}
          </div>
        ))}</div>
          <h6>Category : {product?.category?.name}</h6>
           <button
                                         className="btn btn-dark ms-1 addtoCart"
                                         onClick={() => {
                                          if (!selectedSize) {
      toast.error("⚠️ Please select a size before adding to cart");
      return;
    }

              
                                           setCart([...cart, product]);
                                           localStorage.setItem(
                                             "cart",
                                             JSON.stringify([...cart, product])
                                           );
                                           toast.success("Item Added to cart");
                                         }}
                                       >
                                         ADD TO CART
                                       </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ..</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
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
                <p className="card-text ">
                  {p.description.substring(0, 15)}...
                </p>
                <div className="card-name-price">
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
                                           localStorage.setItem(
                                             "cart",
                                             JSON.stringify([...cart, p])
                                           );
                                           toast.success("Item Added to cart");
                                         }}
                                       >
                                         ADD TO CART
                                       </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
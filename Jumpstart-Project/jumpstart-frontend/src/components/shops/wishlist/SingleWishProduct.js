import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { wishListProducts } from "./FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const Product = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await wishListProducts();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
        setLoading(false);
      }
    }, 50);
  };

  const removeFromWishList = (id) => {
    let list = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : [];
    if (list.length > 0) {
      if (list.includes(id) === true) {
        list.splice(list.indexOf(id), 1);
        localStorage.setItem("wishList", JSON.stringify(list));
        fetchData();
      }
    }
  };
  if (loading) {
    return (
      <div className="my-5 py-5 text-center">No product found in wishList</div>
    );
  }
  return (
    <Fragment>
      <div className="row col-12 col-md-4 mb-20">
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="position-relative col-span-1 m-2 bg-secondary rounded-5 p-4 shadow-sm "
              >
                <img
                  onClick={(e) => history.push(`/products/${product._id}`)}
                  className="mt-4 object-cover object-center img-fluid cursor-pointer rounded-4"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt=""
                />
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <h5 className="text-light truncate fw-bolder pt-md-2 pt-0">
                    {product.pName}
                  </h5>
                </div>
                <div className="w-100">
                  <div className="font-semibold text-light mt-3 mb-2">
                    ${product.pPrice}.00
                  </div>
                  {product.pQuantity > 0 ? (
                    <div className="text-success mt-3 mb-2 my-md-0 fw-semibold">
                      In Stock
                    </div>
                  ) : (
                    <div className="text-danger mt-3 mb-2 my-md-0 fw-semibold">
                      Out Stock
                    </div>
                  )}

                  <div
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className=" px-4 py-2 text-white bg-primary d-block w-full text-center fw-semibold rounded-4 cursor-pointer mt-3 mb-2"
                  >
                    View
                  </div>
                </div>
                <div className="position-absolute top-0 right-0 mx-2 my-2">
                  <svg
                    onClick={(e) => removeFromWishList(product._id)}
                    className="cursor-pointer m-2"
                    height="1.5rem"
                    width="1.5rem"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product found in wishList</div>
        )}
      </div>
    </Fragment>
  );
};

const SingleWishProduct = (props) => {
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Wishlist</h2>
          {/* Product List */}
          <Product />
        </div>
      </section>
    </Fragment>
  );
};

export default SingleWishProduct;

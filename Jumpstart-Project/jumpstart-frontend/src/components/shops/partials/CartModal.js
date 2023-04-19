import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const CartModal = () => {
  const history = useHistory();

  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
      dispatch({ type: "cartTotalCost", payload: totalCost() });
    }
    if (cart.length === 0) {
      dispatch({ type: "cartProduct", payload: null });
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        className={`${
          !data.cartModal ? "d-none" : ""
        } position-fixed top-0 z-30 w-100 h-100 bg-secondary opacity-50`}
      />
      {/* Cart Modal Start */}
      <section
        className={`${
          !data.cartModal ? "d-none" : ""
        } position-fixed z-40 inset-0 d-flex align-items-start justify-content-end`}
      >
        <div className="bg-secondary w-full h-full md:w-5/12 lg:w-4/12 d-flex flex-column justify-content-between">
          <div className="overflow-y-auto">
            <div className=" border-b-2 border-light d-flex justify-content-between">
              <div className="p-4 text-light text-lg fw-semibold">Cart</div>
              {/* Cart Modal Close Button */}
              <div className="p-4 text-white cursor-pointer">
                <svg
                  onClick={(e) => cartModalOpen()}
                  className="text-light"
                  width="2rem"
                  height="2rem"
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
            <div className="m-4 flex-column">
              {products &&
                products.length !== 0 &&
                products.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {/* Cart Product Start */}
                      <div className="text-light d-flex mx-1 my-4 align-items-center">
                        <img
                          className="w-16 h-16 object-cover object-center"
                          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                          alt="cartProduct"
                        />
                        <div className="position-relative container-fluid d-flex flex-column">
                          <h4 className="my-2">{item.pName}</h4>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between mx-1">
                              <div className="text-sm text-light fw-semibold">
                                Quantity : &ensp;
                              </div>
                              <div className="d-flex align-items-end fw-semibold">
                                <span className="text-sm text-light">
                                  {quantity(item._id)}
                                </span>
                              </div>
                            </div>
                            <div>
                              {" "}
                              <span className="text-sm text-light fw-semibold">
                                Sub total : &ensp; $
                                {subTotal(item._id, item.pPrice)}
                                .00
                              </span>{" "}
                            </div>{" "}
                            {/* SUbtotal Count */}
                          </div>
                          {/* Cart Product Remove Button */}
                          <div
                            onClick={(e) => removeCartProduct(item._id)}
                            className="position-absolute top-0 right-0 text-light fw-semibold"
                          >
                            <svg
                              className="text-light"
                              width="1.25rem"
                              height="1.25rem"
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
                      </div>
                      {/* Cart Product Start */}
                    </Fragment>
                  );
                })}

              {products === null && (
                <div className="m-4 flex-column text-light text-xl text-center">
                  No product in cart
                </div>
              )}
            </div>
          </div>
          <div className="mx-4 my-3">
            <div
              onClick={(e) => cartModalOpen()}
              className="cursor-pointer px-4 py-2 border border-light text-light text-center cursor-pointer rounded-4"
            >
              Continue shopping
            </div>
            {data.cartTotalCost ? (
              <Fragment>
                {isAuthenticate() ? (
                  <div
                    className="my-3 px-4 py-2 bg-primary text-light text-center cursor-pointer rounded-4"
                    onClick={(e) => {
                      history.push("/checkout");
                      cartModalOpen();
                    }}
                  >
                    Checkout ${data.cartTotalCost}.00
                  </div>
                ) : (
                  <div
                    className="my-3 px-4 py-2 bg-primary text-light text-center cursor-pointer rounded-4"
                    onClick={(e) => {
                      history.push("/");
                      cartModalOpen();
                      dispatch({
                        type: "loginSignupError",
                        payload: !data.loginSignupError,
                      });
                      dispatch({
                        type: "loginSignupModalToggle",
                        payload: !data.loginSignupModal,
                      });
                    }}
                  >
                    Checkout ${data.cartTotalCost}.00
                  </div>
                )}
              </Fragment>
            ) : (
              <div className="my-3 px-4 py-2 bg-primary text-light text-center cursor-not-allowed rounded-4">
                Checkout
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Cart Modal End */}
    </Fragment>
  );
};

export default CartModal;

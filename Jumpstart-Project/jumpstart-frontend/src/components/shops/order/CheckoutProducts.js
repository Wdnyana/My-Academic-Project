import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";

import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-screen">
        <svg
          className="animate-spin text-light me-3"
          height="3rem"
          width="3rem"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Please wait untill finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="container mb-20 mt-20">
        <h2 className="text-2xl mx-2 text-center mb-b pb-5 py-2">Order</h2>
        {/* Product List */}
        <div className="d-flex justify-content-center flex-column d-md-flex flex-md-row">
          <div className="col-12 col-md-6">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="col-12 col-md-6">
            <div className="w-full order-first">
              {state.clientToken !== null ? (
                <Fragment>
                  <div
                    onBlur={(e) => setState({ ...state, error: false })}
                    className="p-5 bg-secondary rounded-5 my-2 mx-4"
                  >
                    {state.error ? (
                      <div className="bg-danger py-2 px-4 rounded-4">
                        {state.error}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="py-5">
                      <div className="d-flex flex-column py-2 mb-2 text-light">
                        <label htmlFor="address" className="pb-2 ps-4">
                          Delivery Address
                        </label>
                        <input
                          value={state.address}
                          onChange={(e) =>
                            setState({
                              ...state,
                              address: e.target.value,
                              error: false,
                            })
                          }
                          type="text"
                          id="address"
                          className="border px-4 py-2 bg-transparent text-light rounded-4"
                          placeholder="Address..."
                        />
                      </div>
                      <div className="d-flex flex-column py-2 mb-2">
                        <label htmlFor="phone" className="pb-2 ps-4">
                          Phone
                        </label>
                        <input
                          value={state.phone}
                          onChange={(e) =>
                            setState({
                              ...state,
                              phone: e.target.value,
                              error: false,
                            })
                          }
                          type="number"
                          id="phone"
                          className="border px-4 py-2 bg-transparent text-light rounded-4 mb-4"
                          placeholder="+62 xxx xxxx xxxx"
                        />
                      </div>
                      <DropIn
                        options={{
                          authorization: state.clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => (state.instance = instance)}
                        style={{ color: "#ffffff" }}
                        className="text-light"
                      />
                      <div
                        onClick={(e) =>
                          pay(
                            data,
                            dispatch,
                            state,
                            setState,
                            getPaymentProcess,
                            totalCost,
                            history
                          )
                        }
                        className="w-full mt-5 px-4 py-2 bg-primary rounded-4 text-center text-white fw-semibold cursor-pointer"
                      >
                        Pay now
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <svg
                    className="w-12 h-12 animate-spin text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {products !== null && products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div key={index} className="col-12 my-md-2 mx-md-0 d-flex">
                  <div className="d-flex flex-column justify-content-center align-items-center mx-4 w-100 p-5 bg-secondary rounded-5 ">
                    <img
                      onClick={(e) => history.push(`/products/${product._id}`)}
                      className="cursor-pointer object-cover object-center w-100 h-100 rounded-4 img-fluid"
                      src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                      alt="wishListproduct"
                    />
                    <div className="text-start w-100 mt-4 p-3">
                      <h5 className="fw-semibold truncate mb-3 text-light">
                        {product.pName}
                      </h5>
                      <div className="fw-normal truncate mb-2 text-light">
                        Price : ${product.pPrice}.00{" "}
                      </div>
                      <div className="fw-normal truncate mb-2 text-light">
                        Quantitiy : {quantity(product._id)}
                      </div>
                      <div className="fw-normal truncate mb-2 text-light">
                        Subtotal : ${subTotal(product._id, product.pPrice)}.00
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No product found for checkout</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;

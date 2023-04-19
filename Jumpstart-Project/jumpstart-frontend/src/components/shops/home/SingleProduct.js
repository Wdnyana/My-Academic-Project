import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const SingleProduct = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 d-flex align-items-center justify-content-center py-24">
        <svg
          className="animate-spin text-light"
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
      </div>
    );
  }
  return (
    <Fragment>
      {products && products.length > 0 ? (
        products.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="position-relative col-span-1 m-2 bg-secondary rounded-5 p-4 shadow-sm">
                <img
                  onClick={(e) => history.push(`/products/${item._id}`)}
                  className="w-full object-cover object-center img-fluid cursor-pointer rounded-4"
                  src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                  alt=""
                />
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <h5 className="text-light truncate fw-bolder pt-md-2 pt-0">
                    {item.pName}
                  </h5>
                  <div className="d-flex align-items-center mx-1">
                    {/* WhisList Logic  */}
                    <div className="position-relative">
                      {isWish(item._id, wList) ? (
                        <svg
                          onClick={(e) => unWishReq(e, item._id, setWlist)}
                          className="cursor-pointer text-light transition-all duration-300 ease-in"
                          height="2rem"
                          width="2rem"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={(e) => isWishReq(e, item._id, setWlist)}
                          className="cursor-pointer text-light transition-all duration-300 ease-in"
                          height="2rem"
                          width="2rem"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      )}
                    </div>
                    {/* WhisList Logic End */}
                    {/* ratings */}
                    <div className="ms-2">
                      <span>
                        <svg
                          className="fill-current text-light me-1"
                          height="1.5rem"
                          width="1.5rem"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </span>
                      <span className="text-light">
                        {item.pRatingsReviews.length}
                      </span>
                    </div>
                    {/* end ratings */}
                  </div>
                </div>
                <div className="mt-4 mb-2 fw-semibold">{item.pDescription}</div>

                <div className="mt-3 mb-2 fw-semibold">${item.pPrice}.00</div>
                <div
                  onClick={(e) => history.push(`/products/${item._id}`)}
                  className="py-2 px-3 bg-primary w-100 text-center fw-semibold rounded-4 mb-1 mt-4 cursor-pointer"
                >
                  See Details
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 d-flex align-items-center justify-content-center py-5 text-xl-center">
          No product found
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;

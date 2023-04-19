import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const { data, dispatch } = useContext(LayoutContext);

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navbar Section */}
      <nav className="navbar top-0 w-full navbar-expand-md z-20 bg-dark fixed py-4 shadow-sm">
        <div className="container">
          <span
            className="navbar-brand text-light fw-bold"
            onClick={(e) => history.push("/")}
          >
            Js
          </span>
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-md-between align-items-center"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav mt-3 mt-md-0 mb-2 mb-md-0">
              <div className="nav-item">
                <span
                  className="nav-link text-light"
                  onClick={(e) => history.push("/")}
                >
                  SHOP
                </span>
              </div>

              <div className="nav-item">
                <span
                  className="nav-link text-light"
                  onClick={(e) => history.push("/about")}
                >
                  ABOUT US
                </span>
              </div>

              <div className="nav-item">
                <span
                  className="nav-link text-light"
                  onClick={(e) => history.push("/contact")}
                >
                  CONTACT US
                </span>
              </div>
            </div>
            <div className="navbar-nav mb-2 mb-md-0 align-items-md-center ">
              {/*  WishList Page Button */}
              <div
                onClick={(e) => history.push("/wish-list")}
                className="nav-item px-2 py-2 cursor-pointer rounded-4"
                title="Wishlist"
              >
                <svg
                  className={`${
                    location.pathname === "/wish-list"
                      ? "fill-current text-light"
                      : ""
                  }  text-light cursor-pointer`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              {localStorage.getItem("jwt") ? (
                <Fragment>
                  <div
                    className="px-2 py-2 position-relative cursor-pointer rounded-4"
                    title="Logout"
                  >
                    <svg
                      className=" text-light"
                      width="2rem"
                      height="2rem"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleDropdown} // menambahkan event onClick pada SVG
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {showDropdown && (
                      <div
                        className="position-absolute left-0 mt-4 bg-secondary rounded-4"
                        onClick={handleDropdown} // menambahkan event onClick pada dropdown
                      >
                        {!isAdmin() ? (
                          <Fragment>
                            <li className="d-flex flex-column text-light w-15-rem shadow-lg rounded-4">
                              <span
                                onClick={(e) => history.push("/user/orders")}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </span>
                                <span>My Orders</span>
                              </span>
                              <span
                                onClick={(e) => history.push("/user/profile")}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </span>
                                <span>My Account</span>
                              </span>
                              <span
                                onClick={(e) => history.push("/wish-list")}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
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
                                </span>
                                <span>My Wishlist</span>
                              </span>
                              <span
                                onClick={(e) => history.push("/user/setting")}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </span>
                                <span>Setting</span>
                              </span>
                              <span
                                onClick={(e) => logout()}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                  </svg>
                                </span>
                                <span>Logout</span>
                              </span>
                            </li>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <li className="d-flex justify-content-center flex-column text-light w-12-rem shadow-lg rounded-4">
                              <span
                                onClick={(e) =>
                                  history.push("/admin/dashboard")
                                }
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </span>
                                <span>Admin Panel</span>
                              </span>
                              <span
                                onClick={(e) => logout()}
                                className="d-flex py-3 px-3 hover:bg-dark cursor-pointer"
                              >
                                <span>
                                  <svg
                                    className="me-3 cursor-pointer text-light"
                                    width="2rem"
                                    height="2rem"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      strokeWidth={2}
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                  </svg>
                                </span>
                                <span>Logout</span>
                              </span>
                            </li>
                          </Fragment>
                        )}
                      </div>
                    )}
                  </div>
                </Fragment>
              ) : (
                /* Login Modal Button */
                <div
                  onClick={(e) => loginModalOpen()}
                  className="cursor-pointer text-light p-2 rounded-lg"
                  title="Login"
                >
                  <svg
                    className="text-light cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              )}
              {/* Cart Modal Button */}
              <div
                onClick={(e) => cartModalOpen()}
                className="p-2 text-light cursor-pointer"
                title="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-light"
                  width="2rem"
                  height="2rem"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="px-1 text-light fw-semibold text-sm-end">
                  {data.cartProduct !== null ? data.cartProduct.length : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

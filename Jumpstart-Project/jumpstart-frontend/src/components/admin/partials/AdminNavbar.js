import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

const AdminNavbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <nav className="sticky-top z-10 py-4 px-0 mx-0 top-0 w-full shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          {/*  Large Screen Show  */}
          <div className=" d-none d-lg-block d-lg-flex align-items-lg-center">
            <span>
              <svg
                className=" cursor-pointer text-light"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </span>
          </div>
          {/*  Large Screen Show  */}
          <div className="d-none d-lg-block">
            <span
              onClick={(e) => history.push("/admin/dashboard")}
              style={{ letterSpacing: "0.70rem" }}
              className="d-flex align-items-start text-center fw-bold text-uppercase text-light text-2xl cursor-pointer px-2 text-center"
            >
              Admin Jumpstart
            </span>
          </div>
          {/* Small Screen Show */}
          <div className=" d-lg-none d-flex align-items-center">
            <svg
              id="hamburgerBtn"
              className=" d-lg-none cursor-pointer text-light"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/admin/dashboard")}
              style={{ letterSpacing: "0.10rem" }}
              className="d-flex align-items-start text-center fw-bold text-uppercase text-light text-2xl cursor-pointer px-2 text-center"
            >
              Admin Jumpstart
            </span>
          </div>
          {/* Both Screen show */}
          <div className="d-flex align-items-center">
            <div className="rounded-4 p-2 ms-2" title="Search">
              <svg
                className="cursor-pointer text-light"
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <div className="rounded-4 p-2 ms-2" title="Search">
              <svg
                className="cursor-pointer text-light"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Logout Button Dropdown */}
            <div
              className="userDropdownBtn ms-2 px-2 py-2 rounded-4 position-relative"
              title="Logout"
            >
              <svg
                className="cursor-pointer text-light"
                height="2rem"
                width="2rem"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleDropdown}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {showDropdown && (
                <div
                  className="position-absolute left-0 mt-3 bg-secondary rounded-4"
                  onClick={handleDropdown}
                >
                  <li className="d-flex flex-column text-light py-4">
                    <span
                      onClick={(e) => history.push("/")}
                      className="d-flex justify-content-left align-items-center mx-2 py-3 px-5 text-light cursor-pointer me-2"
                    >
                      <span>
                        <svg
                          className="cursor-pointer text-light me-3"
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </span>
                      <span>Shop</span>
                    </span>
                    <span className="d-flex mx-2 py-3 px-5 cursor-pointer">
                      <span>
                        <svg
                          className="cursor-pointer text-light me-3"
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
                      className="d-flex mx-2 py-3 px-5 cursor-pointer"
                    >
                      <span>
                        <svg
                          className="cursor-pointer text-light me-3"
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </span>
                      <span>Logout</span>
                    </span>
                  </li>
                </div>
              )}
            </div>
          </div>
          {/* Mobile Navbar */}
          {/* End Mobile Navbar */}
        </div>
      </nav>
    </Fragment>
  );
};

export default AdminNavbar;

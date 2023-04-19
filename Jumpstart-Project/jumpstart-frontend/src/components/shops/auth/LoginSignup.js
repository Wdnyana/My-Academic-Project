import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { LayoutContext } from "../index";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create an account");

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setLoginValue("Login");
    } else {
      setLogin(true);
      setLoginValue("Create an account");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay  */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "" : "d-none"
        } position-fixed top-0 z-40 w-full h-screen bg-secondary opacity-50 cursor-pointer`}
      ></div>
      {/* Signup Login Component Render */}
      <section
        className={` ${
          data.loginSignupModal ? "" : "d-none"
        } position-fixed z-40 inset-0 d-flex align-items-start justify-content-center overflow-auto`}
      >
        <div className="w-full h-screen position-relative bg-dark p-0">
          <div className="container position-relative">
            {login ? <Login /> : <Signup />}
            <div className="px-5">
              <div className="bg-secondary pb-4 rounded-create-acc">
                <div className="px-5 w-50 mx-auto mb-4">
                  <div className="d-flex align-items-center space-x-2 ">
                    <span className="border-b border-gray-500 w-full" />
                    <span className="font-medium">or</span>
                    <span className="border-b border-gray-500 w-full" />
                  </div>
                </div>
                <div className="px-4 w-50 mx-auto">
                  <div
                    onClick={(e) => changeLoginSignup()}
                    style={{ color: "#8363f0", border: "1px solid #8363f0" }}
                    className="fw-semibold w-100 rounded-4 mt-4 mx-auto py-2 px-4 text-center cursor-pointer"
                  >
                    {loginValue}
                  </div>
                </div>
              </div>
            </div>

            {/*  Modal Close Button */}
            <div className="position-absolute top-0 right-0 m-5">
              <div className="px-md-4 w-50 mx-auto">
                <svg
                  onClick={(e) => {
                    loginSignupModalToggle();
                    dispatch({ type: "loginSignupError", payload: false });
                  }}
                  className="text-light cursor-pointer"
                  height="2rem"
                  width="2rem"
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
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;

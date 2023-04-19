import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`fw-normal text-light py-3 px-4 mb-3 rounded-3 text-start`}>
      {msg}
    </div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="container pt-5 px-5">
        <div className="text-start text-2xl mb-5">
          <h1 className="mb-3">Welcome to Jumpstart</h1>
          <p className="text-start fw-normal">
            Please Register to have an Account
          </p>
        </div>
        <form className="px-5 pt-5 pb-4 bg-secondary rounded-form">
          {data.success ? alert(data.success, "") : ""}
          <div className="form-floating mb-4">
            <input
              placeholder="Your Name"
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  name: e.target.value,
                })
              }
              value={data.name}
              type="text"
              id="name floatingInput"
              className={`${
                data.error.name ? "border-red-500" : ""
              } form-control ps-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="floatingInput ps-5">
              Name<span className="ms-1">*</span>
            </label>
            {!data.error ? "" : alert(data.error.name, "red")}
          </div>

          <div className="form-floating mb-4">
            <input
              placeholder="name@example.com"
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  email: e.target.value,
                })
              }
              value={data.email}
              type="email"
              id="email floatingInput1"
              className={`${
                data.error.email ? "border-red-500" : ""
              } form-control ps-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="floatingInput1 ps-5">
              Email<span className="ms-1">*</span>
            </label>
            {!data.error ? "" : alert(data.error.email, "red")}
          </div>

          <div className="form-floating mb-4">
            <input
              placeholder="Password"
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  password: e.target.value,
                })
              }
              value={data.password}
              type="password"
              id="password floatingPassword"
              className={`${
                data.error.password ? "border-red-500" : ""
              } form-control px-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="password floatingPassword">
              Password<span className="ms-1">*</span>
            </label>
            {!data.error ? "" : alert(data.error.password, "red")}
          </div>

          <div className="form-floating mb-4">
            <input
              placeholder="Confirm Password"
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  cPassword: e.target.value,
                })
              }
              value={data.cPassword}
              type="password"
              id="cPassword floatingPassword1"
              className={`${
                data.error.cPassword ? "border-red-500" : ""
              } form-control px-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="password floatingPassword1">
              Confirm Password<span className="ms-1">*</span>
            </label>
            {!data.error ? "" : alert(data.error.cPassword, "red")}
          </div>

          <div className="d-flex flex-column mt-3 mb-5 flex-md-row justify-content-md-between align-items-md-center">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="px-4 py-2 focus:outline-none me-2"
              />
              <label htmlFor="rememberMe">
                Remember me<span className="fw-normal text-light">*</span>
              </label>
            </div>
            <a className="d-flex text-gray-600" href="/">
              Lost your password?
            </a>
          </div>

          <div
            onClick={(e) => formSubmit()}
            style={{ background: "#8363f0", fontSize: "1.1rem" }}
            className="fw-semibold rounded-4 w-50 mt-4 mx-auto px-4 py-2 text-light text-center cursor-pointer"
          >
            Create an account
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;

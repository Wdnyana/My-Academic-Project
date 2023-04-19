import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        window.location.href = "/";
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
          <p className="text-start fw-normal">Sign into your Account</p>
        </div>
        {layoutData.loginSignupError ? (
          <div className="bg-danger py-2 px-4 rounded">
            You need to login for checkout. Haven't accont? Create new one.
          </div>
        ) : (
          ""
        )}
        <form className="px-5 pt-5 pb-4 bg-secondary rounded-form">
          <div className="form-floating mb-4">
            <input
              placeholder="name@example.com"
              onChange={(e) => {
                setData({ ...data, email: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.email}
              type="text"
              id="name floatingInput"
              className={`${
                !data.error ? "" : "border-danger"
              } form-control ps-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="floatingInput ps-5">
              Email address
            </label>
            {!data.error ? "" : alert(data.error)}
          </div>

          <div className="form-floating mb-4">
            <input
              placeholder="Password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type="password"
              id="password floatingPassword"
              className={`${
                !data.error ? "" : "border-danger"
              } form-control px-4 shadow-none rounded-4 bg-transparent text-light`}
            />
            <label className="ps-4" htmlFor="password floatingPassword">
              Password<span className="ms-1">*</span>
            </label>
            {!data.error ? "" : alert(data.error)}
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
            Login
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;

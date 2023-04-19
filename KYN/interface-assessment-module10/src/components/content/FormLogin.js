import React, { useContext, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FACEBOOK_URL } from "../../utils/api/Constant";
import { loginAPI } from "../../utils/api/UserAPI";
import AuthContext from "../../utils/context/AuthContext";
import FailedMessage from "../auth/FailedMessage";

// import Input from "./Input";

import { LoginFacebook } from "../../assets/img";
import { ImageLogin } from "../../assets/img";
import "../../assets/css/FormLogReg.css";
import Input from "./Input";

const FormLogin = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmitHandler = (data) => {
    loginAPI(data.email, data.password)
      .then((res) => {
        authCtx.login(res.data.accessToken);
        setInvalid(false);
        reset();
        navigate("/profile");
      })
      .catch((err) => {
        setInvalid(true);
      });
  };

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center">
        <div className="form-auth card w-100">
          <div className="card-body">
            <Row className="d-flex justify-content-center align-items-center row-content">
              <Col xs={12} md={7} className="mx-auto px-5">
                <h2 className="card-title fw-bold mb-4 text-center text-uppercase">
                  Login
                </h2>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  {invalid && (
                    <FailedMessage
                      onClose={() => {
                        setInvalid(false);
                      }}
                    >
                      Invalid username or password.
                    </FailedMessage>
                  )}

                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    errors={(errors.email = true)}
                    placeholder="Enter your email"
                    register={register}
                    validation={{
                      required: "Please enter email address",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter valid email",
                      },
                    }}
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    placeholder="Enter your password"
                    register={register}
                    validation={{
                      required: "Please enter password",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary w-75 btn-logreg d-block mx-auto mt-4 btn-lg fw-bold text-uppercase"
                  >
                    Login
                  </button>
                </form>
                <div className="or-separator">
                  <span className="or-text">OR</span>
                </div>
                <div className="social-login d-flex justify-content-center">
                  <a href={FACEBOOK_URL}>
                    <img src={LoginFacebook} alt="" />
                  </a>
                </div>
                <div className="text-center mt-3">
                  <span>Don't have an account?</span>
                  <Link to="/registration" className="ms-2 text-underline">
                    Registration
                  </Link>
                </div>
              </Col>
              <Col xs={12} md={5} className="p-0 m-0">
                <div className="image-lg-reg">
                  <Image
                    src={ImageLogin}
                    className="img-fluid img-login float-end"
                    alt="image login"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;

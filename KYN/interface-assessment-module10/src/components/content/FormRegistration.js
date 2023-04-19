import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registrationAPI } from "../../utils/api/UserAPI";
import FailedMessage from "../auth/FailedMessage";
import SuccesMessage from "../auth/SuccesMessage";

import Input from "./Input";

import { ImageLogin } from "../../assets/img";
import "../../assets/css/FormLogReg.css";

const FormRegistration = () => {
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmitHandler = (data) => {
    registrationAPI({
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phoneNumber: data.phoneNumber,
    })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setStatus("SUCCESS");
        reset();
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setStatus("FAILED");
      });
  };

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center">
        <div className="form-auth card w-100">
          <div className="card-body">
            <Row className="d-flex justify-content-center align-items-center row-content">
              <Col xs={12} md={7} className="mx-auto my-5 px-5">
                <h2 className="card-title fw-bold mb-4 text-center text-uppercase">
                  Registration
                </h2>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  {status === "SUCCESS" && (
                    <SuccesMessage onClose={() => setStatus("")}>
                      {successMessage}
                    </SuccesMessage>
                  )}

                  {status === "FAILED" && (
                    <FailedMessage onClose={() => setStatus("")}>
                      {errorMessage}
                    </FailedMessage>
                  )}

                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    errors={errors}
                    placeholder="Enter your name"
                    register={register}
                    validation={{
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be atleast 3 characters long",
                      },
                    }}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    errors={errors}
                    placeholder="Enter your email"
                    register={register}
                    validation={{
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter valid email",
                      },
                    }}
                    emailTaken={status === "FAILED" ? true : false}
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    placeholder="Enter your password"
                    register={register}
                    validation={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Password must be between 6-18 characters long",
                      },
                      maxLength: {
                        value: 18,
                        message:
                          "Password can't be greater than 18 characters long",
                      },
                    }}
                  />

                  <Input
                    label="Address"
                    name="address"
                    type="text"
                    errors={errors}
                    placeholder="Enter your address"
                    register={register}
                  />

                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    errors={errors}
                    placeholder="Enter your phone number"
                    register={register}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-75 btn-logreg d-block mx-auto mt-4 btn-lg fw-bold text-uppercase"
                  >
                    Registration
                  </button>
                </form>
                <div className="text-center mt-3">
                  <span>have an account?</span>
                  <Link to="/login" className="ms-2 text-underline">
                    Login
                  </Link>
                </div>
              </Col>
              <Col xs={12} md={5} className="p-0 m-0 parent-img-regis">
                <div className="image-lg-regis">
                  <Image
                    src={ImageLogin}
                    className="img-fluid img-regis float-end"
                    alt="image registration"
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

export default FormRegistration;

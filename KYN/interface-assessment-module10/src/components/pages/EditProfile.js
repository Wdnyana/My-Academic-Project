import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { editProfileAPI } from "../../utils/api/UserAPI";
import AuthContext from "../../utils/context/AuthContext";
import Input from "../content/Input";
import Layout from "../layouts/Layout";

import "../../assets/css/AddStore.css";

const EditProfile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { userId, name, address, phoneNumber } = authCtx.profile;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    values: {
      userId,
      name,
      address,
      phoneNumber,
    },
  });

  const onSubmitHandler = (data) => {
    editProfileAPI(data, authCtx.token)
      .then((res) => {
        authCtx.refresh();
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/profile");
      });
  };

  return (
    <Layout>
      <Container>
        <div className="container h-100 mt-5">
          <div className="d-flex justify-content-center">
            <div className="form-auth card m-3 shadow">
              <div className="card-body p-5">
                <h1 className="card-title fw-bold mb-4 text-center text-uppercase">
                  Edit Profile
                </h1>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                    className="btn btn-add btn-dark w-75 mx-auto mt-4 d-block py-3 btn-auth btn-lg fw-bold"
                  >
                    Save Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default EditProfile;

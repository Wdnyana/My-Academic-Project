import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { editStoreAPI } from "../../utils/api/StoresAPI";
import AuthContext from "../../utils/context/AuthContext";
import FailedMessage from "../auth/FailedMessage";
import Input from "./Input";

const EditStore = ({
  storeId,
  storeName,
  country,
  city,
  storeEmail,
  phoneNumber,
  description,
}) => {
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    values: {
      storeId,
      storeName,
      country,
      city,
      storeEmail,
      phoneNumber,
      description,
    },
  });

  const onSubmitHandler = (data) => {
    editStoreAPI(data, authCtx.token)
      .then((res) => {
        authCtx.refresh();
        navigate(`/stores/${res.data.storeName}/${res.data.storeId}`);
      })
      .catch((err) => {
        console.log(err);
        setStatus("FAILED");
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center">
        <div className="form-auth card m-3 shadow">
          <div
            className="card-body p-5"
            style={{ minWidth: "500px", width: "100%" }}
          >
            <h3 className="fs-4 card-title fw-bold mb-4 text-center">
              Edit Store
            </h3>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              {status === "FAILED" && (
                <FailedMessage onClose={() => setStatus("")}>
                  {errorMessage}
                </FailedMessage>
              )}

              <Input
                label="Store Name"
                name="storeName"
                type="text"
                errors={errors}
                placeholder="Enter store name"
                register={register}
                validation={{
                  required: "Store name is required",
                }}
              />

              <Input
                label="Country"
                name="country"
                type="text"
                errors={errors}
                placeholder="Enter country"
                register={register}
                validation={{
                  required: "Country is required",
                }}
              />

              <Input
                label="City"
                name="city"
                type="text"
                errors={errors}
                placeholder="Enter city"
                register={register}
                validation={{
                  required: "City is required",
                }}
              />

              <Input
                label="Email"
                name="storeEmail"
                type="text"
                errors={errors}
                placeholder="Enter store email"
                register={register}
                validation={{
                  required: "Store email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter valid email",
                  },
                }}
              />

              <Input
                label="Phone Number*"
                name="phoneNumber"
                type="text"
                errors={errors}
                placeholder="Enter phone number"
                register={register}
                validation={{
                  required: "Phone number is required",
                }}
              />

              <Input
                label="Description"
                name="description"
                errors={errors}
                type="text"
                placeholder="Enter store description"
                register={register}
              />

              <button
                type="submit"
                className="btn btn-add btn-dark w-75 mx-auto mt-4 d-block py-3 btn-auth fw-bold text-uppercase"
              >
                Save Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStore;

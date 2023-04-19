import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [fData, setFdata] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    success: false,
  });

  useEffect(() => {
    setFdata({
      ...fData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSubmit = () => {
    updatePersonalInformationAction(dispatch, fData);
  };

  if (data.loading) {
    return (
      <div className=" w-full md:w-9/12 d-flex align-items-center justify-content-center py-24">
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
      <div className="container">
        <div className="d-flex flex-column w-full my-4 my-md-0 px-md-8">
          <div className="shadow-lg p-4">
            <h2 className="pt-4 px-4 fw-semibold text-light text-center">
              Personal Information
            </h2>
            <hr />
            <div className="py-4 px-4 md:px-8 lg:px-16 d-flex flex-column my-4">
              {fData.success ? (
                <div className="bg-green-200 px-4 py-2 rounded">
                  {fData.success}
                </div>
              ) : (
                ""
              )}
              <div className="d-flex flex-column my-2">
                <label htmlFor="name " className="mt-3 mb-2 ps-4">
                  Name
                </label>
                <input
                  onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                  value={fData.name}
                  type="text"
                  id="name"
                  className="border px-4 py-2 w-full bg-transparent text-light rounded-4"
                />
              </div>
              <div className="d-flex flex-column my-2">
                <label htmlFor="email" className="mt-3 mb-2 ps-4">
                  Email
                </label>
                <input
                  value={fData.email}
                  readOnly
                  type="email"
                  id="email"
                  className="cursor-not-allowed border px-4 py-2 w-full bg-transparent text-light rounded-4"
                />
                <span className="text-xs text-secondary ps-4">
                  You can't change your email
                </span>
              </div>
              <div className="d-flex flex-column my-2">
                <label htmlFor="number" className="mt-3 mb-2 ps-4">
                  Phone Number
                </label>
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, phone: e.target.value })
                  }
                  value={fData.phone}
                  type="number"
                  id="number"
                  className="border px-4 py-2 w-full focus:outline-none bg-transparent text-light rounded-4"
                />
              </div>
              <div
                onClick={(e) => handleSubmit()}
                className="py-2 px-3 bg-primary w-75 mx-auto text-center fw-semibold rounded-4 mb-1 mt-4 cursor-pointer"
              >
                Update Information
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;

import React, { Fragment, useState, useContext } from "react";
import Layout from "./Layout";
import { handleChangePassword } from "./Action";
import { DashboardUserContext } from "./Layout";

const SettingComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);

  const [fData, setFdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    passwordView: false,
    type: "password",
  });

  if (fData.success || fData.error) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 1500);
  }

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
      <div className="d-flex flex-column w-full my-4 my-md-0 md:w-9/12">
        <div className="shadow-sm p-4">
          <h2 className="py-4 px-4 fw-semibold text-center">Change Password</h2>
          <hr />
          <div className="py-4 px-4 d-flex flex-column my-4">
            {fData.success ? (
              <div className="bg-success px-4 py-2 rounded">
                {fData.success}
              </div>
            ) : (
              ""
            )}
            {fData.error ? (
              <div className="bg-danger px-4 py-2 rounded">{fData.error}</div>
            ) : (
              ""
            )}
            <div className="d-flex flex-column my-2">
              <label htmlFor="oldPassword" className="mt-3 mb-2 ps-4">
                Old Password
              </label>
              <div className="position-relative">
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, oldPassword: e.target.value })
                  }
                  value={fData.oldPassword}
                  type={fData.type}
                  id="oldPassword"
                  className="z-10 border px-4 py-2 w-full focus:outline-none bg-transparent text-light rounded-4"
                />
                <span
                  onClick={(e) =>
                    setFdata({
                      ...fData,
                      passwordView: false,
                      type: "password",
                    })
                  }
                  className={`${
                    fData.passwordView ? "" : "d-none"
                  } position-absolute right-0 m-2 box-border cursor-pointer`}
                >
                  <svg
                    className="text-light cursor-pointer"
                    height="1.5rem"
                    width="1.5rem"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
                <span
                  onClick={(e) =>
                    setFdata({ ...fData, passwordView: true, type: "text" })
                  }
                  className={`${
                    !fData.passwordView ? "" : "d-none"
                  } position-absolute right-0 m-2 box-border cursor-pointer`}
                >
                  <svg
                    className="text-light cursor-pointer"
                    height="1.5rem"
                    width="1.5rem"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="d-flex flex-column my-2">
              <label htmlFor="newPassword" className="mt-3 mb-2 ps-4">
                New Password
              </label>
              <input
                onChange={(e) =>
                  setFdata({ ...fData, newPassword: e.target.value })
                }
                value={fData.newPassword}
                type="password"
                id="newPassword"
                className="border px-4 py-2 w-full focus:outline-none bg-transparent text-light rounded-4"
              />
            </div>
            <div className="d-flex flex-column my-2">
              <label htmlFor="confirmPassword" className="mt-3 mb-2 ps-4">
                Confirm Password
              </label>
              <input
                onChange={(e) =>
                  setFdata({ ...fData, confirmPassword: e.target.value })
                }
                value={fData.confirmPassword}
                type="password"
                id="confirmPassword"
                className="border px-4 py-2 w-full focus:outline-none bg-transparent text-light rounded-4"
              />
            </div>
            <div
              onClick={(e) => handleChangePassword(fData, setFdata, dispatch)}
              className="py-2 px-3 bg-primary w-75 mx-auto text-center fw-semibold rounded-4 mb-1 mt-4 cursor-pointer"
            >
              Change password
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingUser = (props) => {
  return (
    <Fragment>
      <Layout children={<SettingComponent />} />
    </Fragment>
  );
};

export default SettingUser;

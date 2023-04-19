import React, { Fragment, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);

  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <div className="d-flex flex-column w-full my-4 md:w-3/12 fw-normal">
        <div
          style={{ background: "#8363f0" }}
          className="d-flex align-items-center shadow-sm p-2 text-light fw-semibold"
        >
          <svg
            className="cursor-pointer w-16 h-16 text-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="d-flex flex-column w-full">
            <span className="text-sm">Hello, &ensp;</span>
            <span className="text-lg">
              {data.userDetails ? data.userDetails.name : ""}
            </span>
          </div>
        </div>
        <div className="shadow-sm bg-secondary d-none d-md-block w-full d-flex flex-column p-5">
          <div
            onClick={(e) => history.push("/user/orders")}
            className={`${
              location.pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }   py-4 fw-semibold cursor-pointer`}
          >
            My Orders
          </div>
          <hr />
          <div
            onClick={(e) => history.push("/user/profile")}
            className={`${
              location.pathname === "/user/profile"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }   py-4 fw-semibold cursor-pointer`}
          >
            My Accounts
          </div>
          <hr />
          <div
            onClick={(e) => history.push("/wish-list")}
            className={`  py-4 fw-semibold cursor-pointer`}
          >
            My Wishlist
          </div>
          <hr />
          <div
            onClick={(e) => history.push("/user/setting")}
            className={`${
              location.pathname === "/user/setting"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }   py-4 fw-semibold cursor-pointer`}
          >
            Setting
          </div>
          <hr />
          <div
            onClick={(e) => logout()}
            className={`${
              location.pathname === "/admin/dashboard/categories"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  py-4 fw-semibold cursor-pointer`}
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;

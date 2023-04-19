import React, { Fragment, createContext, useReducer, useEffect } from "react";
import { Navbar, Footer, CartModal } from "../partials";
import Sidebar from "./Sidebar";
import {
  dashboardUserState,
  dashboardUserReducer,
} from "./DashboardUserContext";
import { fetchData } from "./Action";

export const DashboardUserContext = createContext();

const Layout = ({ children }) => {
  const [data, dispatch] = useReducer(dashboardUserReducer, dashboardUserState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <Fragment>
      <DashboardUserContext.Provider value={{ data, dispatch }}>
        <div className="flex-grow">
          <Navbar />
          <CartModal />
          <div className="container">
            <div className="mt-24 d-flex flex-column flex-md-row">
              <Sidebar />
              {/* All Children pass from here */}
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </DashboardUserContext.Provider>
    </Fragment>
  );
};

export default Layout;

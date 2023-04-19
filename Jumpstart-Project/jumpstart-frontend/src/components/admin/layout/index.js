import React, { Fragment } from "react";

import AdminNavbar from "../partials/AdminNavbar";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="main-layout">
        <header className="head">
          <AdminNavbar />
        </header>
        <section className="d-flex bg-dark container">
          <AdminSidebar />
          <main>
            {/* All Children pass from here */}
            {children}
          </main>
        </section>
        <footer className="bg-secondary py-4">
          <AdminFooter />
        </footer>
      </div>
    </Fragment>
  );
};

export default AdminLayout;

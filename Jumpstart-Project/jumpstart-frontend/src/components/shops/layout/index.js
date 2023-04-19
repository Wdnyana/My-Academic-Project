import React, { Fragment, createContext } from "react";
import { Navbar, Footer, CartModal } from "../partials";
import LoginSignup from "../auth/LoginSignup";

export const LayoutContext = createContext();

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="main-layout">
        <header className="head">
          <Navbar />
          <LoginSignup />
          <CartModal />
        </header>
        <main>
          {/* All Children pass from here */}
          {children}
        </main>
        <footer className="bg-secondary py-4">
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
};

export default Layout;

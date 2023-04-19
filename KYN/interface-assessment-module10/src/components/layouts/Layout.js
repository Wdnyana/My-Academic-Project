import React from "react";
import NavbarComp from "../content/NavbarComp";
import FooterComp from "../content/FooterComp";

import "../../assets/css/Layout.css";

const Layout = (props) => {
  return (
    <div className="layout">
      <NavbarComp className="navbar" />
      <div className="content">{props.children}</div>
      <FooterComp className="footer" />
    </div>
  );
};

export default Layout;

import React from "react";
import NavbarComp from "../content/NavbarComp";
import FooterComp from "../content/FooterComp";

const LayoutForm = (props) => {
  return (
    <div className="layout">
      <NavbarComp />
      <main className="container  mt-4 mb-4">{props.children}</main>
      <FooterComp />
    </div>
  );
};

export default LayoutForm;

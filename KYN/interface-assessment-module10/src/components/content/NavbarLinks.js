import React from "react";
import { Link } from "react-router-dom";

const NavbarLinks = ({ to, className, children }) => {
  return (
    <li>
      <Link to={to} className={className}>
        {children}
      </Link>
    </li>
  );
};

export default NavbarLinks;

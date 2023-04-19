import React from "react";
import { Breadcrumb } from "react-bootstrap";

const BreadcrumbStore = ({ storeName }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/" className="fw-bold text-primary">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/stores" className="fw-bold text-primary">
        Stores
      </Breadcrumb.Item>
      <Breadcrumb.Item className="fw-bold text-muted">
        {storeName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbStore;

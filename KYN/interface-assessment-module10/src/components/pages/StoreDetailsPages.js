import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Layout from "../layouts/Layout";
import StoreDetails from "../content/StoreDetails";
import Stores from "../../utils/hooks/Stores";
import BreadcrumbStore from "../content/BreadcrumbStore";

const StoreDetailsPages = () => {
  const { storeId } = useParams();
  const { store } = Stores(storeId);

  return (
    <Layout>
      <Container className="py-3">
        <BreadcrumbStore storeName={store.storeName} />
        <StoreDetails />
      </Container>
    </Layout>
  );
};

export default StoreDetailsPages;

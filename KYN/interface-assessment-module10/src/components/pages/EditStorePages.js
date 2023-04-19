import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Layout from "../layouts/Layout";
import EditStore from "../content/EditStore";
import Stores from "../../utils/hooks/Stores";
import NoPermission from "../auth/NoPermission";

const EditStorePages = () => {
  const { storeId } = useParams();
  const { store, editPermission } = Stores(storeId);

  return (
    <Layout>
      <Container>
        {editPermission ? (
          <EditStore
            storeId={storeId}
            storeName={store.storeName}
            country={store.country}
            city={store.city}
            storeEmail={store.storeEmail}
            phoneNumber={store.phoneNumber}
            description={store.description}
          />
        ) : (
          <NoPermission />
        )}
      </Container>
    </Layout>
  );
};

export default EditStorePages;

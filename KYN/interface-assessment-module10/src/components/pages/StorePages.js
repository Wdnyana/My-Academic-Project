import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import Layout from "../layouts/Layout";
import Store from "../content/Store";
import FormSearch from "../content/FormSearch";
import { searchStoreAPI } from "../../utils/api/StoresAPI";
import AuthContext from "../../utils/context/AuthContext";
import ListStore from "../../utils/hooks/ListStore";

const StorePages = (props) => {
  const authCtx = useContext(AuthContext);
  const [listStore, setListStore] = useState([]);
  const [searchParams] = useSearchParams();

  const { stores } = ListStore();

  useEffect(() => {
    if (searchParams.get("search") === null) {
      setListStore(stores);
    }

    if (searchParams.get("search") !== null) {
      searchStoreAPI(searchParams.get("search"), authCtx.token)
        .then((res) => {
          setListStore(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [authCtx.token, searchParams, stores]);

  return (
    <Layout>
      <Container>
        <div className={props.className}>
          <div className="d-flex my-3 justify-content-between align-items-start">
            <Link
              to="/stores/add"
              className="me-5 py-3 btn btn-dark w-25 fw-bold"
            >
              Add Store
            </Link>
            <FormSearch />
          </div>
        </div>
        <div className="row">
          {listStore.map((store) => (
            <Store key={store.storeId} store={store} />
          ))}
        </div>
        {listStore.length <= 0 && (
          <h2 className="text-muted">Store Not Found!</h2>
        )}
      </Container>
    </Layout>
  );
};

export default StorePages;

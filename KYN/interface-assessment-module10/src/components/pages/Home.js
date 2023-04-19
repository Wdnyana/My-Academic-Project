import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { searchStoreAPI } from "../../utils/api/StoresAPI";
import FormSearch from "../content/FormSearch";
import Store from "../content/Store";
import ListStore from "../../utils/hooks/ListStore";
import AuthContext from "../../utils/context/AuthContext";

import { HeroBanner } from "../../assets/img";
import "../../assets/css/Home.css";

const Home = (props) => {
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
    <Layout className={props.className}>
      <div className="jumbotron jumbotron-fluid text-dark py-5 mb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center gx-5">
            <div className="col-12 col-md-6">
              <h1 className="display-4 text-uppercase mb-4 fw-bold">
                Welcome to Know your neigborhood
              </h1>
              <p className="lead">
                "Know Your Neighborhood" is an online store that provides
                products related to the surrounding environment. This platform
                can be used to sell various products such as home security
                equipment, farming equipment, community products, etc. that can
                be used by residents in the surrounding area. Additionally, this
                platform can also be used to provide information about the
                surrounding environment, community events, etc. This platform is
                expected to help residents get to know their surrounding
                environment better and make it a better place.
              </p>
              <div class=" d-block mt-4 ">
                <button
                  class="btn btn-dark w-50 py-3 text-uppercase btn-get-started"
                  type="button"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6 parent-image">
              <div className="hero-image">
                <img
                  src={HeroBanner}
                  className="img-fluid hero-content"
                  alt="Hero Banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";

import { getListStoreAPI } from "../api/StoresAPI";
import AuthContext from "../context/AuthContext";

const ListStore = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getListStoreAPI(authCtx.token)
      .then((res) => {
        setStores(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [authCtx]);
  return { stores, error };
};

export default ListStore;

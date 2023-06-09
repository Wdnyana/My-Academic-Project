import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../utils/context/AuthContext";

const FacebookLogin = () => {
  const authCtx = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("token") !== null) {
      authCtx.login(searchParams.get("token"));
      navigate("/profile");
    }
  }, [authCtx, navigate, searchParams]);

  return <div className="mt-3 text-center">Loading...</div>;
};

export default FacebookLogin;

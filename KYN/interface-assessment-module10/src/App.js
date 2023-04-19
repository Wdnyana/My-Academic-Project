import React, { useContext } from "react";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./utils/context/AuthContext";

// import page
import Home from "./components/pages/Home";
import LoginPages from "./components/pages/LoginPages";
import FacebookLogin from "./components/content/FacebookLogin";
import RegistrationPages from "./components/pages/RegistrationPages";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import AddingStorePages from "./components/pages/AddingStorePages";
import StorePages from "./components/pages/StorePages";
import StoreDetailsPages from "./components/pages/StoreDetailsPages";
import EditStorePages from "./components/pages/EditStorePages";
import ProfilePages from "./components/pages/ProfilePages";
import EditProfile from "./components/pages/EditProfile";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginPages />} />
          <Route path="/registration" element={<RegistrationPages />} />
          <Route path="/oauth2/redirect" element={<FacebookLogin />} />

          <Route path="/stores/*" element={<Navigate to="/login" />} />
          <Route path="/profile/*" element={<Navigate to="/login" />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route path="/stores" element={<StorePages />} />
          <Route path="/stores/add" element={<AddingStorePages />} />
          <Route
            path="/stores/:storeName/:storeId"
            element={<StoreDetailsPages />}
          />
          <Route
            path="/stores/:storeName/:storeId/edit"
            element={<EditStorePages />}
          />
          <Route path="/profile" element={<ProfilePages />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/:name/:userId" element={<ProfilePages />} />
        </>
      )}
    </Routes>
  );
}

export default App;

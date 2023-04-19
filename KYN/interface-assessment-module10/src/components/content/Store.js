import React from "react";
import { Link } from "react-router-dom";
import { ImageStore, imgProfile } from "../../assets/img";

const Store = ({ store }) => {
  const { storeId, storeName, country, city, user } = store;
  const profilePicture = user.imageUrl;

  const strName = user.name.replace(/\s+/g, "-").toLowerCase();
  const strStoreName = storeName.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="col-12 col-md-6 col-md-4 col-lg-3 mb-3">
      <div className="card">
        <img className="p-3" src={ImageStore} alt="store" />
        <hr />
        <div className="d-flex text-secondary">
          <Link to={`/profile/${strName}/${user.userId}`}>
            <img
              src={profilePicture ? profilePicture : imgProfile}
              alt="profile_picture"
              className="rounded-circle m-3"
              style={{ maxWidth: "60px" }}
            />
          </Link>
          <div>
            <p className="fw-bold text-primary m-0">{storeName}</p>
            <p className="m-0"> {country}</p>
            <p className="m-0">{city}</p>
          </div>
        </div>

        <Link
          className="btn btn-dark py-2  btn-car w-75 mx-auto my-3 fw-bold"
          to={`/stores/${strStoreName}/${storeId}`}
        >
          Check Details
        </Link>
      </div>
    </div>
  );
};

export default Store;

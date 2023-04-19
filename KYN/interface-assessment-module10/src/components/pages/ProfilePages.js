import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import Store from "../content/Store";
import AuthContext from "../../utils/context/AuthContext";
import { getUserAPI } from "../../utils/api/UserAPI";
import { imgProfile } from "../../assets/img";

const ProfilePages = (props) => {
  const { profile, stores, token } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [userStores, setUserStores] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [isUser, setIsUser] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    if (userId === undefined) {
      setUserProfile(profile);
      setUserStores(stores);
      setProfilePicture(profile.imageUrl);
      setIsUser(profile.userId === userProfile.userId);
    }

    if (userId !== undefined && userId !== 0) {
      getUserAPI(userId, token)
        .then((res) => {
          setUserProfile(res.data.profile);
          setUserStores(res.data.stores);
          setProfilePicture(res.data.profile.imageUrl);
        })
        .catch((err) => {
          setUserProfile({ name: "User not found!!" });
        });
    }
  }, [userId, token, profile, stores, userProfile.userId]);

  return (
    <Layout>
      <Container className={props.className}>
        {isUser && (
          <div className="d-flex my-3 justify-content-end align-items-start">
            <Link to="/stores/add" className=" py-3 btn btn-dark w-25 fw-bold">
              Add Store
            </Link>
          </div>
        )}
        <div className="card my-3">
          <div className="d-flex row justify-content-center align-items-center w-100">
            <div className="col-12 col-md-5 border-right">
              <img
                src={profilePicture ? profilePicture : imgProfile}
                alt=""
                className="rounded-circle m-4 w-50 mx-auto d-block"
              />
            </div>
            <div className="col-12 col-md-7">
              <div className="py-3">
                <h3>{userProfile.name}</h3>
                <hr />
                <h4>Email</h4>
                <p>{userProfile.email}</p>
                <h4>Address</h4>
                <p>{userProfile.address}</p>
                <h4>Phone</h4>
                <p>{userProfile.phoneNumber}</p>
              </div>
              <Link
                to="/profile/edit"
                className="me-5 py-2 btn btn-dark w-25 fw-bold mb-4"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {userStores.map((store) => (
            <Store key={store.storeId} store={store} />
          ))}
        </div>
        {userStores.length <= 0 && (
          <p className="text-muted">No store available</p>
        )}
      </Container>
    </Layout>
  );
};

export default ProfilePages;

import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { uploadImage, sliderImages, deleteImage } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const Carousel = () => {
  const { data, dispatch } = useContext(DashboardContext);

  return (
    <Fragment>
      <div className="my-4 w-full">
        {!data.uploadSliderBtn ? (
          <div
            onClick={(e) =>
              dispatch({
                type: "uploadSliderBtn",
                payload: !data.uploadSliderBtn,
              })
            }
            style={{ background: "#212741 !important" }}
            className="cursor-pointer rounded-full p-2 d-flex align-items-center justify-content-center text-gray-100 text-sm font-semibold uppercase"
          >
            <svg
              className="me-2 text-light cursor-pointer"
              height="2rem"
              width="2rem"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Customize Slider Image Discount
          </div>
        ) : (
          ""
        )}
      </div>
      {data.uploadSliderBtn ? <UploadImageSection /> : ""}
    </Fragment>
  );
};

const UploadImageSection = () => {
  const { data, dispatch } = useContext(DashboardContext);

  const uploadImageHandler = (image) => {
    uploadImage(image, dispatch);
  };

  return (
    <Fragment>
      <div className="position-relative m-4 bg-secondary p-4 shadow-lg rounded-4">
        <h1 className=" border-bottom  mb-4 py-3 text-2xl font-semibold">
          Discount Slider Images
        </h1>
        <div className="position-relative d-flex flex-column justify-content-center my-3">
          <div className="position-relative bg-primary z-0 px-4 py-2 rounded-4 text-light d-flex align-items-center justify-content-start fw-semibold w-25">
            <div className="mx-auto">
              <svg
                className="me-1 text-light cursor-pointer"
                height="2rem"
                width="2rem"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>{" "}
              <span>Upload</span>
            </div>
          </div>
          <input
            onChange={(e) => uploadImageHandler(e.target.files[0])}
            name="image"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            className="position-absolute z-10 opacity-0 bg-gray-100 cursor-pointer"
            type="file"
            id="image"
          />
        </div>
        <span
          onClick={(e) =>
            dispatch({
              type: "uploadSliderBtn",
              payload: !data.uploadSliderBtn,
            })
          }
          style={{ background: "#212741 !important" }}
          className="cursor-pointer position-absolute top-0 right-0 m-4 rounded-full py-3"
        >
          <svg
            className="me-2 text-light cursor-pointer"
            height="2rem"
            width="2rem"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <AllImages />
      </div>
    </Fragment>
  );
};

const AllImages = () => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImageReq = (id) => {
    deleteImage(id, dispatch);
  };

  return (
    <Fragment>
      {data.imageUpload ? (
        <div className="d-flex align-items-center justify-content-center p-3">
          <svg
            className="animate-spin text-light me-2  cursor-pointer"
            height="3rem"
            width="3rem"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {data.sliderImages.length > 0 ? (
          data.sliderImages.map((item, index) => {
            return (
              <div key={index} className="position-relative col-span-1 m-1">
                <img
                  className="w-full md:h-32 object-center object-cover"
                  src={`${apiURL}/uploads/carousels/${item.slideImage}`}
                  alt="sliderImages"
                />
                <span
                  onClick={(e) => deleteImageReq(item._id)}
                  style={{ background: "#212741 !important" }}
                  className="position-absolute top-0 right-0 m-1 text-light cursor-pointer rounded-4 p-2"
                >
                  <svg
                    className="text-dark cursor-pointer"
                    height="2rem"
                    width="2rem"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-xl font-light w-full bg-orange-200 rounded py-2">
            No slide image found
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Carousel;

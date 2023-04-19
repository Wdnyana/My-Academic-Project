import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
const apiURL = process.env.REACT_APP_API_URL;

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [categories, setCategories] = useState(null);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pEditImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setCategories(responseData.Categories);
    }
  };

  useEffect(() => {
    setEditformdata({
      pId: data.editProductModal.pId,
      pName: data.editProductModal.pName,
      pDescription: data.editProductModal.pDescription,
      pImages: data.editProductModal.pImages,
      pStatus: data.editProductModal.pStatus,
      pCategory: data.editProductModal.pCategory,
      pQuantity: data.editProductModal.pQuantity,
      pPrice: data.editProductModal.pPrice,
      pOffer: data.editProductModal.pOffer,
    });
  }, [data.editProductModal]);

  const fetchData = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!editformData.pEditImages) {
      console.log("Image Not upload=============", editformData);
    } else {
      console.log("Image uploading");
    }
    try {
      let responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            error: responseData.error,
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) =>
          dispatch({ type: "editProductModalClose", payload: false })
        }
        className={`${
          data.editProductModal.modal ? "" : "d-none"
        } position-fixed top-0 left-0 z-30 w-full h-full bg-dark opacity-50 rounded-5`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? "" : "d-none"
        } position-fixed inset-0 d-flex align-items-center z-30 justify-content-center overflow-auto rounded-5`}
      >
        <div className="rounded-5 ms-start-5 mt-32 mt-md-0 position-relative bg-secondary w-11/12 md:w-3/6 shadow-lg d-flex flex-column align-items-center my-4 px-4 py-4 px-md-5">
          <div className="rounded-5 d-flex align-items-center justify-content-between w-full pt-4">
            <span className="text-start fw-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "editProductModalClose", payload: false })
              }
              className="cursor-pointer text-light py-2 px-2 rounded-5"
            >
              <svg
                className="cursor-pointer text-light"
                height="1.5rem"
                width="1.5rem"
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
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full rounded-5" onSubmit={(e) => submitForm(e)}>
            <div className="d-flex mx-1 py-4">
              <div className="w-1/2 d-flex flex-column my-1 mx-1">
                <label htmlFor="name" className="mb-2 mt-3">
                  Product Name *
                </label>
                <input
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none bg-transparent text-light rounded-4"
                  type="text"
                />
              </div>
              <div className="w-1/2 d-flex flex-column my-1 mx-1">
                <label htmlFor="price" className="mb-2 mt-3">
                  Product Price *
                </label>
                <input
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none bg-transparent text-light rounded-4"
                  id="price"
                />
              </div>
            </div>
            <div className="d-flex flex-column my-2">
              <label htmlFor="description" className="mb-2 mt-3">
                Product Description *
              </label>
              <textarea
                value={editformData.pDescription}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none bg-transparent text-light rounded-4"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="d-flex flex-column mt-4">
              <label htmlFor="image" className="mb-2 mt-3">
                Product Images *
              </label>
              {editformData.pImages ? (
                <div className="d-flex mx-1">
                  <img
                    className="object-cover"
                    height="4rem"
                    width="4rem"
                    src={`${apiURL}/uploads/products/${editformData.pImages[0]}`}
                    alt="productImage"
                  />
                  <img
                    className="object-cover"
                    height="4rem"
                    width="4rem"
                    src={`${apiURL}/uploads/products/${editformData.pImages[1]}`}
                    alt="productImage"
                  />
                </div>
              ) : (
                ""
              )}
              <span className="text-seconsary text-sm-start">
                Must need 2 images
              </span>
              <input
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pEditImages: [...e.target.files],
                  })
                }
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none bg-transparent text-light rounded-4"
                id="image"
                multiple
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="d-flex mx-1 py-4">
              <div className="w-1/2 d-flex flex-column my-1">
                <label htmlFor="status" className="mb-2 mt-3">
                  Product Status *
                </label>
                <select
                  value={editformData.pStatus}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none bg-secondary text-light rounded-4"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="w-1/2 d-flex ms-3 flex-column my-1">
                <label htmlFor="status" className="mb-2 mt-3">
                  Product Category *
                </label>
                <select
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none bg-secondary text-light rounded-4"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories && categories.length > 0
                    ? categories.map((elem) => {
                        return (
                          <Fragment key={elem._id}>
                            {editformData.pCategory._id &&
                            editformData.pCategory._id === elem._id ? (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                                selected
                              >
                                {elem.cName}
                              </option>
                            ) : (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                              >
                                {elem.cName}
                              </option>
                            )}
                          </Fragment>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="d-flex mx-1 py-4">
              <div className="w-1/2 d-flex flex-column my-1">
                <label htmlFor="quantity" className="mb-2 mt-3">
                  Product in Stock *
                </label>
                <input
                  value={editformData.pQuantity}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none bg-transparent text-light rounded-4"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 d-flex flex-column  ms-3 my-1">
                <label htmlFor="offer" className="mb-2 mt-3">
                  Product Offfer (%) *
                </label>
                <input
                  value={editformData.pOffer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none text-light bg-transparent rounded-4"
                  id="offer"
                />
              </div>
            </div>
            <div className="d-flex flex-column my-1 w-full pb-4 pb-md-5 mt-4">
              <button
                type="submit"
                className="rounded-5 bg-primary border-0 text-light fw-semibold py-2"
              >
                Update product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;

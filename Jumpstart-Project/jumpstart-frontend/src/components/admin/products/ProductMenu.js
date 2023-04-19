import React, { Fragment, useContext } from "react";
import { ProductContext } from "./index";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ProductMenu = (props) => {
  const { dispatch } = useContext(ProductContext);
  return (
    <Fragment>
      <div className="col-span-1 d-flex justify-content-between align-items-center mb-4">
        <div className="flex items-center">
          {/* It's open the add product modal */}
          <span
            onClick={(e) =>
              dispatch({ type: "addProductModal", payload: true })
            }
            className="bg-primary rounded-5 cursor-pointer py-2 px-4 d-flex align-items-center text-light text-sm-start fw-semibold text-uppercase"
          >
            <svg
              className=" text-light me-2"
              height="1.5rem"
              width="1.5rem"
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
            Add Product
          </span>
        </div>
        <AddProductModal />
        <EditProductModal />
      </div>
    </Fragment>
  );
};

export default ProductMenu;

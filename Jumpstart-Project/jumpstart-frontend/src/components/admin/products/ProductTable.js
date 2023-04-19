import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch product context */
  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center p-3">
        <svg
          className="animate-spin text-light"
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
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-secondary shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Offer</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    editProduct={(pId, product, type) =>
                      editProduct(pId, product, type)
                    }
                    deleteProduct={(pId) => deleteProductReq(pId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className=" text-center fw-semibold py-3">
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm-start text-secondary mt-2">
          Total {products && products.length} product found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-start">
          {product.pName.length > 15
            ? product.pDescription.substring(1, 15) + "..."
            : product.pName}
        </td>
        <td className="p-2 text-start">
          {product.pDescription.slice(0, 15)}...
        </td>
        <td className="p-2 text-center">
          <img
            className="object-cover object-center"
            height="75%"
            width="75%"
            src={`${apiURL}/uploads/products/${product.pImages[0]}`}
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">
          {product.pStatus === "Active" ? (
            <span className="bg-success rounded-4 text-center px-3 py-2 fw-semibold">
              {product.pStatus}
            </span>
          ) : (
            <span className="bg-danger rounded-4 text-center px-3 py-2 fw-semibold">
              {product.pStatus}
            </span>
          )}
        </td>
        <td className="p-2 text-center">{product.pQuantity}</td>
        <td className="p-2 text-center">{product.pCategory.cName}</td>
        <td className="p-2 text-center">{product.pOffer}</td>
        <td className="p-2 text-center">
          {moment(product.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(product.updatedAt).format("lll")}
        </td>
        <td className="p-2 d-flex align-items-center justify-content-center">
          <span
            onClick={(e) => editProduct(product._id, product, true)}
            className="cursor-pointer rounded-3 p-2 mx-1"
          >
            <svg
              className=" fill-current text-success"
              height="1.5rem"
              width="1.5rem"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer rounded-3 p-2 mx-1"
          >
            <svg
              className="fill-current text-danger"
              height="1.5rem"
              width="1.5rem"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;

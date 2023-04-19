import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";

const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr className="text-center">
          <th className="px-4 py-2 border">Products</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Total</th>
          <th className="px-4 py-2 border">Phone</th>
          <th className="px-4 py-2 border">Address</th>
          <th className="px-4 py-2 border">Transaction Id</th>
          <th className="px-4 py-2 border">Checkout</th>
          <th className="px-4 py-2 border">Processing</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order }) => {
  return (
    <Fragment>
      <tr className="border-b">
        <td className="w-48 p-2 d-flex flex-column ">
          {order.allProduct.map((product, i) => {
            return (
              <span className="d-block d-flex align-items-center " key={i}>
                <img
                  className="object-cover object-center me-2"
                  height="35%"
                  width="35%"
                  src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                  alt="productImage"
                />
                <span>{product.id.pName}</span>
                <span>{product.quantitiy}x</span>
              </span>
            );
          })}
        </td>
        <td className="p-2 text-center cursor-default">
          {order.status === "Not processed" && (
            <span className="d-block text-danger rounded-5 text-center py-2 px-4 fw-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="d-block text-warning rounded-5 text-center py-2 px-4 fw-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="d-block text-primary rounded-5 text-center py-2 px-4 fw-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="d-block text-success rounded-5 text-center py-2 px-4 fw-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="d-block text-danger rounded-5 text-center py-2 px-4 fw-semibold">
              {order.status}
            </span>
          )}
        </td>
        <td className="p-2 text-center">${order.amount}.00</td>
        <td className="p-2 text-center">{order.phone}</td>
        <td className="p-2 text-center">{order.address}</td>
        <td className="p-2 text-center">{order.transactionId}</td>
        <td className="p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className=" w-full md:w-9/12 d-flex align-items-center justify-content-center py-24">
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
      <div className="ms-3 d-flex flex-column w-full my-4 my-md-0 md:w-9/12 bg-secondary px-4">
        <h2 className="py-4 px-4 fw-semibold text-center">Orders</h2>
        <hr />
        <div className="overflow-auto p-4">
          <table className="table-auto border w-full my-2">
            <TableHeader />
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((item, i) => {
                  return <TableBody key={i} order={item} />;
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-xl text-center fw-semibold py-8"
                  >
                    No order found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2">
            Total {orders && orders.length} order found
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;

import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DashboardContext } from "./";
import { todayAllOrders } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const SellTable = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    todayAllOrders(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersList = () => {
    let newList = [];
    if (data.totalOrders.Orders !== undefined) {
      data.totalOrders.Orders.forEach(function (elem) {
        if (moment(elem.createdAt).format("LL") === moment().format("LL")) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  return (
    <Fragment>
      <div className="container">
        <div className="col-span-1 overflow-auto bg-secondary shadow-lg p-4 w-full">
          <div className="text-2xl fw-bold my-3 text-center">
            Today's Orders{" "}
            {data.totalOrders.Orders !== undefined ? ordersList().length : 0}
          </div>
          <table className="table-auto border w-full mb-4">
            <thead>
              <tr className="text-center">
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Order Address</th>
                <th className="px-4 py-2 border">Ordered at</th>
              </tr>
            </thead>
            <tbody className="border">
              {data.totalOrders.Orders !== undefined ? (
                ordersList().map((item, key) => {
                  return <TodayOrderTable order={item} key={key} />;
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-lg text-center fw-semibold py-4 border"
                  >
                    No orders found today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2 text-center py-5">
            Total{" "}
            {data.totalOrders.Orders !== undefined ? ordersList().length : 0}{" "}
            orders found
          </div>
          <div className="d-flex justify-content-center mx-auto w-25">
            <span
              onClick={(e) => history.push("/admin/dashboard/orders")}
              style={{ background: "#8363f0" }}
              className="cursor-pointer px-5 py-2 text-light text-center rounded-5 w-100"
            >
              View All
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const TodayOrderTable = ({ order }) => {
  return (
    <Fragment>
      <tr>
        <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
          {order.allProduct.map((item, index) => {
            return (
              <div key={index} className="flex space-x-2">
                <span>{item.id.pName}</span>
                <span>{item.quantitiy}x</span>
              </div>
            );
          })}
        </td>
        <td className="p-2 text-left">
          {order.allProduct.map((item, index) => {
            return (
              <img
                key={index}
                className="object-cover w-50 h-50 mx-auto d-block"
                src={`${apiURL}/uploads/products/${item.id.pImages[0]}`}
                alt="Pic"
              />
            );
          })}
        </td>
        <td className="p-2 text-center">
          {order.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>
        <td className="p-2 text-center">{order.address}</td>
        <td className="p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

const TodaySell = (props) => {
  return (
    <div className="container">
      <div className="mt-4 mb-5">
        <SellTable />
      </div>
    </div>
  );
};

export default TodaySell;

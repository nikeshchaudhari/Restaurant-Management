import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import CartUi from "./CartUi";
import axios from "axios";
import Order from "../Order";
import type { JSX } from "react/jsx-runtime";
import { toast } from "react-toastify";

const ViewOrder = () => {
  interface OrderItem {
    menuId: string;
    menuName: string;
    price: number;
    qty: number;
    totalAmount: number;
  }

  interface Order {
    _id: string;
    orderId: string;
    tableNumber: string;
    items: OrderItem[];
    totalAmount: number;
  }

  const [order, setOrder] = useState<Order[]>([]);
  console.log(order);
  const fetchOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/order/my-order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrder(res.data.orders);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  //   update table
  const updateTable = async (id: any, status: any) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/order/order-update/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Order Updated");
      fetchOrder();
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
    }
  };
  return (
    <>
      <main>
        <Navbar />

        <div className="md:flex min-h-screen ">
          <div className="hidden md:block ">
            <UiSlider />
          </div>

          <div className="w-full h-scren flex justify-center relative">
            <div className=" absolute top-20 shadow rounded  w-[80vw] h-auto p-5">
              <h2 className="text-[18px] font-['poppins']">My Orders</h2>

              <table className="bg-white  w-full  h-full mt-5  ">
                <thead className="bg-gray-100">
                  <tr>
                    <th className=" px-4 py-2 text-left ">Order Id</th>
                    <th className=" px-4 py-2 text-left ">Table No</th>
                    <th className=" px-4 py-2 text-left ">Items</th>

                    <th className=" px-4 py-2 text-left ">Price</th>
                    <th className=" px-4 py-2 text-left ">Total Price</th>
                    <th className=" px-4 py-2 text-left ">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {order.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-5 text-[20px] font-bold"
                      >
                        No Order Found
                      </td>
                    </tr>
                  ) : (
                    order.map((order) => (
                      <tr key={order._id}>
                        <td className=" px-4 py-2 text-left ">
                          {order.orderId}
                        </td>
                        <td className=" px-4 py-2 text-left ">
                          {order.tableNumber}
                        </td>
                        <td>
                          {order.items.map((item: any, index) => (
                            <div key={index}>
                              {item.menuName} X {item.qty}
                            </div>
                          ))}
                        </td>

                        <td className=" px-4 py-2 text-left ">
                          {order.items.map((item, index) => (
                            <div key={index}>Rs. {item.price}</div>
                          ))}
                        </td>
                        <td className=" px-4 py-2 text-left ">
                          Rs. {order.totalAmount}
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateTable(order._id, e.target.value)
                            }
                            className="border p-1 rounded cursor-pointer"
                          >
                            <option value="preparing">Preparing</option>
                            <option value="completed">Completed</option>
                            <option value="paid">Paid</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <CartUi />
        </div>
      </main>
    </>
  );
};

export default ViewOrder;

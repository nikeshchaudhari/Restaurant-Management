import  { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import CartUi from "./CartUi";
import axios from "axios";

import { toast } from "react-toastify";
import OrderSlide from "../../components/OrderSlide";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { clearSelectedTable } from "../../features/TableSlice";

const ViewOrder = () => {
  interface OrderItem {
    menuId: string;
    menuName: string;
    price: number;
    qty: number;
    totalAmount: number;
  }

  interface Order {
    status: string | number | readonly string[] | undefined;
    _id: string;
    orderId: string;
    tableNumber: string;
    items: OrderItem[];
    totalAmount: number;
  }

  const dispatch:AppDispatch = useDispatch()


  const [order, setOrder] = useState<Order[]>([]);
  // console.log(order);
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
      dispatch(clearSelectedTable())
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
    }
  };
  return (
    <>
      <main>
        <Navbar />
<div className="md:flex min-h-screen bg-gray-50">
  {/* Desktop Sidebar */}
  <div className="hidden md:block">
    <UiSlider />
  </div>

  {/* Main Content */}
  <div className="w-full flex justify-center px-3 md:px-5 py-20">
    <div className="shadow rounded w-full max-w-300 bg-white p-3 md:p-5">
      <h2 className="text-[18px] md:text-[22px] font-['poppins'] font-semibold">
        My Orders
      </h2>

      {/* */}
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-225 md:min-w-full ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Order Id</th>
              <th className="px-4 py-3 text-left">Table No</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {order.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-5 text-[18px] font-semibold"
                >
                  No Order Found
                </td>
              </tr>
            ) : (
              order.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{order.orderId}</td>

                  <td className="px-4 py-3">{order.tableNumber}</td>

                  <td className="px-4 py-3">
                    {order.items.map((item: any, index) => (
                      <div key={index}>
                        {item.menuName} × {item.qty}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3">
                    {order.items.map((item, index) => (
                      <div key={index}>Rs. {item.price}</div>
                    ))}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    Rs. {order.totalAmount}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateTable(order._id, e.target.value)
                      }
                      className="border p-2 rounded cursor-pointer text-sm"
                    >
                      <option value="preparing">Preparing</option>
                      <option value="cancelled">Cancel</option>                      <option value="paid">Paid</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <CartUi />
  <OrderSlide />
</div>
      </main>
    </>
  );
};

export default ViewOrder;

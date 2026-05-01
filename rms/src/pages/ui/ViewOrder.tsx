import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import CartUi from "./CartUi";
import axios from "axios";

import { toast } from "react-toastify";
import OrderSlide from "../../components/OrderSlide";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { clearSelectedTable } from "../../features/TableSlice";
import { Helmet } from "react-helmet-async";

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
    createdAt: string;
  }

  const dispatch: AppDispatch = useDispatch();

  const [order, setOrder] = useState<Order[]>([]);
  const [filterOrder, setFilterOrder] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage] = useState(10);
  // console.log(order);
  const fetchOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/order/my-order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrder(res.data.orders);
    setFilterOrder(res.data.orders);
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
      dispatch(clearSelectedTable());
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
    }
  };
  // sort

  const filterOrders = (type: any) => {
    const now = new Date();
    if (type === "all") {
      setFilterOrder(order);
      return;
    }
    if (type === "today") {
      const data = order.filter((item) => {
        const d = new Date(item.createdAt);

        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });
      setFilterOrder(data);
    }

    if (type === "week") {
      const weekDate = new Date();
      weekDate.setDate(now.getDate() - 7);

      const data = order.filter((item) => new Date(item.createdAt) >= weekDate);
      setFilterOrder(data);

      return;
    }

    // months
    if (type === "months") {
      const data = order.filter((item) => {
        const d = new Date(item.createdAt);

        return d.getMonth() === now.getMonth();
      });

      setFilterOrder(data);
      console.log(data);
    }
  };

  const indexOfLastPage = currentPage * rowPage;
  const indexOfFirstPage = indexOfLastPage - rowPage;
  const currentList = filterOrder.slice(indexOfFirstPage, indexOfLastPage);
  const totalPage = Math.ceil(filterOrder.length / rowPage);

  return (
    <>
     <Helmet>
          <title>Endcodes Nepal Restaurant | View Order</title>
          <meta name="description" content="Best food ordering system" />
        </Helmet>
      <main>
        <Navbar />
        <div className="min-h-screen">
        <div className="md:flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <UiSlider />
          </div>

          {/* Main Content */}
          <div className="w-full flex justify-center px-3 md:px-5 mb-3 pt-20">
            <div className="shadow rounded w-full max-w-300 bg-white p-3 md:p-5">
              <h2 className="text-[18px] md:text-[22px] font-['poppins'] font-semibold">
                My Orders
              </h2>

              {/* */}
              <div className="flex  justify-end px-5 mb-3 gap-2 items-center ">
                <h2>Sort By</h2>
                <select
                  name=""
                  id=""
                  className="w-30 py-1  px-3 border rounded"
                  onChange={(e) => filterOrders(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="week">Week</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <div className="overflow-x-auto  rounded">
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
                    {filterOrder.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center px-5 text-[18px] font-semibold"
                        >
                          No Order Found
                        </td>
                      </tr>
                    ) : (
                      currentList.map((order) => (
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
                              <option value="cancelled">Cancel</option>{" "}
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
          </div>

         
        </div>
         {filterOrder.length > 0  &&(
            <div className="flex gap-2 mt-1 mb-5  lg:mt-0 lg:mb-4 justify-center md:justify-end px-5 items-center ">
            <button disabled={currentPage === 1} className="px-2 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer" onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
            <span className=" py-2">{currentPage} ..... {totalPage}</span>
            <button disabled={currentPage===totalPage} className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer " onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
          </div>
           )}
        
            <CartUi />
          <OrderSlide />
          </div>
      </main>
    </>
  );
};

export default ViewOrder;

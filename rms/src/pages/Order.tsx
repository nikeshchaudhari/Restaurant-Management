import { useNavigate } from "react-router-dom";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
interface OrderMenu {
  menuName: string;
  price: number;
  qty: number;
}

interface Order {
  _id: string;
  orderId: string;

  tableNumber: string;
  items: OrderMenu[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface Table {
  status: string;
}
const Order = () => {
  const [order, setOrder] = useState<Order[]>([]);
  const [table, setTable] = useState<Table[]>([]);
  const [filterOrder, setFilterOrder] = useState<Order[]>([]);

  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // fetch order

  const fetchOrder = async () => {
    const res = await axios.get("http://localhost:3000/order/all-order");
    setOrder(res.data.allOrder);
    setFilterOrder(res.data.allOrder);

    const tableFetch = await axios.get("http://localhost:3000/table/all-table");
    setTable(tableFetch.data.allData);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  // update status
  const updateStatus = async (id: any, status: any) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/order/order-update/${id}`,
        { status },
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

  // sort || filters
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

    // week

    if (type === "week") {
      const weekDate = new Date();
      weekDate.setDate(now.getDate() - 7);
      console.log(weekDate);
    }
  };
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-full  bg-[#E9E9E9] min-h-screen  ">
          <div className="flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Orders</h1>
            <button
              className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300"
              onClick={logoutHandle}
            >
              Logout
            </button>
          </div>
          <div className="mt-5 ">
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
            <div className=" md:flex justify-center  overflow-x-auto px-5">
              <table className="bg-white  w-full  h-full  ">
                <thead className="bg-gray-100 ">
                  <tr>
                    <th className=" px-4 py-2 text-left ">Order Id</th>
                    <th className=" px-4 py-2 text-left ">Table</th>
                    <th className=" px-4 py-2 text-left ">Items</th>
                    <th className=" px-4 py-2 text-left ">Total Amount</th>
                    <th className=" px-4 py-2 text-left ">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filterOrder.map((o) => (
                    <tr key={o._id} className=" hover:bg-gray-50 transition">
                      <td className=" px-2 md:px-4 py-2">{o.orderId}</td>
                      <td className=" px-2 md:px-4 py-2">{o.tableNumber} </td>
                      <td className=" px-2 md:px-4 py-2">
                        {o.items.map((item, index) => (
                          <div key={index}>
                            {item.menuName} X {item.qty}
                          </div>
                        ))}
                      </td>
                      <td className=" px-2 md:px-4 py-2">
                        Rs. {o.totalAmount}
                      </td>
                      <td className=" px-2 md:px-4 py-2">
                        <select
                          name=""
                          id=""
                          value={o.status}
                          className="border border-gray-300 outline-none  p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          onChange={(e) =>
                            updateStatus(o._id, e.currentTarget.value)
                          }
                        >
                          <option value="preparing">Preparing</option>
                          <option value="cancelled">Cancel</option>
                          <option value="paid">Paid</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Order;

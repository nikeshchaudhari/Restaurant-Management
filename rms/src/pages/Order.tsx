import { useNavigate } from "react-router-dom";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage] = useState(10);

  const navigate = useNavigate();

  const dispatch:AppDispatch = useDispatch();
  const open = useSelector((state:RootState)=>state.menu.isOpen)

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

  // pagination

  const indexOfLastPage = currentPage*rowPage;
  const indexOfFirstPage = indexOfLastPage - rowPage;
  const currentList = filterOrder.slice(indexOfFirstPage,indexOfLastPage)
  const totalPage = Math.ceil(filterOrder.length/rowPage)
 
  console.log(totalPage);
  
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-screen bg-[#E9E9E9] min-h-screen  pt-5">
          <div className="flex justify-between mx-5  bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Orders</h1>
            <button
              className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300"
              onClick={logoutHandle}
            >
              Logout
            </button>
            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {open ? <X /> : <Menu/>}
            </span>
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
                    <th className=" px-4 py-2 text-left ">Price</th>
                    <th className=" px-4 py-2 text-left ">Total Amount</th>
                    <th className=" px-4 py-2 text-left ">Status</th>
                  </tr>
                </thead>

                <tbody>
                 {filterOrder.length === 0 ?(
                  <tr>
                    <td colSpan={5}
                        className="text-center p-5 text-[20px] font-bold">No Orders Found</td>
                  </tr>

                 ):(
                 
                     currentList.map((o) => (
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
                        {o.items.map((item, index) => (
                          <div key={index}>Rs. {item.price}</div>
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
                  ))
                 )}
                </tbody>
              </table>
            </div>
          </div>
          {/* pagination */}

           {filterOrder.length > 0  &&(
            <div className="flex gap-2 mt-1 mb-5  lg:mt-0 lg:mb-4 justify-center md:justify-end px-5 items-center ">
            <button disabled={currentPage === 1} className="px-2 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer" onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
            <span className=" py-2">{currentPage} ..... {totalPage}</span>
            <button disabled={currentPage===totalPage} className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer " onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
          </div>
           )}
        </section>
      </main>
    </>
  );
};

export default Order;

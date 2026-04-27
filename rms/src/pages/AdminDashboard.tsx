import { Link, useNavigate } from "react-router-dom";
// import adminLogo from "../assets/adminlogo.png"
import { useEffect, useState } from "react";
// import axios from "axios";
import Order from "./Order";
import AllMenu from "./ui/AllMenu";
// import { toast } from "react-toastify";
import Slide from "../components/Slide";
import { X, Menu } from "lucide-react";
import MobileDashboard from "../components/MobileDashboard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { menuOpen } from "../features/menuSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AdminDashboard = () => {
  interface OrderItems {
    menuId: string;
    menuName: string;
    price: number;
    qty: number;
    totalAmount: number;
  }
  interface Order {
    _id: number;
    orderId: string;
    items: OrderItems[];
    total: number;
    totalAmount: number;
    createdAt: string;
  }
  interface Token {
    _id: any;
    fullName: string;
    role: string;
  }
  interface Table {
    status: string;
  }
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  // const [sales, SetSales] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [fullName, SetFullName] = useState<string>("");
  const [order, setOrder] = useState<Order[]>([]);
  const [tableAvailable, setTableAvailable] = useState<Table[]>([]);
  const navigate = useNavigate();

  // fetch order

  useEffect(() => {
    try {
      const fetchOrder = async () => {
        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode<Token>(token);
          SetFullName(decode.fullName);
        }
        const res = await axios.get("http://localhost:3000/order/all-order");
        // console.log(res.data.allOrder);
        setOrder(res.data.allOrder);

        const tableFetch = await axios.get(
          "http://localhost:3000/table/all-table",
        );
        setTableAvailable(tableFetch.data.allData);
        // console.log(tableFetch.data.allData);
      };
      fetchOrder();
    } catch (err) {
      console.log("total order not fetch");
    }
  }, []);

  //
  const today = new Date().toISOString().split("T")[0];

  const todayOrder = order.filter(
    (sales) => new Date(sales.createdAt).toISOString().split("T")[0] === today,
  );
  const todaySales = todayOrder.reduce(
    (sum: number, o: any) => sum + Number(o.totalAmount),
    0,
  );

  // console.log(todaySales);

  // table filter

  const table = tableAvailable.filter((a: any) => a.status === "available");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // recent order
  const recentOrder = [...order].sort(
    (s, e) => new Date(e.createdAt).getTime() - new Date(s.createdAt).getTime(),
  );
 

  // update table

  const updateTable = async(id:any,status:any)=>{

  const token = localStorage.getItem("token");

  try{

  }catch(err){
    
  }

  }

  return (
    <>
      <main className="md:flex ">
        <MobileDashboard />

        <Slide />
        {/* Dashboard  */}
        <section className="w-screen h-screen bg-[#E9E9E9] overflow-x-auto">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-4 md:p-2 rounded-full items-center ">
            <h1 className="mx-2 md:text-[20px] font-bold">
              Welcome, {fullName}
            </h1>
            <Link to="/login" className="">
              {" "}
              <button
                className="rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300 hidden md:block"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
            <span className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {Open ? (
                <X className="text-2xl" />
              ) : (
                <Menu
                  className="text-2xl"
                  onClick={() => dispatch(menuOpen())}
                />
              )}
            </span>
          </div>
          <div className=" mx-10 mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white h-30 rounded-lg  flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition duration-300 ">
              <h1 className="font-medium">Today's Sales</h1>
              <h1 className="text-[#831F00]"> Rs. {todaySales}</h1>
            </div>
            <div className="bg-white h-30 rounded-lg  flex flex-col justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer">
              <h1 className="font-medium">Today's Orders</h1>
              <h2 className="text-[#831F00] ">{todayOrder.length}</h2>
            </div>
            <div className="bg-white h-30 rounded-lg flex flex-col justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer ">
              <h1 className="font-medium">Active Tables</h1>
              <h2 className="text-[#831F00] ">{table.length}</h2>
            </div>
            <div className="bg-white h-30 rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300 ">
              <h1 className="font-medium">Low Stock</h1>
            </div>
          </div>

          {/* recent order */}

          <div className=" md:flex justify-center  overflow-x-auto px-10">
            <div className="w-full mt-10">
              <h2 className="text-[20px] font-bold ">Recent Order</h2>

              <table
                className="bg-white  w-full  h-f
            ull mt-2 rounded-md "
              >
                <thead className=" bg-gray-100">
                  <tr>
                    <th className=" px-4 py-5 text-left ">Order Id</th>
                    <th className=" px-4 py-5 text-left ">Items</th>
                    <th className=" px-4 py-5 text-left ">Price</th>
                    <th className=" px-4 py-5 text-left ">Total Amount</th>
                    <th className=" px-4 py-5 text-left ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrder.slice(0, 10).map((o) => (
                    <tr key={o._id}  >
                      <td className=" px-2 md:px-4  py-2">{o.orderId}</td>
                      <td className=" px-2 md:px-4 py-2">
                        {o.items.map((item, index) => (
                          <div key={index}>
                            {item.menuName} X {item.qty}
                          </div>
                        ))}
                      </td>
                      <td className="px-4 md:px-4 py-3">
                        {o.items.map((item, index) => (
                          <div key={index}>Rs. {item.price}</div>
                        ))}
                      </td>
                      <td className="px-4 md:px-4 py-3">Rs. {o.totalAmount}</td>
                      <td className="px-4 md:px-4 py-3">
                        <select name="" id="" className="cursor-pointer border border-amber-100 rounded  px-5 py-2" >
                          <option value="pending" className="cursor-pointer border border-amber-100 rounded  px-5 py-2">Pending</option>
                          <option value="complete" className="cursor-pointer border border-amber-100 rounded  px-5 py-2">Complete</option>
                          <option value="paid" className="cursor-pointer border border-amber-100 rounded  px-5 py-2">Paid</option>
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

export default AdminDashboard;

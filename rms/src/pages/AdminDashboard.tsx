import { Link, useNavigate } from "react-router-dom";
// import adminLogo from "../assets/adminlogo.png"
import { useEffect, useState } from "react";
// import axios from "axios";
import AllMenu from './ui/AllMenu';
// import { toast } from "react-toastify";
import Slide from "../components/Slide";
import { X, Menu } from "lucide-react";
import MobileDashboard from "../components/MobileDashboard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { menuOpen } from "../features/menuSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface Order {
  _id: number;
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
const AdminDashboard = () => {
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
        // console.log(res.data.allOrder.length);
        setOrder(res.data.allOrder);

        const tableFetch = await axios.get("http://localhost:3000/table/all-table")
       setTableAvailable(tableFetch.data.allData)
       console.log(tableFetch.data.allData);
       
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

  const table = tableAvailable.filter((a:any)=>a.status === "available")
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

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
              <h1 className="text-[#831F00]">
                {" "}
                Rs. {todaySales}
              </h1>
            </div>
            <div className="bg-white h-30 rounded-lg  flex flex-col justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer">
              <h1 className="font-medium">Today's Orders</h1>
              <h2 className="text-[#831F00] ">
                {todayOrder.length}
              </h2>
            </div>
            <div className="bg-white h-30 rounded-lg flex flex-col justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer ">
              <h1 className="font-medium">Active Tables</h1>
              <h2 className="text-[#831F00] ">{table.length}</h2>
            </div>
            <div className="bg-white h-30 rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300 ">
              <h1 className="font-medium">Low Stock</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;

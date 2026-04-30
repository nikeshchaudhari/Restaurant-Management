import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Menu, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  RadialLinearScale,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  LineElement,
);

interface OrderItems {
  menuName: string;
  price: number;
  qty: number;
  totalAmount: number;
}

interface Order {
  orderId: string;
  items: OrderItems[];
  totalAmount: number;
  createdAt: string;
}

const Report = () => {
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/order/all-order").then((res) => {
      setOrder(res.data.allOrder);
    });
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.menu.isOpen);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // monthly income view

  const monthltIncome = new Array(12).fill(0);

  order.forEach((item) => {
    const date = new Date(item.createdAt);
    const monthData = date.getMonth();

    monthltIncome[monthData] = monthltIncome[monthData] + item.totalAmount;

    // console.log(monthData);
  });
  // console.log(monthltIncome[3]);

  const dataMonth = {
    labels: months,
    datasets: [
      {
        label: "Monthly Income",
        data: monthltIncome,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(54, 162, 235)",
        barPercentage: 1,
      },
    ],
  };

  // console.log(monthltIncome);

  const totalIncome = order.reduce(
    (sum: any, item) => sum + item.totalAmount,
    0,
  );
  // console.log(totalIncome);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000, // 2 sec
    },
  };
  // chart datapass

  const data = {
    labels: ["Incomes"],
    datasets: [
      {
        label: "Total Income",
        data: [totalIncome],
        backgroundColor: "green",

        barPercentage: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 0.8,
        to: 0.3,
        loop: false,
      },
    },
  };
  // count order items
  const productCount: Record<string, number> = {};
  console.log(productCount);

  order.forEach((o) => {
    o.items.forEach((element) => {
      // const total = element.qty * element.price;

      if (productCount[element.menuName]) {
        productCount[element.menuName] += element.qty;
      } else {
        productCount[element.menuName] = element.qty;
      }
    });
  });

  const label = Object.keys(productCount);
  const values = Object.values(productCount);

  const dataBestSell = {
    labels: label,
    datasets: [
      {
        label: "Best Selling Items",
        data: values,
        backgroundColor: [
          "red",
          "teal",
          "olive",
          "cyan",
          "indigo",
          "maroon",
          "yellow",
          "green",
          "blue",
          "black",
          "orange",
          "skyblue",
          "brown",
          "white",
          "gray",
          "pink",
          "magenta",
        ],
      },
    ],
  };

  //logout
  const navigate = useNavigate()
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <main className="flex">
        <MobileDashboard />
        <Slide />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen ">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Reports</h1>
            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300" onClick={handleLogout}>
              Logout
            </button>
            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {open ? <X /> : <Menu />}
            </span>
          </div>

          <div className="flex gap-4   py-10 md:px-10 px-5 overflow-hidden">
            <div className="w-1/2 h-100">
              <Bar data={data} options={options} />
            </div>

            <div className="w-1/2 h-100">
              <Bar data={dataMonth} options={options} />
            </div>
          </div>
          <div className="w-full flex gap-4 justify-center  py-10 md:px-10 px-5 overflow-hidden">
            <div className="w-full h-100 ">
              <Line data={dataBestSell} options={lineOptions} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Report;

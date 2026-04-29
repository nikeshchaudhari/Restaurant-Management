import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Menu, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const Report = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<any>(null)



    useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");

    chartInstance.current = new Chart(ctx!, {
      type: "bar",
      data: {
        labels: ["Total Income"],
        datasets: [
          {
            label: "Income (Rs)",
            data: [5000],
            backgroundColor: "green",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.menu.isOpen);

  const order = [
    { totalAmount: 500, status: "paid", createdAt: "2026-04-29" },
    { totalAmount: 300, status: "pending", createdAt: "2026-04-29" },
  ];

  const totalIncome = order.reduce((sum:any, items) => sum + items.totalAmount,0);
  console.log(totalIncome);
  
  return (
    <>
      <main className="flex">
        <MobileDashboard />
        <Slide />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen ">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Reports</h1>
            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
              Logout
            </button>
            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {open ? <X /> : <Menu />}
            </span>
          </div>

          <div style={{ width: "400px" }}>
             <canvas ref={chartRef}></canvas>
          </div>
        </section>
      </main>
    </>
  );
};

export default Report;

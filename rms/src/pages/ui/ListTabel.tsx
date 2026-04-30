import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import { ArrowRightCircleIcon, Table } from "lucide-react";
import axios from "axios";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../../features/menuSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setSelectedTable } from "../../features/TableSlice";
import CartUi from "./CartUi";
import OrderSlide from "../../components/OrderSlide";

interface Table {
  _id: string;
  tableNumber: string;
  capacity?: string;
  status: "available" | "unavailable";
}
const ListTabel = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selected, setSelected] = useState<Table | null>(null);
    const [search, setSearch] = useState("");
  const dispatch: AppDispatch = useDispatch();
  // const open = useSelector((state: RootState) => state.menu.isOpen);

  const navigate = useNavigate();

  // Table data fetch
  useEffect(() => {
    const fetchTable = async () => {
      const res = await axios.get("http://localhost:3000/table/all-table");
      setTables(res.data.allData);
      console.log(res.data.allData);
    };
    fetchTable();
  }, []);

  // selected Table
  const selectTable = (tables: Table) => {
    setSelected(tables);
  };

  // cartopen

  const handleMenu = () => {
    if (!selected) return;

    dispatch(setSelectedTable(selected));
    navigate("/food-order/all-menu");
  };

  const[parms]= useSearchParams()

  const querySearch = parms.get("search") || ""
  console.log(querySearch);
  
  

  return (
    <>
      <main>
        <Navbar/>
        <div className="md:flex  ">
          <div className="hidden md:block  ">
            <UiSlider />
          </div>

          <section className="px-5 w-full">
            <div>
              <h2 className=" py-5  lg:text-[22px] font-['poppins'] font-semibold">
                Step 1: Select Table
              </h2>
              <div className="w-full bg-white border border-amber-500/20 rounded-2xl h-full flex items-center justify-center md:justify-start p-2 md:p-5 gap-4 mb-5">
                <div className="bg-amber-500 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className=" text-[12px] md:text-[16px]">Available</h2>
                </div>
                {/* <div className="bg-red-400 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="text-[12px] md:text-[18px]">Reserved</h2>
                </div> */}
                <div className="bg-amber-500/40 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="text-[12px] md:text-[16px]">Unavailable</h2>
                </div>
                <div className="bg-[#360404] px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="text-[12px] md:text-[16px]">Selected</h2>
                </div>
              </div>
            </div>

            {/* all tables */}

            <div className="w-full h-[50vh] rounded-4xl border border-amber-100 shadow-2xl relative ">
              <h2 className="text-[18px] pl-10 pt-5 font-semibold font-['poppins']">
                Tables
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-5 p-5 justify-items-center 0">
                {tables.map((t: any) => (
                  <button
                    disabled={t.status === "unavailable"}
                    onClick={() => selectTable(t)}
                    key={t._id}
                    className={`px-4 py-2 md:px-8 md:py-5 lg:px-10 lg:py-5  rounded  text-white font-['poppins'] text-[14px] ${
                      selected?._id === t._id
                        ? "bg-[#360404] scale-105 shadow-lg"
                        : t.status === "unavailable"
                          ? "bg-amber-500/40 cursor-not-allowed"
                          : "hover:bg-[#360404]  bg-amber-500 cursor-pointer transition duration-300 transform hove:scale-3d"
                    }`}
                  >
                    {t.tableNumber}
                  </button>
                ))}
              </div>
              {selected && (
                <div
                  className="absolute bottom-5 right-10  hover:bg-gray-200 p-1 rounded-full cursor-pointer transform hover:translate-x-1.5 transition duration-300 "
                  onClick={handleMenu}
                >
                  <ArrowRightCircleIcon className="text-amber-500" size={40} />
                </div>
              )}
            </div>
            <CartUi/>
          </section>
        </div>
        <OrderSlide/> 
      </main>
    </>
  );
};

export default ListTabel;

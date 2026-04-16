import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import { ArrowRightCircleIcon, Table } from "lucide-react";
import axios from "axios";

interface Table {
  _id: string;
  tableNumber: string;
  capacity?: string;
  status: "available" | "unavailable";
}
const ListTabel = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTable = async () => {
      const res = await axios.get("http://localhost:3000/table/all-table");
      setTables(res.data.allData);
      console.log(res.data.allData);
    };
    fetchTable();
  }, []);

  const handleTable = (table: any) => {
    setSelectedTable(table);
    console.log("table", setSelectedTable(table));
  };
  return (
    <>
      <main>
        <Navbar />
        <div className="md:flex ">
          <UiSlider />

          <section className="px-5 w-full">
            <div>
              <h2 className=" py-5  lg:text-[22px] font-['poppins'] font-semibold">
                Step 1: Select Table
              </h2>
              <div className="w-full bg-white border border-amber-500/20 rounded-2xl h-full flex items-center justify-center md:justify-start p-2 md:p-5 gap-4 mb-5">
                <div className="bg-amber-500 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className=" text-[12px] md:text-[18px]">Available</h2>
                </div>
                <div className="bg-red-400 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="text-[12px] md:text-[18px]">Reserved</h2>
                </div>
                <div className="bg-amber-500/40 px-2 py-1 md:px-5 md:py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="text-[12px] md:text-[18px]">Unavailable</h2>
                </div>
                {/* <div className="bg-black/40 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="">Selected</h2>
                </div> */}
              </div>
            </div>

            {/* all tables */}

            <div className="w-full h-[50vh] rounded-4xl border border-amber-100 shadow-2xl relative ">
              <h2 className="text-[18px] pl-10 pt-5 font-semibold font-['poppins']">
                Tables
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-5 p-5 justify-items-center 0">
                {tables.map((t: any) => (
                  <button
                    disabled={t.status === "unavailable"}
                    key={t._id}
                    className={`px-4 py-2 md:px-8 md:py-5 lg:px-10 lg:py-5  rounded  text-white font-['poppins'] ${
                      t.status === "unavailable"
                        ? "bg-amber-500/40 cursor-not-allowed"
                        : "hover:bg-[#360404]  bg-amber-500 cursor-pointer transition duration-300 transform hove:scale-3d"
                    }`}
                  >
                    {t.tableNumber}
                  </button>
                ))}
              </div>
              <div className="absolute bottom-5 right-10  hover:bg-gray-200 p-1 rounded-full cursor-pointer transform hover:translate-x-1.5 transition duration-300 ">
                <ArrowRightCircleIcon className="text-amber-500" size={40} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ListTabel;

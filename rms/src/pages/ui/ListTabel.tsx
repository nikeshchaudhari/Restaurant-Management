import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import { Table } from "lucide-react";
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
              <h2 className=" py-5  text-[22px] font-['poppins'] font-semibold">
                Step 1: Select Table
              </h2>
              <div className="w-full bg-white border border-amber-500/20 rounded-2xl h-full flex items-center p-5 gap-4 mb-5">
                <div className="bg-amber-500 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="">Available</h2>
                </div>
                <div className="bg-red-400 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="">Reserved</h2>
                </div>
                <div className="bg-amber-500/40 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="">Unavailable</h2>
                </div>
                {/* <div className="bg-black/40 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300 font-['poppins']">
                  <h2 className="">Selected</h2>
                </div> */}
              </div>
            </div>

            {/* all tables */}

            <div className="w-full h-[50vh] rounded-4xl border border-amber-100 shadow-2xl ">
              <div className="grid grid-cols-10 gap-5 p-5 justify-items-center">
                {tables.map((t: any) => (
                  <button
                    disabled={t.status === "unavailable"}
                    key={t._id}
                    className={`px-10 py-5  rounded  text-white font-['poppins'] ${
                      t.status === "unavailable"
                        ? "bg-amber-500/40 cursor-not-allowed"
                        : "hover:bg-gray-200 bg-amber-500 cursor-pointer"
                    }`}
                  >
                    {t.tableNumber}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ListTabel;

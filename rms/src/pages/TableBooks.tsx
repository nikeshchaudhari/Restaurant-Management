import { Link } from "react-router-dom";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, Trash2 } from "lucide-react";
import {  X } from "lucide-react";

import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
const TableBooks = () => {
  interface tableData {
    _id: any;
    tableNumber: string;
    capacity: string;
    status: string;
  }
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);
  const [table, setTable] = useState<tableData[]>([]);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [editTable, setEditTable] = useState<tableData | null>(null);

  // post data
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    try {
      const token = localStorage.getItem("token") 
      console.log(token);
      
      if (editTable) {
        const updateTable = await axios.put(
          `http://localhost:3000/tables/${editTable._id}`,
          {
            tableNumber,
            capacity,
            status,
          },
        );
        toast.success("Table update Sucessfully!!");
        setTable((prev) =>
          prev.map((t) => (t._id === editTable._id ? updateTable.data : t)),
        );
      } else {


        const postData = await axios.post("http://localhost:3000/table/add-table", {
          tableNumber,
          capacity,
          status,
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        toast.success("Table Added Sucessfully!");
        setTable((prev) => [postData.data.addData, ...prev]);
      }
    } catch (err) {
      console.log(err);
    }
    setTableNumber("");
    setCapacity("");
    setStatus("");
    setEditTable(null);
  };

  // fetch Data
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get("http://localhost:3000/table/all-table");
        setTable(res.data.allData.reverse());
        console.log(res.data.allData);
      } catch (err) {
        console.log(err);
      }
    };    
    dataFetch();
  }, []);

  // delete table

  const deleteTable = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/tables/${id}`);
      toast.success("Table deleted");
      setTable((prevTable) => prevTable.filter((table) => table._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <main className="flex">
        <MobileDashboard />
        <Slide />

        <section className="w-screen  bg-[#E9E9E9] min-h-screen ">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Tables</h1>
            <Link to="/login">
              {" "}
              <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
                Logout
              </button>
            </Link>

            <span className="md:hidden" onClick={()=>dispatch(menuOpen())}>{Open ? <X /> : <Menu />}</span>
          </div>
          {/* UserAdd  */}
          <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form
              onSubmit={handleForm}
              className="bg-white w-full md:w-full md:mx-5 h-full mt-5 rounded-md p-5"
            >
              <h1 className="text-2xl font-medium mb-3">
                {editTable ? "Edit Table" : "Add Tables"}
              </h1>
              <input
                type="text"
                placeholder="Table Name / Number"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                name="tablenumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Capacity (No of Seats) "
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                name="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />

              <select
                name=""
                id=""
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">--SELECT STATUS--</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="occupied">Occupied</option>
              </select>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  {editTable ? "Update Table" : "Add Table"}
                </button>
              </div>
            </form>
          </div>
          {/* viewData */}
          <div className=" md:flex justify-center overflow-x-auto p-5">
            <table className="bg-white  w-full h-full mt-5 rounded-md ">
              <thead className="bg-gray-100  ">
                <tr>
                  <th className=" px-4 py-2 text-left">Table Number</th>
                  <th className=" px-4 py-2 text-left">Capacity</th>
                  <th className=" px-4 py-2 text-left">Status</th>
                  <th className=" px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              {/*  */}
              <tbody>
                {table.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center p-5 text-[20px] font-bold"
                    >
                      Data Not Founds
                    </td>
                  </tr>
                ) : (
                  table.map((items, index) => (
                    <tr key={index} className="hover:bg-gray-400/10">
                      <td className=" px-2 md:px-4  py-2">
                        {items.tableNumber}
                      </td>
                      <td className=" px-2 md:px-4  py-2">{items.capacity}</td>
                      <td className=" px-2 md:px-4  py-2">{items.status}</td>
                      <td className="flex gap-5 justify-start items-center px-2 md:px-4 py-2 text-[20px] ">
                        <div className="relative  group">
                          <SquarePen
                            className="text-[#080833] cursor-pointer transform hover:-translate-y-0.5 duration-300"
                            onClick={() => {
                              setEditTable(items);
                              setTableNumber(items.tableNumber || "");
                              setCapacity(items.capacity);
                              setStatus(items.status);
                            }}
                          />
                          <span
                            className="absolute bottom-full left-1/2 hidden group-hover:block bg-black text-white text-sm mb-2 rounded px-2 py-1 whitespace-nowrap 
                        "
                          >
                            Edit
                          </span>
                        </div>
                        <div className="relative group">
                          <Trash2
                            className="text-black cursor-pointer transform hover:-translate-y-0.5 duration-300"
                            onClick={() => deleteTable(items._id)}
                          />
                          <span className="absolute left-1/2 bottom-full bg-red-600 text-white text-sm rounded px-2 py-1 mb-2 hidden group-hover:block">
                            Delete
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default TableBooks;

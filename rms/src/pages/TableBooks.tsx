import { useNavigate } from "react-router-dom";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, Trash2 } from "lucide-react";
import { X } from "lucide-react";

import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import { useFormik } from "formik";
import { TableValid } from "../schemas/TableSchema";

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

  const [editTable, setEditTable] = useState<tableData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage, setRowPage] = useState(10);

  const [showDelete, setShowDelete] = useState(false);
  const[seletecedTable,setSelectedTable]= useState<string | null>(null)
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues
  } = useFormik({
    initialValues: {
      tableNumber: "",
      capacity: "",
      status: "",
    },
    validationSchema: TableValid,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);

        if (editTable) {
          const updateTable = await axios.put(
            `http://localhost:3000/table/${editTable._id}`,
           values
          );
          toast.success("Table update Sucessfully!!");
          setTable((prev) =>
            prev.map((t) =>
              t._id === editTable._id ? updateTable.data.updateData : t,
            )
            
            
          );
          setEditTable(null);
        } else {
          const postData = await axios.post(
            "http://localhost:3000/table/add-table",
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          resetForm();
          toast.success("Table Added Sucessfully!");
          setTable((prev) => [postData.data.addData, ...prev]);
        }
      } catch (err: any) {
        const res = err?.response?.data;

        if (res.type === "Duplicate") {
          toast.error(res.message);
        } else {
          toast.error("Something went wrong");
        }
        console.log(err);
      }
    },
  });

  const handleEdit =(table:tableData)=>{
    setEditTable(table)

    setValues({
      tableNumber:table.tableNumber,
      capacity:table.capacity,
      status:table.status
    })


  }


  // fetch Data
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get("http://localhost:3000/table/all-table");
        setTable(res.data.allData.reverse());
        // console.log(res.data.allData);
      } catch (err) {
        console.log(err);
      }
    };
    dataFetch();
  }, []);

  // delete table

  const deleteTable = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/table/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Table Sucessfully deleted");
      setTable((prevTable) => prevTable.filter((table) => table._id !== id));
      setShowDelete(false)
    } catch (err) {
      console.log(err);
    }
  };

  // logout

  const logoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // pagination

  const indexOfLastPage = currentPage * rowPage;
  const indexOfFirstPage = indexOfLastPage - rowPage;
  const currentList = table.slice(indexOfFirstPage, indexOfLastPage);
  const totalPage = Math.ceil(table.length / rowPage);
  console.log(totalPage);

  return (
    <>
      <main className="flex">
        {showDelete && (
          <div className="bg-black/50 fixed  inset-0 border w-full h-full rounded  top-0 z-10 flex justify-center items-center ">
            <div className="bg-white w-[90vw] md:w-120  h-50 rounded">
              <h1 className="text-center pt-8 mb-2 text-[20px] md:text-[30px] font-bold">
                Delete Confirmation
              </h1>
              <p className="text-center">
                Are You sure you want to delete user
              </p>
              <div className="flex justify-center gap-10 py-5">
                <button
                  className="bg-black/20 py-2 px-4 rounded-3xl cursor-pointer hover:bg-black/40 "
                  onClick={() => setShowDelete(false)}
                >
                  Cancel
                </button>
                <button className="bg-red-600 py-2 px-6 rounded-3xl text-white hover:bg-red-700 cursor-pointer " onClick={()=>deleteTable(seletecedTable)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <MobileDashboard />
        <Slide />

        <section className="w-screen  bg-[#E9E9E9] min-h-screen ">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Tables</h1>

            <button
              className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300"
              onClick={logoutHandle}
            >
              Logout
            </button>

            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {Open ? <X /> : <Menu />}
            </span>
          </div>
          {/* UserAdd  */}
          <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full md:w-full md:mx-5 h-full mt-5 rounded-md p-5"
            >
              <h1 className="text-2xl font-medium mb-3">
                {editTable ? "Edit Table" : "Add Tables"}
              </h1>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Table Name / Number"
                  className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500 "
                  name="tableNumber"
                  value={values.tableNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.tableNumber && errors.tableNumber && (
                  <p className="text-sm text-red-500">{errors.tableNumber}</p>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Capacity (No of Seats) "
                  className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500"
                  name="capacity"
                  value={values.capacity}
                  onChange={handleChange}
                />
                {touched.capacity && errors.capacity && (
                  <p className="text-sm text-red-500">{errors.capacity}</p>
                )}
              </div>
              <div className="mb-3">
                <select
                  name="status"
                  id=""
                  className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="">--SELECT STATUS--</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  {/* <option value="occupied">Occupied</option> */}
                </select>
                {touched.status && errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
                )}
              </div>
              <div className="w-full flex ">
                <button
                  type="submit"
                  className=" bg-[#080833] px-6 py-2  rounded text-white  cursor-pointer transition hover:bg-[#232341] duration-300 mr-4"
                >
                  {editTable ? "Update Table" : "Add Table"}
                </button>

                {editTable && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditTable(null);
                      resetForm();
                      toast.info("Table Cancel");
                    }}
                    className=" bg-[#080833] px-6 py-2  rounded text-white  cursor-pointer transition hover:bg-[#232341] duration-300"
                  >
                    Cancel
                  </button>
                )}
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
                     Not Table  Founds
                    </td>
                  </tr>
                ) : (
                  currentList.map((items, index) => (
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
                              handleEdit(items)
                              
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
                            onClick={() => {
                            
                              
                                setSelectedTable(items._id);
                                setShowDelete(true);
                            }}
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
          {/* pagination */}
        {
          table.length > 0 &&(
              <div className="flex gap-2 mt-1 mb-5  lg:mt-0 lg:mb-4 justify-center md:justify-end px-5 items-center ">
            <button
              disabled={currentPage === 1}
              className="px-2 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage} ..... {totalPage}
            </span>
            <button
              disabled={currentPage === totalPage}
              className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer "
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
          )
        }
        </section>
      </main>
    </>
  );
};

export default TableBooks;

import { useDispatch, useSelector } from "react-redux";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { MenuIcon, X } from "lucide-react";
import { menuOpen } from "../features/menuSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

import { SquarePen } from "lucide-react";
interface menuAdd {
  _id: any;
  menuName: string;
  price: string;
  category: string;
  available: string;
  photo?: string;
}
const Menu = () => {
  const [menuName, setMenuName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [available, setAvailable] = useState<string>("available");
  const [photo, setPhoto] = useState<File | null>(null);
  const [editMenu, setEditMenu] = useState<menuAdd | null>(null);
  const [menu, setMenu] = useState<menuAdd[]>([]);

  // state
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  // reset file

  const resetFile = useRef<HTMLInputElement>(null)

  // form handle
  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // FormData
      const formData = new FormData();
      formData.append("menuName", menuName);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("available", available);

      if (photo) {
        formData.append("photo", photo);
      }

      if (editMenu) {
        // UPDATE MENU
        const res = await axios.put(
          `http://localhost:3000/menu/${editMenu._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Update", res.data);

        const updateItem = res.data.menu || res.data.updateData|| res.data;

        toast.success("Menu Updated Successfully");

        setMenu((prev) =>
          prev.map((m) => (m._id === editMenu._id ? updateItem: m)),
        );
        console.log("Before:", menu);
        setEditMenu(null);
      } else {
        // ADD MENU
        const res = await axios.post(
          "http://localhost:3000/menu/add-menu",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success("Menu Add Successfully");

        setMenu((prev) => [res.data.menu, ...prev]);
      }

      // Clear form
      setMenuName("");
      setPrice("");
      setCategory("");
      setAvailable("");
      setPhoto(null);


      if(resetFile.current){
        resetFile.current.value="";
      }
    } catch (err: any) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  // fetch Data

  useEffect(() => {
    const dataFect = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu/all-menu");
        setMenu(res.data.allMenu.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    dataFect();
  }, []);

  // delete menu

  const deleteMenu = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }
      await axios.delete(`http://localhost:3000/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("delete menu");

      setMenu((prevMenu) => prevMenu.filter((menus) => menus._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-full  bg-[#E9E9E9] min-h-screen  ">
          <div className="flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">
              {editMenu ? "Edit Menu" : "Menu"}
            </h1>
            <Link to="/login">
              {" "}
              <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
                Logout
              </button>
            </Link>
            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {Open ? <X /> : <MenuIcon />}
            </span>
          </div>

          {/* Add Menu Form */}
          <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form
              onSubmit={formHandle}
              className="bg-white w-full md:w-250 h-full mt-5 rounded-md p-5"
            >
              <h1 className="text-2xl font-medium mb-3">
                {editMenu ? "Update Menu" : "Menu"}
              </h1>
              <input
                type="text"
                placeholder="Enter Menu Name"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Price"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Category"
                className="border border-gray-300 outline-none w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className="flex gap-2 mb-3 ">
                <label htmlFor="">
                  <input
                    type="radio"
                    name="available"
                    className="cursor-pointer"
                    value="available"
                    checked={available === "available"}
                    onChange={(e) => setAvailable(e.target.value)}
                  />
                </label>
                Available
                <label htmlFor="">
                  <input
                    type="radio"
                    name="no available"
                    value="no available"
                    checked={available === "no available"}
                    onChange={(e) => setAvailable(e.target.value)}
                    className="cursor-pointer"
                  />
                </label>
                No Available
              </div>

              <input
                type="file"
                className="border border-gray-300 outline-none cursor-pointer  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "

                ref={resetFile}
                onChange={(e) => {
                  if (e.target.files) setPhoto(e.target.files[0]);
                }}
              />
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  {editMenu ? "Update Menu" : "Add Menu"}
                </button>
              </div>
            </form>
          </div>

          {/* View All Menu */}
          <div className=" md:flex justify-center  overflow-x-auto p-5">
            <table className="bg-white min-w-50 w-full md:w-250 h-full mt-5 rounded-md ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th className=" px-4 py-2 text-left ">No</th>
                  <th className=" px-4 py-2 text-left ">Menu_Name</th>
                  <th className=" px-4 py-2 text-left ">Category</th>
                  <th className=" px-4 py-2 text-left ">Price</th>
                  <th className=" px-4 py-2 text-left ">Photo</th>
                  <th className=" px-4 py-2 text-left ">Action</th>
                </tr>
              </thead>
              {/* table body */}
              <tbody>
                {menu.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center p-5 text-[20px] font-bold"
                    >
                      Data Not Found
                    </td>
                  </tr>
                ) : (
                  menu.map((m, i) => (
                    <tr key={i}>
                      <td className=" px-2 md:px-4 py-2">{menu.length - i}</td>
                      <td className=" px-2 md:px-4 py-2">{m.menuName}</td>
                      <td className=" px-2 md:px-4 py-2">{m.category}</td>
                      <td className=" px-2 md:px-4 py-2">{m.price}</td>
                      <td className=" px-2 md:px-4 py-2">
                        <a href={m.imageUrl} target="_blank" className="text-blue-600 underline" >View Photo</a>
                      </td>
                      <td className="flex gap-5 justify-start items-center px-2 md:px-4 py-2 text-[20px] ">
                        <div className="relative  group">
                          <SquarePen
                            className="text-black cursor-pointer transform hover:-translate-y-0.5 duration-300"
                            onClick={() => {
                              setEditMenu(m);
                              setMenuName(m.menuName);
                              console.log(m.menuName);

                              setCategory(m.category);
                              setAvailable(m.available);
                              setPrice(m.price);
                              setPhoto(null)
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
                            onClick={() => deleteMenu(m._id)}
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

export default Menu;

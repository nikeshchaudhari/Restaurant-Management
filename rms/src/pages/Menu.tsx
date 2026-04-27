import { useDispatch, useSelector } from "react-redux";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { MenuIcon, X } from "lucide-react";
import { menuOpen } from "../features/menuSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

import { SquarePen } from "lucide-react";
import { useFormik } from "formik";
import { MenuValid } from "../schemas/MenuItemsSchema";

interface menuAdd {
  imageUrl: string | undefined;
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

  const navigate = useNavigate();

  // state
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  // reset file

  const resetFile = useRef<HTMLInputElement>(null);

  const {
    values,
    errors,
    resetForm,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      menuName: "",
      price: "",
      category: "",
      available: "",
      photo: null,
    },
    validationSchema: MenuValid,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const token = localStorage.getItem("token");

        // FormData
        const formData = new FormData();
        formData.append("menuName", values.menuName);
        formData.append("price", values.price);
        formData.append("category", values.category);
        formData.append("available", values.available);

        if (values.photo) {
          formData.append("photo", values.photo);
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

          const updateItem = res.data.menu || res.data.updateData || res.data;

          toast.success("Menu Updated Successfully");

          setMenu((prev) =>
            prev.map((m) => (m._id === editMenu._id ? updateItem : m)),
          );
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

        resetForm();

        if (resetFile.current) {
          resetFile.current.value = "";
        }
      } catch (err: any) {
        toast.error("Something went wrong");
        console.log(err);
      }
    },
  });

  // handle edit

  const handleEdit =(menu:any)=>{
    setEditMenu(menu);
    setValues({
      menuName:menu.menuName,
      price:menu.price,
      category:menu.category,
      available:menu.available,
      photo:menu.photo
    })
  }
  // form handle
  // const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  // };

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

  // logout

  const logoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-screen bg-[#E9E9E9] min-h-screen  ">
          <div className="flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">
              {editMenu ? "Edit Menu" : "Menu"}
            </h1>

            <button
              className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300"
              onClick={logoutHandle}
            >
              Logout
            </button>

            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {Open ? <X /> : <MenuIcon />}
            </span>
          </div>

          {/* Add Menu Form */}
          <div className="max-w-full flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full md:w-full h-full md:mx-5 mt-5 rounded-md p-5"
            >
              <h1 className="text-2xl font-medium mb-3">
                {editMenu ? "Update Menu" : "Menu"}
              </h1>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Menu Name"
                  className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500 "
                  name="menuName"
                  value={values.menuName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.menuName && errors.menuName && (
                  <p className="text-sm text-red-500">{errors.menuName} *</p>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Price"
                  className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500 "
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.price && errors.price && (
                  <p className="text-sm text-red-500">{errors.price} *</p>
                )}
              </div>

              <div className="mb-3 ">
                <input
                  type="text"
                  placeholder="Enter Category"
                  className="border border-gray-300 outline-none w-full p-2  rounded focus:ring-1 focus:ring-blue-500 "
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.category && errors.category && (
                  <p className="text-sm text-red-500">{errors.category} *</p>
                )}
              </div>
             <div className=" mb-3">
               <div className="flex gap-2 ">
                <label htmlFor="">
                  <input
                    type="radio"
                    name="available"
                    className="cursor-pointer"
                    value="available"
                    checked={values.available === "available"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                Available
                <label htmlFor="">
                  <input
                    type="radio"
                    name="available"
                    value="no available"
                    checked={values.available === "no available"}
                    className="cursor-pointer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                No Available
              </div>
              {touched.available && errors.available && (
                <p className="text-sm text-red-500  ">{errors.available} *</p>
              )}

             </div>
              <div className="mb-3">
                <input
                type="file"
                className="border border-gray-300 outline-none cursor-pointer  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500 bg-[#e7e6e6]"
                ref={resetFile}
                name="photo"
                accept="image/*"
                onChange={(e) => {
                setFieldValue("photo",e.currentTarget.files?.[0]);
                }}
                onBlur={handleBlur}
              />
               {touched.photo && errors.photo && (
                <p className="text-sm text-red-500  mb-3">{errors.photo} *</p>
              )}
              </div>
              <div className="w-full flex ">
                <button
                  type="submit"
                  className=" bg-[#080833] px-6 py-2 rounded text-white cursor-pointer transition hover:bg-[#232341] duration-300 mr-4"
                >
                  {editMenu ? "Update Menu" : "Add Menu"}
                </button>

                {editMenu && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditMenu(null);
                      resetForm()
                      toast.info("Menu Cancel");
                    }}
                    className=" bg-[#080833] px-6 py-2 rounded text-white cursor-pointer transition hover:bg-[#232341] duration-300 "
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* View All Menu */}
          <div className=" md:flex justify-center  overflow-x-auto p-5">
            <table className="bg-white min-w-50 w-full md:w-full h-full mt-5 rounded-md ">
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
                      colSpan={6}
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
                      <td className=" px-2 md:px-4 py-2">Rs. {m.price}</td>
                      <td className=" px-2 md:px-4 py-2">
                        <a
                          href={m.imageUrl}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          View Photo
                        </a>
                      </td>
                      <td className="flex gap-5 justify-start items-center px-2 md:px-4 py-2 text-[20px] ">
                        <div className="relative  group">
                          <SquarePen
                            className="text-black cursor-pointer transform hover:-translate-y-0.5 duration-300"
                            onClick={() => {
                              setEditMenu(m);
                              handleEdit(m)
                              


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

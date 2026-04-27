import React, { useEffect, useState } from "react";
import Slide from "../components/Slide";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MobileDashboard from "../components/MobileDashboard";

import { Menu, Trash2, X } from "lucide-react";

import { SquarePen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { menuOpen } from "../features/menuSlice";
import { useFormik } from "formik";
import { User } from "../schemas/UserSchema";

interface User {
  _id: any;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const UserAdd = () => {
  
  const [users, setUser] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage, setRowPage] = useState(5);

  const navigate = useNavigate();


  // validation

  const {
    values,
    errors,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: "waiter",
    },
    validationSchema: User,
    onSubmit: async (values) => {
      console.log("values", values);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          return;
        }
        if (editUser) {
          const token = localStorage.getItem("token");
          // console.log(token);

          const res = await axios.put(
            `http://localhost:3000/user/${editUser._id}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          toast.success("User Update Sucessfully....");

          setUser((prev) =>
            prev.map((u) =>
              u._id === editUser._id ? res.data.updateData || res.data : u,
            ),
          );

          setEditUser(null);
        } else {
          const token = localStorage.getItem("token");
          if (!token) {
            toast.error("Please login first");
            return;
          }
          const res = await axios.post(
            "http://localhost:3000/user/add-user",
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );
          console.log(res.data);

          toast.success("User Add Sucessfully...");
          setUser((prev) => [res.data.AddData, ...prev]);
          setShowDelete(false);
        }

        resetForm();
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          toast.error(err.response.data.msg || "Email already exists");
        } else {
          toast.error("Something went wrong");
          console.log(err);
        }
      }
    },
  });

  const handleEdit = (user: User) => {
    setEditUser(user);

    setValues({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
    });
  };


  // dataFetch

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/all-user");

        setUser(res.data.reverse());
      } catch (err) {
        // toast.error("Data error...");
      }
    };
    dataFetch();
  }, []);

  // delete data

  const deleteUser = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }
      await axios.delete(`http://localhost:3000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");

      setUser((prevUser) => prevUser.filter((users) => users._id !== id));
      setShowDelete(false);
      setSelectedUserId(null);
    } catch (err) {
      console.log(err);
    }
  };

  // state management

  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  // logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const indexOfLastPage = currentPage * rowPage;
  const indextOfFirstPage = indexOfLastPage - rowPage;
  const currentItems = users.slice(indextOfFirstPage, indexOfLastPage);
  const totalPage = Math.ceil(users.length / rowPage);
  
  // scroll off
  useEffect(() => {
    if (showDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDelete]);

  const totalItems = users.length;
  // console.log(totalItems);

  return (
    <>
      <main className="flex relative">
        {showDelete && (
          <div className="bg-black/50 fixed  inset-0 border w-full h-full rounded  top-0 z-10 flex justify-center items-center ">
            <div className="bg-white w-100 md:w-120  h-50 rounded">
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
                <button
                  className="bg-red-600 py-2 px-6 rounded-3xl text-white hover:bg-red-700 cursor-pointer "
                  onClick={() => deleteUser(selectedUserId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <MobileDashboard />
        <Slide />
        {/* Dashboard  */}

        <section className="w-screen  bg-[#E9E9E9] min-h-screen ">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">
              {editUser ? "EditUser" : "Users"}
            </h1>

            <button
              className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>

            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {Open ? <X /> : <Menu />}
            </span>
          </div>
          <div>
            {/*    */}

            {/* UserAdd  */}
            <div className="max-w-full flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
              <form
                onSubmit={handleSubmit}
                className="bg-white w-full md:w-full md:mx-5 h-full mt-5 rounded-md p-5"
              >
                <h1 className="text-2xl font-medium mb-3">
                  {editUser ? " Update Users" : "Add Users"}
                </h1>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500 "
                    name="fullName"
                    autoComplete="off"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName} *</p>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500"
                    name="email"
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-500">{errors.email} *</p>
                  )}
                </div>
                <div className="relative mb-3">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="border border-gray-300 outline-none  w-full p-2  rounded  focus:ring-1 focus:ring-blue-500"
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <p className="text-sm text-red-500">{errors.password} *</p>
                  )}
                </div>

                <div className="mb-3 ">
                  <select
                    name="role"
                    id=""
                    className="border border-gray-300 outline-none  w-full p-2  rounded focus:ring-1 focus:ring-blue-500"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">--SELECT ROLE--</option>
                    <option value="admin">Admin</option>
                    <option value="waiter">Waiter</option>
                  </select>
                  {touched.role && errors.role && (
                    <p className="text-sm text-red-500">{errors.role} *</p>
                  )}
                </div>
                <div className="w-full ">
                  <button
                    type="submit"
                    className=" bg-[#080833] px-6 py-2 rounded text-white  cursor-pointer transition hover:bg-[#232341] duration-300 mr-5"
                  >
                    {editUser ? "Update User" : "Add User"}
                  </button>

                  {editUser && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditUser(null);
                        resetForm();

                        toast.info("Edit Cancel");
                      }}
                      className=" bg-[#080833] px-6 py-2  rounded text-white  cursor-pointer transition hover:bg-[#232341] duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Data View */}
            <div className=" md:flex justify-center  overflow-x-auto p-5">
              <table className="bg-white  w-full  h-full mt-5 rounded-md ">
                <thead className="bg-gray-100 ">
                  <tr>
                    <th className=" px-4 py-2 text-left ">No.</th>
                    <th className=" px-4 py-2 text-left">Name</th>
                    <th className=" px-4 py-2 text-left">Role</th>
                    <th className=" px-4 py-2 text-left">Username</th>
                    <th className=" px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-5 text-[20px] font-bold"
                      >
                        No Users Found
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-400/10">
                        <td className=" px-2 md:px-4  py-2">
                          {/* {users.length - index} */}
                          {totalItems - ((currentPage - 1) * rowPage + index)}
                        </td>
                        <td className=" px-2 md:px-4 py-2">{user?.fullName}</td>
                        <td className="px-2 md:px-4 py-2">{user?.email}</td>
                        <td className="px-2 md:px-4 py-2">{user?.role}</td>
                        <td className="flex gap-5 justify-start items-center px-2 md:px-4 py-2 text-[20px] ">
                          <div className="relative  group">
                            <SquarePen
                              className="text-[#080833] cursor-pointer transform hover:-translate-y-0.5 duration-300  "
                              onClick={() => {
                                setEditUser(user);
                                handleEdit(user);
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
                                setSelectedUserId(user._id);
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
          </div>
          {/* PAGINATION */}
          <div className="flex gap-2 mt-1 mb-5   lg:mt-0 lg:mb-4 justify-center ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="cursor-j "
            >
              Prev
            </button>

            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? "bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserAdd;

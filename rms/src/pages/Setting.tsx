import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Menu, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface UserData {
  _id: any;
  fullName: String;
  email: String;
  password?: String;
  photo?: String;
}
const Setting = () => {
  const [photo, SetPhoto] = useState<File | null>(null);
  const [update, setUpdate] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);
  console.log(photo);

  //   form Handle

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    image: "",
  });
  console.log(formData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpdate(res.data.profile);

      setFormData({
        fullName: res.data.profile.fullName || "",
        email: res.data.profile.email || "",
        password: "",
        image: res.data.profile.imageUrl,
      });
    };
    fetchData();
  }, []);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (photo) {
        data.append("photo", photo);
      }

      if (!update?._id) {
        toast.error("User ID not found");
        return;
      }
      await axios.put(`http://localhost:3000/user/${update?._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (err: any) {
      if (err.response.data) {
        toast.error(err.response.data.msg || "Update Failed");
      } else {
        toast.error("Error");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("Image");
    navigate("/login");
  };

  return (
    <>
     <Helmet>
          <title>Endcodes Nepal Restaurant | Setting Dashboard</title>
          <meta name="description" content="Best food ordering system" />
        </Helmet>
      <main className="flex">
        <MobileDashboard />
        <Slide />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Setting</h1>

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

          {/* form */}
          <div className="max-w-full flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form
              onSubmit={handleForm}
              className="bg-white w-full md:w-full md:mx-5 h-full mt-5 rounded-md p-5"
            >
              <h1 className="text-2xl font-medium mb-3">Info</h1>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                name="fullName"
                autoComplete="off"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <input
                type="file"
                className="border border-gray-300 outline-none cursor-pointer  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 bg-[#e7e6e6]"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    SetPhoto(e.target.files[0]);
                  }
                }}
              />
              <div className="w-full flex ">
                <button
                  type="submit"
                  className=" bg-[#080833] px-6 py-2 rounded text-white cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  Save Info
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Setting;

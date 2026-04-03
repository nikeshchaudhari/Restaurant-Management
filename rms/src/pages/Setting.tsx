import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Menu, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface UserData {
  _id: any;
  fullName: String;
  email: String;
  password?: String;
  photo?: String;
}
const Setting = () => {
  const [fullName, SetFullName] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [photo, SetPhoto] = useState<File | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  //   form Handle

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
 if(password){
  formData.append("password",password)
 }
    if (photo) {
      formData.append("photo", photo);
    }
    
      if (!userData) return;

      const res = await axios.put(
        `http://localhost:3000/user/${userData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUserData(res.data.updateData);

      SetFullName(res.data.updateData.fullName);
      SetEmail(res.data.updateData.email);

      console.log(res.data.updateData);
      
      toast.success("Profile Update Successfully...");
      console.log(res.data.updateData);
    } catch (err: any) {
      if (err.response.data) {
        toast.error(err.response.data.msg || "Update Failed");
      } else {
        toast.error("Error");
      }
    }
  };



  return (
    <>
      <main className="flex">
        <MobileDashboard />
        <Slide />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Setting</h1>

            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
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
                name="fullname"
                autoComplete="off"
                value={fullName}
                onChange={(e) => {
                  SetFullName(e.target.value);
                  // console.log(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
              </div>
              <input
                type="file"
                className="border border-gray-300 outline-none cursor-pointer  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 bg-[#e7e6e6]"
                onChange={(e) => {
                  if (e.target.files) SetPhoto(e.target.files[0]);
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

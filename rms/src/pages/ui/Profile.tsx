import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import CartUi from "./CartUi";

const Profile = () => {
  interface User {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: string;
  }

  const [update, setUpdate] = useState<User | null>(null);
  


    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const token = localStorage.getItem("token");

  // fetchdata
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          toast.error("Please login first");
          return;
        }

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
          confirm_password: "",
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Update profile
  const formHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(formData.password !== formData.confirm_password){
       toast.error("Password and Confirm Password do not match");
       return;
    }

    try {
      if (!update?._id) {
        toast.error("User ID not found");
        return;
      }

      await axios.put(
        `http://localhost:3000/user/${update._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main >
      <Navbar />

      <div className="md:flex min-h-screen ">
        <div className="hidden md:block ">
          <UiSlider />
        </div>

        <div className="w-full mt-20  md:mx-10 lg:mx-10">
          <h2 className="text-center mt-5 font-bold font-['poppins'] text-[20px]">
            Update Your Profile
          </h2>

          <form onSubmit={formHandle} className="mt-5">

           
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="border p-2 w-full m-2 border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 w-full m-2 border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
              placeholder="Email"
            />

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border p-2 w-full m-2 border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
              placeholder="New Password"
            />
            
            <input
              type="password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
              className="border p-2 w-full m-2 border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
              placeholder="Confirm_Password"
            />


            <button
              type="submit"
              className=" bg-red-900 rounded text-[14px] hover:bg-red-800  text-white p-2 m-2 cursor-pointer font-['poppins']"
            >
              Update Profile
            </button>

          </form>
        </div>
        <CartUi/>
      </div>
    </main>
  );
};

export default Profile;
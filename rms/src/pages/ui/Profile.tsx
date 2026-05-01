import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import CartUi from "./CartUi";
import OrderSlide from "../../components/OrderSlide";
import { useFormik } from "formik";
import { profile } from "../../schemas/ProfileSchema";
import { Helmet } from "react-helmet-async";

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

  const {
    values,
    errors,
    resetForm,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: profile,
    onSubmit: async (values) => {
      try {
        if (!token) {
          toast.error("User ID not found");
          return;
        }
        if (values.password !== values.confirm_password) {
          toast.error("Password not match");
          return;
        }
        if (!update?._id) {
          toast.error("User Not Found");
          return;
        }

        await axios.put(
          `http://localhost:3000/user/${update._id}`,
          {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        ((values.password = ""),
          (values.confirm_password = ""),
          toast.success("Profile Updated Successfully"));
      } catch (err) {
        console.log(err);
      }
    },
  });

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

        setValues({
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
  // const formHandle = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirm_password) {
  //     toast.error("Password and Confirm Password do not match");
  //     return;
  //   }
  // };

  return (
    <main>
       <Helmet>
            <title>Endcodes Nepal Restaurant | Profile</title>
            <meta name="description" content="Best food ordering system" />
          </Helmet>
      <Navbar />

      <div className="md:flex min-h-screen ">
        <div className="hidden md:block ">
          <UiSlider />
        </div>

        <div className="w-full mt-20  md:mx-10 lg:mx-10">
          <h2 className="text-center mt-5 font-bold font-['poppins'] text-[20px]">
            Update Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="mt-5 mx-5">
            <div className="m-2">
              <input
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 w-full  border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
                placeholder="Full Name"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName} *</p>
              )}
            </div>
            <div className="m-2">
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 w-full  border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500">{errors.email} *</p>
              )}
            </div>

            <div className="m-2">
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 w-full  border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
                placeholder="New Password"
              />
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password} *</p>
              )}
            </div>

            <div className="m-2">
              <input
                type="password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 w-full  border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-amber-800"
                placeholder="Confirm_Password"
              />
              {touched.confirm_password && errors.confirm_password && (
                <p className="text-sm text-red-500">
                  {errors.confirm_password} *
                </p>
              )}
            </div>

            <button
              type="submit"
              className=" bg-red-900 rounded text-[14px] hover:bg-red-800  text-white p-2 m-2 cursor-pointer font-['poppins']"
            >
              Update Profile
            </button>
          </form>
        </div>
        <CartUi />
        <OrderSlide />
      </div>
    </main>
  );
};

export default Profile;

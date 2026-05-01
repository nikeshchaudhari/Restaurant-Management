import { useState } from "react";
import food from "../assets/foods.png";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Register } from "../schemas/RegisterSchema";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [passwordshow, SetpasswordShow] = useState<boolean>(false);
  const [confirmshow, Setconfirmshow] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    values,
    errors,
    resetForm,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Register,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3000/user/add-user",
          values,
          {
            headers: {
              Authorization: `Bear ${token}`,
            },
          },
        );
        console.log("User Add", response.data);
        toast.success("Data Add Sucessfully...");
        resetForm();
        navigate("/login");
      } catch (err) {
        toast.error("Error ");
      }
    },
  });

  return (
    
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
       <Helmet>
            <title>Endcodes Nepal Restaurant |  Register</title>
            <meta name="description" content="Best food ordering system" />
          </Helmet>
      <div className="w-full md:w-200 mx-5 lg:mx-0 h-fix md:h-auto rounded-lg flex overflow-hidden bg-white">
        {/* Image section */}
        <div className="w-1/2 bg-[#e2dddd] hidden md:block">
          <img src={food} alt="food" className="w-100 h-100 p-10" />
        </div>

        {/* Form section */}
        <div className=" w-full md:w-1/2  p-8 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <h1 className="text-center text-[20px] mb-3 font-bold">
              Create Your Account ?
            </h1>
            <div className="mb-3 ">
              {/* <label htmlFor="fullname">Full_Name <span className="text-red-500">*</span></label> */}
              <input
                type="text"
                className="w-full p-2 border focus:outline-none border-[#e2dddd] rounded focus:ring-1 focus:ring-blue-500"
                id="fullname"
                placeholder="Enter full name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.fullName && errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}*</p>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="email">Email<span className="text-red-500">*</span></label> */}
              <input
                type="email"
                id="email"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded  focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500">{errors.email}*</p>
              )}
            </div>
            <div className="relative mb-3">
              {/* <label htmlFor="password">Password<span className="text-red-500">*</span></label> */}
              <input
                type={passwordshow ? "text" : "password"}
                id="password"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded  focus:ring-1 focus:ring-blue-500 "
                name="password"
                autoComplete="new-password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}*</p>
              )}

              <button
                type="button"
                className="absolute top-3 right-2 cursor-pointer "
                onClick={() => SetpasswordShow(!passwordshow)}
              >
                {passwordshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
            <div className="relative mb-3">
              {/* <label htmlFor="password">Confirm Password<span className="text-red-500">*</span></label> */}
              <input
                type={confirmshow ? "text" : "password"}
                id="confirmpassword"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded  focus:ring-1 focus:ring-blue-500"
                name="confirm_password"
                autoComplete="new-password"
                placeholder="Enter confirm password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirm_password && errors.confirm_password && (
                <p className="text-sm text-red-500">
                  {errors.confirm_password}*
                </p>
              )}
              <button
                className="absolute top-3 right-2 cursor-pointer "
                type="button"
                onClick={() => Setconfirmshow(!confirmshow)}
              >
                {confirmshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
            <button
              className="bg-[#1992DE] p-2 -mt-2 transition duration-300 hover:bg-[#0E6BA6] cursor-pointer text-white rounded"
              type="submit"
            >
              SignUp
            </button>
            <span className="text-center">
              Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

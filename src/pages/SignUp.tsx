import { useState } from "react";
import food from "../assets/foods.png";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordshow, SetpasswordShow] = useState(false)
  const [confirmshow, Setconfirmshow] = useState(false)

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">

      <div className="w-full md:w-200 h-100 rounded-lg flex overflow-hidden bg-white">

        {/* Image section */}
        <div className="w-1/2 bg-[#e2dddd] hidden md:block">
          <img
            src={food}
            alt="food"
            className="w-[400px] h-[400px] p-10"
          />
        </div>

        {/* Form section */}
        <div className=" w-full md:w-1/2  p-8 ">
          <form className="flex flex-col gap-1">
            <h1 className="text-center text-[20px] mb-3 font-bold">Create Your Account ?</h1>
            {/* <label htmlFor="fullname">Full_Name <span className="text-red-500">*</span></label> */}
            <input
              type="text"
              className="p-2 border focus:outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500" id="fullname"
              placeholder="Enter full name"
            />
            {/* <label htmlFor="email">Email<span className="text-red-500">*</span></label> */}
            <input
              type="email" id="email"
              className="p-2 border outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            <div className="relative">
              {/* <label htmlFor="password">Password<span className="text-red-500">*</span></label> */}
              <input
                type={passwordshow ? "text" : "password"} id="password"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                name="password"
                autoComplete="new-password"

                placeholder="Enter password"
              />

              <button type="button" className="absolute top-3 right-2 cursor-pointer " onClick={() => SetpasswordShow(!passwordshow)}>
                {passwordshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
            <div className="relative ">
              {/* <label htmlFor="password">Confirm Password<span className="text-red-500">*</span></label> */}
              <input
                type={confirmshow ? "text" : "password"} id="confirmpassword"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500"
                 name="confirm-password"
                autoComplete="new-password"
                placeholder="Enter confirm password"
              />
              <button className="absolute top-3 right-2 cursor-pointer " type="button" onClick={() => Setconfirmshow(!confirmshow)}>
                {confirmshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}

              </button>

            </div>
            <button className="bg-[#1992DE] p-2 -mt-2 transition duration-300 hover:bg-[#0E6BA6] cursor-pointer text-white rounded">SignUp</button>
            <span className="text-center">Already have an account? <Link to="/login">Login</Link></span>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUp;

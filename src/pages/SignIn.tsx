
import { useState } from "react";
import food from "../assets/foods.png";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SignIn = () => {
      const [passwordshow, SetpasswordShow] = useState(false)
      const[email,SetEmail] = useState<string>("")
      const[password,SetPassword]=useState<string>("")

      const navigate = useNavigate();

      const loginForm =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try{
          const response = await axios.post("http://localhost:3000/users",{
            email,password
          })

          console.log(response.data);
        toast.success("Login Sucessfully..")
        navigate("/")
          

        }
        catch(err){
          toast.error("Failed to login")

        }

       
        

      }
  return (
    <>
     <div className="w-screen h-screen flex justify-center items-center bg-gray-100">

      <div className="w-full md:w-200 h-100 rounded-lg flex overflow-hidden bg-white justify-center">

        {/* Image section */}
        <div className="w-1/2 bg-[#e2dddd] hidden md:block">
          <img
            src={food}
            alt="food"
            className="w-100 h-100 p-10"
          />
        </div>

        {/* Form section */}
        <div className=" w-full md:w-1/2  p-8 flex flex-col justify-center">
          <form onSubmit={loginForm} className="flex flex-col gap-1">
            <h1 className="text-center text-[20px] mb-3 font-bold">Login with Your account ?</h1>
           
            {/* <label htmlFor="email">Email<span className="text-red-500">*</span></label> */}
            <input
              type="email" id="email"
              className="p-2 border outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e)=>
                SetEmail(e.target.value)
           
                
                
              }
            />
            <div className="relative">
              {/* <label htmlFor="password">Password<span className="text-red-500">*</span></label> */}
              <input
                type={passwordshow ? "text" : "password"} id="password"
                className="w-full p-2 border outline-none border-[#e2dddd] rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                name="password"
                autoComplete="new-password"

                placeholder="Enter password"

                value={password}
                onChange={(e)=>SetPassword(e.target.value)}
              />

              <button type="button" className="absolute top-3 right-2 cursor-pointer " onClick={() => SetpasswordShow(!passwordshow)}>
                {passwordshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
           
           
            <button type="submit" className="bg-[#1992DE] p-2 -mt-2 transition duration-300 hover:bg-[#0E6BA6] cursor-pointer text-white rounded">SignUp</button>
            <span className="text-center">Create Your Account? <Link to="/signup">SignUp</Link></span>
          </form>
        </div>

      </div>
    </div>
    </>
  )
}

export default SignIn
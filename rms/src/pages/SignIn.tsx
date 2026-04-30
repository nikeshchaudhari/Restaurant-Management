  import { useState } from "react";
  import food from "../assets/foods.png";
  import { FiEye } from "react-icons/fi";
  import { FiEyeOff } from "react-icons/fi";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";
  // import { AppDispatch, type RootState } from '../store/store';
  import { useDispatch } from "react-redux";
  import { login } from "../features/Auth";
  import type { AppDispatch } from "../store/store";
  import { useFormik } from "formik";
  import {Login} from "../schemas/LoginSchema"
  const initialValues = {
    email: "",
    password: "",
  };
  const SignIn = () => {
    const [passwordshow, SetpasswordShow] = useState(false);
    // const [email, SetEmail] = useState<string>("");
    // const [password, SetPassword] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
      const navigate = useNavigate();

    const { values, errors, resetForm, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: initialValues,
        validationSchema: Login,
        onSubmit: async (values) => {

          console.log(values);
          
          try {
          
            const response = await axios.post(
              "http://localhost:3000/user/login",values
              
            );

            // console.log(response.data);

            const data = response.data;

            if (data.token) {
              const token = data.token;
              localStorage.setItem("token", token);
              localStorage.setItem("role", data.role);
              localStorage.setItem("FullName", data.fullName);
              localStorage.setItem("Image", data.imageUrl);
            
              dispatch(
                login({
                  token:data.token,
                  fullName: data.fullName,
                  profileImage: data.imageUrl,
                  role: data.role,
                }),
              );

              toast.success("Login Sucessfully..");

              if (data.role === "admin") {
                navigate("/dashboard");
              } else if (data.role === "waiter") {
                navigate("/food-order");
              } else {
                navigate("/");
              }
              resetForm();
            }else{
              toast.error("Invalid credentials");
            }
          } catch (err) {
            toast.error("Failed to login");
          }
        },
      });

  
    // const auth = useSelector((state:RootState)=>state.auth.isLoggedIn)


    // const loginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    // };
    return (
      <>
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
          <div className="w-full md:w-200 h-auto rounded-lg flex overflow-hidden bg-white justify-center">
            {/* Image section */}
            <div className="w-1/2 bg-[#e2dddd] hidden md:block">
              <img src={food} alt="food" className="w-100 h-100 p-10" />
            </div>

            {/* Form section */}
            <div className=" w-full md:w-1/2  p-8 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <h1 className="text-center text-[20px] mb-3 font-bold">
                  Login with Your account ?
                </h1>

               <div className="relative mb-3">
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
              {touched.email && errors.email &&(
                <p className=" text-red-500 text-sm ">{errors.email}*</p>
              )}
               </div>
                <div className="relative">
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
                  {touched.password &&  errors.password &&(
                    <p className="text-red-500 text-sm">{errors.password} *</p>
                  )}

                  <button
                    type="button"
                    className="absolute top-3 right-2 cursor-pointer "
                    onClick={() => SetpasswordShow(!passwordshow)}
                  >
                    {passwordshow ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-[#1992DE] p-2 mt-2 transition duration-300 hover:bg-[#0E6BA6] cursor-pointer text-white rounded"
                >
                  SignUp
                </button>
                <span className="text-center">
                  Create Your Account? <Link to="/signup">SignUp</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default SignIn;

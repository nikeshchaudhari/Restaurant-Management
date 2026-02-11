import React, { useState } from "react";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import axios from "axios";

const UserAdd = () => {
const[fullName,Setfullname]= useState<string>("")
const[email,SetEmail]= useState<string>("")
const[password,SetPassword]= useState<string>("")
const[role,SetRole]= useState<string>("waiter")

const data ={
    fullName,
    email,
    password,
    role

    
}

const formHandle = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try{
    const res = await axios.post("http://localhost:3000/newuser")

    }catch(err){

    }

    

}

  return (
    <main className="flex">
      <Slide />
      {/* Dashboard  */}
      <section className="w-screen h-screen bg-[#E9E9E9] overflow-hidden">
        <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
          <h1 className="mx-2 md:text-[20px] font-bold">Users </h1>
          <Link to="/login">
            {" "}
            <button className="rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
              Logout
            </button>
          </Link>
        </div>

        {/* UserAdd  */}
        <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
          <form onSubmit={formHandle} className="bg-white w-full md:w-250 h-full mt-5 rounded-md p-5">
            <h1 className="text-2xl font-medium mb-3">Add Users</h1>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="border outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
              name="fullname"
              autoComplete="off"

              value={fullName}
              onChange={(e)=>{
                Setfullname(e.target.value);
                console.log(e.target.value);
                
              }
              
                
              }

            />
            <input
              type="email"
              placeholder="Enter Email"
              className="border outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
               name="email"
               autoComplete="off"
               value={email}
               onChange={(e)=>{
                SetEmail(e.target.value)
               }}
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Enter Password"
                className="border outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                name="password"
                autoComplete="new-password"
                value={password}

                onChange={(e)=>{
                    SetPassword(e.target.value)
                }}              />
            </div>
            
            <select name="" id="" className="border outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
            value={role} onChange={(e)=>{
                SetRole(e.target.value)
            }}>
                <option value="">--SELECT ROLE--</option>
                <option value="admin">Admin</option>
                <option value="">Waiters</option>
                
            </select>
           <div className="w-full flex justify-center">
             <button type="submit" className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300">
                Add User
            </button>
           </div>

          </form>
        </div>
      </section>
    </main>
  );
};

export default UserAdd;

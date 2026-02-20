import React, { useEffect, useState } from "react";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MobileDashboard from "../components/MobileDashboard";

import { Trash2 } from 'lucide-react';

import { SquarePen } from 'lucide-react';

const UserAdd = () => {

    interface User {
        id: any,
        fullName: string,
        email: string,
        password: string,
        role: string
    }
    const [fullName, Setfullname] = useState<string>("")
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const [role, SetRole] = useState<string>("waiter")
    const [users, setUser] = useState<User[]>([]);
    const [editUser,setEditUser]= useState<User|null>(null);

    const data = {
        fullName,
        email,
        password,
        role


    }


    const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

//         try{
//   if(editUser){
//             const res = await  axios.put(`http://localhost:3000/newuser/${editUser.id}`,data);
//             toast.success("Update sucessfully!");

          
//             setUser((prev)=>prev.map((u)=>u.id === editUser.id ? res.data: u));
//               setEditUser(null)
//         }else{
              
//             const res = await axios.post("http://localhost:3000/newuser",
//                 data
//             )

//             // console.log(res.data);
//             toast.success("User Add Successfully..")

//             setUser((prevUser)=>[...prevUser,res.data]);

//         }
        
      
//          catch (err) {
//             toast.error("Error ");
//             console.log(err);


//         }
      
        

      



    }

    // dataFetch

    useEffect(() => {

        const dataFetch = async () => {

            try {
                const res = await axios.get("http://localhost:3000/newuser");
                setUser(res.data);

                // console.log(res.data);




            }
            catch (err) {

                toast.error("Data error...");


            }
        }
        dataFetch();
    }, [])


    // delete data

    const deleteUser = async (id: any) => {

        if (!window.confirm("Are You Sure you want  to delete this user?"))
            return;


        try {
            await axios.delete(`http://localhost:3000/newuser/${id}`);
            toast.success("User deleted successfully");
            
                setUser((prevUser) =>
                    prevUser.filter((users) => users.id !== id))

        }
        catch (err) {
            console.log(err);


        }
    }
    return (
        <main className="flex">
            <MobileDashboard />
            <Slide />
            {/* Dashboard  */}
            <section className="w-screen h-full bg-[#E9E9E9] overflow-hidden">
                <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
                    <h1 className="mx-2 md:text-[20px] font-bold">
                        
                        {editUser ? "EditUser":"Users"}
                         </h1>
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

                        <h1 className="text-2xl font-medium mb-3">
                            {editUser ? " Update Users":"Add Users"}
                        </h1>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                            name="fullname"
                            autoComplete="off"

                            value={fullName}
                            onChange={(e) => {
                                Setfullname(e.target.value);


                            }


                            }

                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                            name="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => {
                                SetEmail(e.target.value)
                            }}
                        />
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                                name="password"
                                autoComplete="new-password"
                                value={password}

                                onChange={(e) => {
                                    SetPassword(e.target.value)
                                }} />
                        </div>

                        <select name="" id="" className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
                            value={role} onChange={(e) => {
                                SetRole(e.target.value)
                            }}>
                            <option value="">--SELECT ROLE--</option>
                            <option value="admin">Admin</option>
                            <option value="waiter">Waiters</option>

                        </select>
                        <div className="w-full flex justify-center">
                            <button type="submit" className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300">
                                {editUser?"Update User":"Add User"}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Data View */}
                <div className=" md:flex justify-center  overflow-x-auto p-5">
                    <table className="bg-white min-w-50 w-full md:w-250 h-full mt-5 rounded-md ">
                        <thead className="bg-gray-100 ">
                            <tr>
                                <th className=" px-4 py-2 text-left ">Id</th>
                                <th className=" px-4 py-2 text-left">Name</th>
                                <th className=" px-4 py-2 text-left">Role</th>
                                <th className=" px-4 py-2 text-left">Username</th>
                                <th className=" px-4 py-2 text-left">Actions</th>
                            </tr>

                        </thead>
                        <tbody>
                            {users.length === 0 ? (

                                <tr>
                                    <td colSpan={5} className="text-center p-5 text-[20px] font-bold">
                                        No Users Found
                                    </td>
                                </tr>

                            ) : (
                                users.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-400/10">
                                        <td className=" px-2 md:px-4  py-2">{user.id}</td>
                                        <td className=" px-2 md:px-4 py-2">{user.fullName}</td>
                                        <td className="px-2 md:px-4 py-2">{user.email}</td>
                                        <td className="px-2 md:px-4 py-2">{user.role}</td>
                                        <td className="flex gap-5 justify-start items-center px-2 md:px-4 py-2 text-[20px] " >
                                            <span>
                                                <SquarePen className="text-[#080833] cursor-pointer transform hover:-translate-y-0.5 duration-300" onClick={()=>{
                                                    setEditUser(user);
                                                    Setfullname(user.fullName);
                                                    SetEmail(user.email);
                                                    SetRole(user.role);
                                                    SetPassword(user.password);
                                                    
                                                }}/>

                                            </span>
                                            <span>
                                                <Trash2 className="text-red-600 cursor-pointer transform hover:-translate-y-0.5 duration-300" onClick={() => deleteUser(user.id)} />

                                            </span>

                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>



            </section>
        </main>
    );
};

export default UserAdd;

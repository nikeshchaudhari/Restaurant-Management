import { Link } from "react-router-dom"
import adminLogo from "../assets/adminlogo.png"
const AdminDashboard = () => {
    return (
        <>
            <main className="flex ">
                    <aside className="hidden md:block py-5 w-90 bg-[rgb(16,34,55)] h-screen">
                        <div className="py-2 flex justify-center gap-2">
                            <img src={adminLogo} alt="" className="w-10 h-10" />
                            <h1 className="text-white text-[30px] font-bold">RMS Admin</h1>

                        </div>
                        <div className="text-white flex flex-col items-center mt-2 ">
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Dashboard</h1>
                            </div>
                              <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Users</h1>
                            </div>
                             <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Menus</h1>
                            </div>
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Tables</h1>
                            </div>
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Orders</h1>
                            </div>
                            <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Reports</h1>
                            </div>
                            <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Setting</h1>
                            </div>
                        </div>

                    </aside>
                    {/* Dashboard  */}
                    <section className="w-screen h-screen bg-[#E9E9E9] overflow-hidden">
                       <div className=" flex justify-between mx-10 mt-5 bg-white p-2 rounded-full items-center">
                        <h1 className="mx-2 text-[20px] font-bold">Welcome,Admin</h1>
                       <Link to="/"> <button className="rounded-full bg-[#1F354D] w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">Logout</button></Link>
                       </div>
                       <div className=" mx-10 mt-5 flex gap-10 ">
                        <div className="bg-white w-60 h-20 rounded-md">
                            <h1 className="text-center mt-5 font-medium">Today's Sales</h1>
                        </div>
                         <div className="bg-white w-60 h-20 rounded-md">
                            <h1 className="text-center mt-5 font-medium">Total Orders</h1>
                        </div>
                         <div className="bg-white w-60 h-20 rounded-md">
                            <h1 className="text-center mt-5 font-medium">Active Tables</h1>
                        </div>
                         <div className="bg-white w-60 h-20 rounded-md">
                            <h1 className="text-center mt-5 font-medium">Low Stock</h1>
                        </div>
                       </div>



                    </section>
                  
            </main>
        </>
    )
}

export default AdminDashboard
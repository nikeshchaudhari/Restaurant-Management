
import { Link } from "react-router-dom"
import adminLogo from "../assets/adminlogo.png"
import { LayoutDashboard } from 'lucide-react';
import { Users } from 'lucide-react';
import { SquareMenu } from 'lucide-react';
import { Table } from 'lucide-react';
import { HandPlatter } from 'lucide-react';
import { MessageCircleWarning } from 'lucide-react';
import { Settings2 } from 'lucide-react';

const Slide = () => {
  return (
   <>
  
        <aside className="hidden md:block py-5 w-90 bg-[rgb(16,34,55)] h-screen sticky top-0">
                        <div className="py-2 flex justify-center items-center gap-2">
                            <img src={adminLogo} alt="" className="w-10 h-10" />
                            <h1 className="text-white text-[30px] font-bold">RMS Admin</h1>

                        </div>
                        <div className="text-white flex flex-col  mt-2 ">
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                              <Link to="/dashboard/admin" className="flex pl-10 items-center">
                              <LayoutDashboard />
                                <h1 className="text-[20px] pl-2 font-normal ">Dashboard</h1></Link>
                            </div>
                              <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="/dashboard/useradd"  className="flex pl-10 items-center">
                                 <Users  />
                                <h1 className="text-[20px] pl-2 font-normal ">Users</h1>
                                </Link>
                               
                            </div>
                             <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="" className="flex pl-10 items-center">
                                  <SquareMenu/>
                                <h1 className="text-[20px]  pl-2 font-normal ">Menus</h1>
                                </Link>
                              
                            </div>
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="" className="flex pl-10 items-center">
                                <Table/>
                                 <h1 className="text-[20px] pl-2 font-normal ">Tables</h1>
                                </Link>
                               
                            </div>
                            <div className="bg-[#1F354D] md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="" className="flex pl-10 items-center">
                                <HandPlatter/>
                                <h1 className="text-[20px] pl-2 font-normal ">Orders</h1>
                                </Link>
                                
                            </div>
                            <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="" className="flex pl-10 items-center">
                                <MessageCircleWarning/>
                                 <h1 className="text-[20px] pl-2 font-normal ">Reports</h1>
                                </Link>
                               
                            </div>
                            <div className="bg-[#1F354D]  md:w-60   lg:w-65  p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <Link to="" className="flex pl-10 items-center">
                                <Settings2/>
                                 <h1 className="text-[20px] pl-2 font-normal ">Setting</h1>
                                </Link>
                               
                            </div>
                        </div>

                    </aside>
  
   
   </>
  )
}

export default Slide

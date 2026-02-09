import { Link } from "react-router-dom"
import adminLogo from "../assets/adminlogo.png"
import { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";


interface Order{
    id:number,
    total:number,
    date: string;

}
const AdminDashboard = () => {

    const[sales,SetSales] = useState<Order[]>([]);
    
    useEffect(()=>{
        const dataFetch = async()=>{

            try{
                const res = await axios.get("http://localhost:3000/orders");
                SetSales(res.data);
            }
            catch(err){
                toast.error("Data Error...")
                console.log(err);
                

            }

        }
        dataFetch();
    },[])

    // dade filter

    const today = new Date().toISOString().split("T")[0]
    // console.log(today);

    const todaySales = sales.filter(sale=> sale.date === today)
    // console.log(todaySales);
    
    
//    total Add

const totalSales = todaySales.reduce((sum,sale)=> sum+sale.total,0)
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
                       <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
                        <h1 className="mx-2 md:text-[20px] font-bold">Welcome,Admin</h1>
                       <Link to="/"> <button className="rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">Logout</button></Link>
                       </div>
                       <div className=" mx-10 mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="bg-white h-30 rounded-lg  flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition duration-300 ">
                            <h1 className="font-medium">Today's Sales</h1>
                           <h1 className="text-[#831F00]">
                            Rs. 
                          {totalSales}
                           </h1>
                          
                        </div>
                         <div className="bg-white h-30 rounded-lg  flex flex-col justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer">
                            <h1 className="font-medium">Total Orders</h1>
                            <h2 className="text-[#831F00]">{sales.length}</h2>
                        </div>
                         <div className="bg-white h-30 rounded-lg flex justify-center items-center  hover:scale-105 transition duration-300 cursor-pointer ">
                            <h1 className="font-medium">Active Tables</h1>
                        </div>
                         <div className="bg-white h-30 rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300 ">
                            <h1 className="font-medium">Low Stock</h1>
                        </div>
                       </div>



                    </section>
                  
            </main>
        </>
    )
}

export default AdminDashboard
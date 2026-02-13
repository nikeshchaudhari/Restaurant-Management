import { Link } from "react-router-dom"
// import adminLogo from "../assets/adminlogo.png"
import { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import Slide from "../components/Slide";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import MobileDashboard from "../components/MobileDashboard";


interface Order {
    id: number,
    total: number,
    date: string;

}
const AdminDashboard = () => {

    const [sales, SetSales] = useState<Order[]>([]);
    const [toggle,SetToggle]= useState<boolean>(true)

    useEffect(() => {
        const dataFetch = async () => {

            try {
                const res = await axios.get("http://localhost:3000/orders");
                SetSales(res.data);
            }
            catch (err) {
                toast.error("Data Error...")
                console.log(err);


            }

        }
        dataFetch();
    }, [])

    // dade filter

    const today = new Date().toISOString().split("T")[0]
    // console.log(today);

    const todaySales = sales.filter(sale => sale.date === today)
    // console.log(todaySales);


    //    total Add

    const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0)
    return (
        <>
            <main className="md:flex ">
                
                <MobileDashboard/>

                <Slide />
                {/* Dashboard  */}
                <section className="w-screen h-screen bg-[#E9E9E9] overflow-hidden">
                    <div className=" flex justify-between mx-5 mt-5 bg-white p-4 md:p-2 rounded-full items-center ">
                        <h1 className="mx-2 md:text-[20px] font-bold">Welcome,Admin</h1>
                        <Link to="/login" className=""> <button className="rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300 hidden md:block">Logout</button></Link>

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
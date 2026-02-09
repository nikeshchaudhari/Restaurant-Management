import adminLogo from "../assets/adminlogo.png"
const AdminDashboard = () => {
    return (
        <>
            <main className="flex ">
                    <aside className="py-5 w-80 bg-[rgb(16,34,55)] h-screen">
                        <div className="py-2 flex justify-center gap-2">
                            <img src={adminLogo} alt="" className="w-10 h-10" />
                            <h1 className="text-white text-[30px] font-bold">RMS Admin</h1>

                        </div>
                        <div className="text-white flex flex-col items-center mt-2 ">
                            <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Dashboard</h1>
                            </div>
                              <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Users</h1>
                            </div>
                             <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Menus</h1>
                            </div>
                            <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Tables</h1>
                            </div>
                            <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Orders</h1>
                            </div>
                            <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Reports</h1>
                            </div>
                            <div className="bg-[#1F354D]   w-70 p-2 rounded transition-all  hover:bg-[#445971]  duration-300 cursor-pointer mb-5">
                                <h1 className="text-[20px] text-center font-normal ">Setting</h1>
                            </div>
                        </div>

                    </aside>
                    {/* Dashboard index */}
                    <section>
                        

                    </section>
                  
            </main>
        </>
    )
}

export default AdminDashboard
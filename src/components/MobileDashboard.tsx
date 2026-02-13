import { useState } from "react";
import adminLogo from "../assets/adminlogo.png"
import { RxCross2 } from "react-icons/rx";
const MobileDashboard = () => {

    const[isOpen,SetIsOpen] = useState<boolean>(false);

    return (

        <>


        {
            isOpen && (
                 <div className="md:hidden fixed top-0 left-0 w-screen h-screen bg-black/70 z-10" 
                 onClick={()=>{

                    SetIsOpen(false)
                 }}
           
            ></div>
            )
        }
           
            <aside className="md:hidden bg-[rgb(16,34,55)] w-70 h-screen fixed z-10 ">
                <div className="py-2 flex items-center gap-2 mt-5 mx-4  ">
                    <img src={adminLogo} alt="" className="w-5 h-5" />
                    <h1 className="text-white text-[16px] font-bold">RMS Admin</h1>

                </div>
                <span className="absolute top-6 right-3" onClick={()=>{
                        SetIsOpen(false)
                    }}>
                    <RxCross2 className="text-white text-3xl" />

                </span>

                <ul className="mt-5 " >
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Dashbaord</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Users</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Menus</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Tables</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Orders</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Reports</li>
                    <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Setting</li>
                </ul>
                <div className="bg-[#1F354D] p-4 text-white  ">
                    <button>Logout</button>
                </div>

            </aside>

        </>
    )
}

export default MobileDashboard
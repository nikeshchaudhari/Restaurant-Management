import axios from "axios";
import { Search, ShoppingBag, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../features/CartOpen";

const Navbar = ({ search, setSearch }: any) => {
  // const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem("token");

  const isLoggedIn:any= useSelector((state:RootState)=>state.auth.isLoggedIn)
  const userProfile:any= useSelector((state:RootState)=>state.auth.user)
const dispatch:AppDispatch = useDispatch()  

  return (
    <>
      <>
        <div className=" w-full h-15 bg-white shadow-lg flex items-center justify-around sticky top-0 z-40 ">
          <div className="px-4 w-auto">
            <h2 className="font-['poppins'] text-[25px] font-bold hidden md:block">
              Hamro Restor
            </h2>
          </div>
          <div className="relative  flex items-center h-full  px-4 md:px-0">
            <input
              value={search}
              type="text"
              placeholder="Search Items..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[73vw] border border-red-800 outline-none focus:ring-1 focus:ring-red-800 h-2/3  pl-12 pr-3 rounded-full  font-['poppins'] "
            />
            <Search className="absolute left-8  md:left-5" />
          </div>

          <div className="cursor-pointer " onClick={()=>dispatch(openCart())}>
            <ShoppingBag />
          </div>
          <div className="pr-5">
           {
            isLoggedIn ?(
              <div className="flex items-center gap-1">
                <img src={userProfile.profileImage} alt="" className="w-8 " />
                


              </div>
            ):(
              <p>gfdgfdg</p>
            )
           }
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;

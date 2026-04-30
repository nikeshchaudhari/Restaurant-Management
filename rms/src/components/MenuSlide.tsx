import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuClose } from "../features/menuSlice";
import { Link } from "react-router-dom";
import { User2Icon, UserCheck2, UserIcon, UsersIcon, UsersRound } from "lucide-react";

interface props {
onMenuClick:()=>void
}
const MenuSlide = ({onMenuClick}:props) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);


  // handle mobile view
  const handle =()=>{
    onMenuClick();
    dispatch(menuClose());
  }
  return (
    <>
      {Open && (
        <div
          className="md:hidden fixed top-0 left-0 w-screen h-screen bg-black/70 z-100 "
          onClick={() => dispatch(menuClose())}
        ></div>
      )}
      <aside className={`md:hidden fixed bg-gray-100 z-100 w-full h-full transform transition-all   ${
        Open ? "fixed top-0 duration-500  ":"-translate-y-100 opacity-0 invisible duration-200"}`}>
        <div className="flex items-center justify-between p-5 bg-white">
          <h2 className="text-2xl font-bold font-['poppins']">Hotel Villas</h2>
        
            <RxCross2
              className={`text-2xl &{
  isOpen:"rotate-50":"rotate-0"
}`}
              onClick={() => dispatch(menuClose())}
            />
        </div>

        <div className="flex w-full ">
          <ul className="mt-5 text-lg font-['poppins'] flex flex-col justify-center items-center w-full">
           <Link to="/home" onClick={()=>dispatch(menuClose())}> <li className=" mb-3">Home</li></Link>
            <li className=" mb-3" onClick={handle}>All Menu</li>
            {/* <Link to='/signup'><li className="mb-3 bg-amber-600  text-white px-5 py-1 flex justify-center rounded-full">Register</li></Link> */}
           <Link to="/login" className="flex items-center justify-center gap-1 bg-amber-600/10 px-5 py-1 rounded-full text-amber-600">
           <UsersRound size={20}/>
            <li className="">Login</li>
           </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MenuSlide;

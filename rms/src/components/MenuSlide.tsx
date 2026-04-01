import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuClose } from "../features/menuSlice";

const MenuSlide = () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);
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

        <div className="flex justify-center w-full ">
          <ul className="mt-5 text-lg font-['poppins'] ">
            <li className=" mb-3">Home</li>
            <li className=" mb-3">All Menu</li>
            <li className="  mb-3">About Us</li>
            <li className="mb-3">Contact Us</li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MenuSlide;

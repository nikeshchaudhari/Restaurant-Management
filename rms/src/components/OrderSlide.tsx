import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { menuClose } from "../features/menuSlice";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat,
  LogOutIcon,
  SendToBack,
  TableOfContents,
  UserRoundPen,
} from "lucide-react";

const OrderSlide = () => {
  const dispatch: AppDispatch = useDispatch();

  const open = useSelector((state: RootState) => state.menu.isOpen);

  const navigate = useNavigate();

  // logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("FullName");
    localStorage.removeItem("role");
    localStorage.removeItem("Image");

    navigate("/");
  };
  return (
    <>
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 z-40"
          onClick={() => dispatch(menuClose())}
        ></div>
      )}

      <aside
        className={`md:hidden fixed top-0 right-0 h-screen w-[60vw] bg-gray-100  z-50
  transform transition-transform duration-300 
  ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 bg-white">
          <h2 className="text-2xl font-bold font-['poppins']">Hotel Villas</h2>

          <RxCross2
            size={30}
            onClick={() => dispatch(menuClose())}
            className="cursor-pointer"
          />
        </div>

        <div className="flex justify-center w-full">
          <ul className="mt-5 text-lg font-['poppins'] flex flex-col gap-4  w-full">
            <li
              className="flex  items-center  gap-3 w-full px-10 hover:bg-red-800/70 p-2 hover:text-white  "
              onClick={() => dispatch(menuClose())}
            >
              <TableOfContents />
              <Link to="/food-order" className="text-[18px] font-medium">
                Select Table
              </Link>
            </li>

            <li
              className="flex  items-center  gap-3 w-full  px-10 "
              onClick={() => dispatch(menuClose())}
            >
              <ChefHat />
              <Link
                to="/food-order/all-menu"
                className="text-[18px] font-medium"
              >
                Take Order
              </Link>
            </li>

            <li
              className="flex  items-center  gap-3 w-full  px-10"
              onClick={() => dispatch(menuClose())}
            >
              <SendToBack />
              <Link
                to="/food-order/my-order"
                className="text-[18px] font-medium"
              >
                My Orders
              </Link>
            </li>

            <li
              className="flex  items-center  gap-3 w-full  px-10"
              onClick={() => dispatch(menuClose())}
            >
              <UserRoundPen />
              <Link
                to="/food-order/profile"
                className="text-[18px] font-medium"
              >
                Profile
              </Link>
            </li>
            <li
              className="w-full  flex items-center justify-center gap-4 px-10 absolute bottom-0 text-center bg-[#1F0802] py-5"
              onClick={() => {
                handleLogout();
                dispatch(menuClose());
              }}
            >
              <LogOutIcon size={28} className="text-white" />
              <Link to="" className="text-[20px] font-medium text-white ">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default OrderSlide;

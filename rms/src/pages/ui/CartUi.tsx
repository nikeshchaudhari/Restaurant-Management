import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { closeCart } from "../../features/CartOpen";
import { X } from "lucide-react";

const CartUi = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cartUi.isCartOpen);


  

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed top-0 left-0 w-screen h-full bg-black/70 z-50 ${
          isOpen ? "block" : "hidden"
        } `}
        onClick={() => dispatch(closeCart())}
      ></div>

      {/* drawer */}

      <div className={`flex justify-between items fixed top-0 right-0 w-[40vw] bg-white h-full z-50 transition transform duration-700 p-2 ${
        isOpen?"translate-x-0":"translate-x-full"}`}>

          <h2 className=" text-[20px] font-['poppins'] font-semibold">Add Items</h2>
          <X className="hover:bg-gray-100  cursor-pointer transform transition hover:rotate-90 duration-200 rounded-full" size={30} onClick={()=>dispatch(closeCart())}/>





      </div>
    </>
  );
};

export default CartUi;

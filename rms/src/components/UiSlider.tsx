import React, { useState } from "react";
import logo from "../assets/logo.png";
const UiSlider = () => {
  const buttons = ["Select Table", "Take Table", "My Orders"];
  const [active, setActive] = useState<null>(null);
  return (
    <>
      <div >
        <aside className="hidden md:block md:w-[15vw] lg:w-[16vw] h-screen border-r border-gray-300 p-4 ">
          <div>
            <h3 className="text-center md:p-5 md:text-[12px] lg:text-[15px] font-['poppins'] text-gray-400">
              Waiter Menu
            </h3>
          </div>
          <div className="">
            <ul className="flex justify-center flex-col   lg:px-2 ">
              {buttons.map((item, index: any) => (
                <div>
                  <li
                    key={index}
                    onClick={() => setActive(index)}
                    className={`lg:py-2 bg-[#faefee] hover:bg-[#e0e0e0]/30 w-full rounded  cursor-pointer md:mb-3 lg:mb-1 font-['poppins'] md:text-[12px] lg:text-[16px] lg:pl-10 font-semibold ${
                      active === index
                        ? "bg-[#eb9e95] text-red-800"
                        : "bg-white"
                    }`}
                  >
                    {item}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default UiSlider;

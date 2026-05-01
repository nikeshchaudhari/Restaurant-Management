import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons8-facebook.gif";
import instagram from "../assets/icons8-instagram.gif";
const Footer = () => {
  return (
    <>
      <section>
        <div className="w-full bg-gray-100 h-full mt-10">
          <div className="flex items-center justify-center h-14 px-3 font-['poppins']">
            <div>
              <span className="px-2 text-[12px] md:text-[16 px]" >© Copyright 2026, All Rights Reserved by</span>
              <Link to="https://endcodesnepal.com/" className="font-medium text-red-800 text-[12px] md:text-[16 px]">
                Endcodes Nepal Pvt.Ltd.
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;

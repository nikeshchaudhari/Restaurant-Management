import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-screen bg-[#E9E9E9] overflow-hidden">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Menu</h1>
            <Link to="/login">
              {" "}
              <button className="rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
                Logout
              </button>
            </Link>
          </div>
          {/* Add Menu Form */}
          <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form className="bg-white w-full md:w-250 h-full mt-5 rounded-md p-5">
              <h1 className="text-2xl font-medium mb-3">Menu Add</h1>
              <input
                type="text"
                placeholder="Enter Menu Name"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <input
                type="text"
                placeholder="Enter Price"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <select
                name=""
                id=""
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">--SELECT CATEGORY--</option>
                <option value="pizza">Pizza</option>
                <option value="burger">Burger</option>
                <option value="desert">Desert</option>
              </select>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  Add Menu
                </button>
              </div>
            </form>
          </div>

          {/* View All Menu */}
          <div className=" md:flex justify-center  overflow-x-auto p-5">
            <table className="bg-white min-w-50 w-full md:w-250 h-full mt-5 rounded-md ">


              
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;

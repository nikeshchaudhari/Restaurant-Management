import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-screen h-full bg-[#E9E9E9] overflow-hidden">
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


            
           </div>
        </section>
      </main>
    </>
  );
};

export default Menu;

import { Search } from "lucide-react";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
const Home = () => {
  return (
    <>
      <main>
        <nav className="shadow-lg w-screen h-20 flex items-center md:justify-around">
          <div className="hidden md:flex items-center ">
            <img src={logo} alt="" className="ml:10 lg:ml-20 w-15 h-15 p-2 hidden md:block" />
        <h1 className="font-['poppins'] md:text-[20px] lg:text-[40px] font-bold hidden md:block">End RMS</h1>
          </div>
          <div className="relative  flex-1 mx-4 md:mx-10  ">

            <input type="text" className="w-full h-12 rounded-full bg-[#E2E2E2] py-3 px-12 outline-none focus:ring-1 focus:ring-[#FF8000] font-poppins transition-all"/>
            <Search className="absolute top-3 left-5"/>
           
          </div>
          <div className="hidden md:flex gap-4 mr-4 ">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">Register</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">Login</button>
          </div>
          <RxHamburgerMenu className="block md:hidden text-50 hover:bg-gray-100 mr-5"/>
        </nav>

        {/* Hero section--- */}

<section>

      </section>
      </main>
    </>
  );
};

export default Home;

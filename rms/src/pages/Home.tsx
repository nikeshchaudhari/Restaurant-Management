import { Search } from "lucide-react";
import logo from "../assets/logo.png";
import herobg from "../assets/herobg.png";
import food from "../assets/food.png";
import { RxHamburgerMenu } from "react-icons/rx";
const Home = () => {
  return (
    <>
      <main className="overflow-x-hidden">
        <nav className="shadow-lg w-screen h-20 flex items-center md:justify-around z-10">
          <div className="hidden md:flex items-center ">
            <img
              src={logo}
              alt=""
              className="ml:10 lg:ml-20 w-15 h-15 p-2 hidden md:block"
            />
            <h1 className="font-['poppins'] md:text-[20px] lg:text-[40px] font-bold hidden md:block">
              End RMS
            </h1>
          </div>
          <div className="relative  flex-1 mx-4 md:mx-10  ">
            <input
              type="text"
              className="w-full h-12 rounded-full bg-[#E2E2E2] py-3 px-12 outline-none focus:ring-1 focus:ring-[#FF8000] font-poppins transition-all"
            />
            <Search className="absolute top-3 left-5" />
          </div>
          <div className="hidden md:flex gap-4 mr-8 ">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
              Register
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
              Login
            </button>
          </div>
          <RxHamburgerMenu className="block md:hidden text-50 hover:bg-gray-100 mr-5" />
        </nav>

        {/* Hero section--- */}

        <section className="w-screen relative mt-2  flex items-center overflow-hidden">
          <img src={herobg} alt="" className="w-screen h-[300px] md:h-130" />
          <div className="absolute left-10 top-5 md:top-10 md: md:left-15 lg:left-40 ">
            <h1 className=" text-[20px] md:text-[40px] lg:text-[50px] font-extrabold font-['poppins]">Enjoy <span className="text-[#FF8000]">Delicious</span> </h1>
            <h1 className="text-[20px] md:text-[40px] lg:text-[50px] font-extrabold font-['poppins]">Food In Your  </h1>
            <h1 className=" text-base md:text-[40px] lg:text-[50px] font-extrabold font-['poppins]">Healthy Life  </h1>
            <p className="w-40 md:w-[400px] lg:w-[500px] text-justify mt-4 md:mt-5 text-[12px] md:text-[15px] lg:text-2xl font-[poppins]">Our touchless menu seamlessly provides you a fantastic experience in food ordering.And keeping track of your food expenses will no longer be a hassle.</p>
          </div>
          <img src={food} alt=""  className="absolute w-[200px]  md:w-[500px] lg:w-[600px] md:right-1 lg:left-1/2 md:-top-1 right-1 top-5"/>
        </section>
      </main>
    </>
  );
};

export default Home;

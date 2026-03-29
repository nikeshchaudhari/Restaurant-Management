import { ArrowDownToDot, Search } from "lucide-react";
import logo from "../assets/logo.png";
import herobg from "../assets/herobg.png";
import food from "../assets/food.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AllMenu from "./ui/AllMenu";
const Home = () => {
  interface MenuItems {
    name: string;
    category: string;
  }
  const [menu, setMenu] = useState<MenuItems[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  // category fetch

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu/all-menu");
        setMenu(res.data);
        // console.log(res.data.allMenu);
        const menuData: MenuItems[] = res.data.allMenu;
        setMenu(menuData);
        // console.log("allData",menuData);

        const uniqueCategory = [
          ...new Set(menuData.map((items) => items.category)),
        ];
        setCategory(uniqueCategory);
        console.log(uniqueCategory);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="overflow-x-hidden">
        <nav className="shadow-lg w-screen h-20 flex items-center md:justify-around z-10">
          <div className="hidden md:flex items-center ">
            <img
              src={logo}
              alt=""
              className="ml:10 lg:ml-20 w-15 h-15 p-2 hidden md:block cursor-pointer "
            />
            <h1 className="font-['poppins'] md:text-[20px] lg:text-[40px] font-bold hidden md:block cursor-pointer  ">
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
            <Link to="/signup">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
                Register
              </button>
            </Link>

            <Link to="/login">
              {" "}
              <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
                Login
              </button>
            </Link>
          </div>
          <RxHamburgerMenu className="block md:hidden text-50 hover:bg-gray-100 mr-5" />
        </nav>

        {/* Hero section--- */}

        <section className="w-screen relative mt-2  flex items-center overflow-hidden">
          <img src={herobg} alt="" className="w-screen h-75 md:h-130" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
              <div className="max-w-xl">
                <h1 className="text-[clamp(18px,4vw,50px)] font-extrabold font-poppins">
                  Enjoy <span className="text-[#FF8000]">Delicious</span>
                </h1>

                <h1 className="text-[clamp(18px,4vw,50px)] font-extrabold font-poppins">
                  Food In Your
                </h1>

                <h1 className="text-[clamp(18px,4vw,50px)] font-extrabold font-poppins">
                  Healthy Life
                </h1>

                <p className="mt-4 text-[clamp(12px,2vw,18px)] text-gray-700">
                  Our touchless menu seamlessly provides you a fantastic
                  experience in food ordering. And keeping track of your food
                  expenses will no longer be a hassle.
                </p>
              </div>

              {/* Food Image */}
              <div className="">
                <img src={food} alt="" className="w-125  xl:w-150" />
              </div>
            </div>
            <div className="absolute bottom-5 left-[50%] -translate-x-1/2">
              <div className="w-32 md:w-40 lg:w-48 bg-[#FF8000] hover:bg-amber-600 transition duration-500 py-1 md:py-3 px-3 rounded md:text-[20px] text-white font-poppins font-bold cursor-pointer flex justify-center gap-2 md:gap-3 items-center">
                <button className="text-[clamp(12px,2vw,20px)] font-['poppins'] cursor-pointer">
                  Order Now
                </button>
                <ArrowDownToDot className=" md:w-8 md:h-8 animate-bounce bg-black/20 rounded-full " />
              </div>
            </div>
          </div>
        </section>

        {/* category */}

        <div>
          <h1 className="text-center  mt-10 text-[18px] md:text-[25px] lg:text-[30px] font-bold font-['poppins']">
            All Category
          </h1>
          <div className="w-screen grid justify-items-center ">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6  gap-4 justify-items-center  mt-5 lg:w-2/3 overflow-x-hidden px-5 py-2 ">
              {category.map((items, index) => (
                <button
                  key={index}
                  className="px-2 md:py-2 md:px-5 lg:px-8 font-[poppins] rounded-full border border-amber-500 cursor-pointer hover:bg-[#FF8000] hover:text-white transition duration-500  "
                >
                  {items}
                </button>
              ))}
            </div>
          </div>
        </div>

       <AllMenu/>
      </main>
    </>
  );
};

export default Home;

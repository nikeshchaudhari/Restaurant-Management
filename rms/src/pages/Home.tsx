import {
  ArrowDownToDot,
  Search,
} from "lucide-react";
import { RotateCw } from "lucide-react";

import logo from "../assets/logo.png";
import herobg from "../assets/herobg.png";
import food from "../assets/food.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import AllMenu from "./ui/AllMenu";
import MenuSlide from "../components/MenuSlide";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../features/menuSlice";
import { CircleUserRound } from "lucide-react";
import { HandPlatter } from "lucide-react";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

interface MenuItems {
  _id: null | undefined;
  menuName: string;
  price: string;
  category: string;
  available: string;
  description: string;
  imageUrl: string;
}

interface UserProfile {
  fullName: string;
  imgageUrl: string;
}
const Home = () => {
  const [menu, setMenu] = useState<MenuItems[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(20);

  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const allMenuRef = useRef<HTMLDivElement>(null);
  const menuScroll = () => {
    {
      allMenuRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // category fetch

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu/all-menu");
        setMenu(res.data);
        // console.log(res.data.allMenu);
        const menuData: MenuItems[] = res.data.allMenu;
        setMenu(menuData.reverse());
        // console.log("allData", menuData);

        const uniqueCategory = [
          "All",
          ...new Set(menuData.map((items) => items.category)),
        ];
        setCategory(uniqueCategory);
        // console.log(uniqueCategory);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);
  // enter search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(search);
    }
  };

  const handleSearch = () => {
    setQuery(search);
  };

  const filterItems = menu.filter((items) => {
    const categoryMatch = selected === "All" || items.category === selected;

    const matchSearch =
      query === "" ||
      items.menuName.toLocaleLowerCase().includes(query.toLocaleLowerCase());

    return categoryMatch && matchSearch;
  });
 
  const handleCategory = (item: any) => {
    console.log(item);

    setSelected(item);
    setSearch("")
  };


  // loadmore
  const visibleCounts = filterItems.slice(0,visibleCount)
  // console.log(visibleCounts);
  
  return (
    <>

<Helmet>
  <title>Endcodes Nepal Restaurant | Home</title>
  <meta name="description" content="Best food ordering system" />
</Helmet>
      <main className="w-full max-w-full">
        <MenuSlide onMenuClick={menuScroll} />
        <nav className="shadow-lg bg-white h-20  md:h-20 flex items-center md:justify-around sticky top-0 z-50 w-full ">
          <div className="hidden md:flex items-center overflow-x-hidden  ">
            <img
              src={logo}
              alt=""
              className="ml:10 lg:ml-20 w-15 h-15 p-2 hidden md:block cursor-pointer   "
            />
            <Link to="/">
            <h1 className="font-['poppins'] md:text-[20px] lg:text-[40px] font-bold hidden md:block cursor-pointer  " >
              End RMS
            </h1>
            </Link>
          </div>
          <div className="relative  flex-1 mx-4 md:mx-10  ">
            <input
              type="text"
              className="w-full h-12 rounded-full bg-[#E2E2E2] py-3 pl-5 pr-12 outline-none focus:ring-1 focus:ring-[#FF8000] font-poppins transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div
              className="absolute top-1 right-3 p-2 hover:bg-white transition duration-300 rounded-full"
              onClick={handleSearch}
            >
              <Search className="  hover:text-red-600 cursor-pointer " />
            </div>
          </div>
          <div className="hidden md:flex gap-4 mr-8 ">
            {!token && (
              <div>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
                    Register
                  </button>
                </Link>

                <Link to="/login">
                  {" "}
                  <button className=" px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {role === "admin" && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1 px-6 py-2  rounded-full cursor-pointer   bg-orange-500 hover:bg-orange-700 transition duration-500"
              >
                <CircleUserRound className="text-white " size={20} />
                <button className=" font-['poppins']  text-white text-[20px]  cursor-pointer font-light  ">
                  Admin
                </button>
              </Link>
            )}

            {role === "waiter" && (
              <Link
                to="/food-order"
                className="flex items-center gap-1 px-6 py-2  rounded-full cursor-pointer   bg-orange-500 hover:bg-orange-700 transition duration-500"
              >
                
                <HandPlatter className="text-white " size={18}/>

                <button className=" font-['poppins']  text-white text-[20px]  cursor-pointer font-light ">
                  Waiter
                </button>
              </Link>
            )}
          </div>
          <RxHamburgerMenu
            className="block md:hidden  hover:bg-gray-100 mr-5"
            onClick={() => dispatch(menuOpen())}
            size={24}
          />
        </nav>

        {/* mobile view */}

        {/* Hero section--- */}

        <section className="relative flex items-center ">
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
                <button
                  className="text-[clamp(12px,2vw,20px)] font-['poppins'] cursor-pointer"
                  onClick={menuScroll}
                >
                  Order Now
                </button>

                <ArrowDownToDot className=" md:w-8 md:h-8 animate-bounce bg-black/20 rounded-full " />
              </div>
            </div>
          </div>
        </section>

        {/* category */}

        <div className="overflow-x-hidden">
          <h1 className="text-center  mt-10 text-[18px] md:text-[25px] lg:text-[30px] font-bold font-['poppins']">
            All Category
          </h1>
          <div className="w-screen grid justify-items-center mt-10 px-5 ">
            <div className="flex flex-wrap gap-4 w-[80vw]">
              {category.map((items, index) => (
                <button
                  key={index}
                  onClick={() => handleCategory(items)}
                  className={`px-2 md:py-2 md:px-5 lg:px-8 font-[poppins] rounded-full border border-amber-500 cursor-pointer hover:bg-[#FF8000] hover:text-white transition duration-500 ${selected === items ? "bg-[#FF8000] text-white" : "border border-[#FF8000]"}`}
                >
                  {items}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={allMenuRef}>
          <h1 className="text-center  my-10 text-[18px] md:text-[25px] lg:text-[30px] font-bold font-['poppins']">
            All Menus
          </h1>
          <div>
            {filterItems.length === 0 ? (
              <div className="w-full pb-5  flex flex-col justify-center items-center ">
                <h2 className="text-[20px]">No items Founds</h2>

                <RotateCw
                  className="cursor-pointer mt-2  hover:text-amber-600"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-[80vw] justify-self-center">
                {visibleCounts.map((items, index) => (
                  <div
                    key={index}
                    className="w-full h-56 md:h-64  shadow-2xl rounded-2xl flex justify-center relative cursor-pointer group "
                  >
                    <img
                      src={items.imageUrl}
                      alt=""
                      className="w-full h-40 lg:h-48 object-cover rounded-2xl transform hover:scale-95 duration-500 p-2"
                    />
                    <div className="absolute bottom-3 md:bottom-10 lg:bottom-3">
                      <h1 className="font-[poppins] lg:text-[16px] font-bold">
                        {items.menuName}
                      </h1>
                      <h1 className="font-[poppins] lg:text-[16px] font-medium text-red-900">
                        Rs. {items.price}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
         {visibleCount < filterItems.length && (
  <div className="flex justify-center mt-5">
    <button
      className="bg-amber-600 text-white px-5 py-2 text-[18px] font-['poppins'] cursor-pointer rounded hover:bg-amber-700 transition duration-300"
      onClick={() => setVisibleCount((prev) => prev + 10)}
    >
      View More
    </button>
  </div>
)}
        </div>
        <Footer/>
      </main>
    </>
  );
};

export default Home;

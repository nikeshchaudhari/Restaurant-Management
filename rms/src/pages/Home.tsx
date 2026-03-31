import { ArrowDownToDot, Search } from "lucide-react";
import logo from "../assets/logo.png";
import herobg from "../assets/herobg.png";
import food from "../assets/food.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AllMenu from "./ui/AllMenu";
import MenuSlide from "../components/MenuSlide";

interface MenuItems {
    menuName: string;
    price: string;
    category: string;
    available: string;
    description: string;
    imageUrl: string;
  }
const Home = () => {
  
  const [menu, setMenu] = useState<MenuItems[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [filterMenu, setFilterMenu] = useState<MenuItems[]>([]);
  

  const allMenuRef = useRef<HTMLDivElement>(null) 
  const menuScroll = ()=>{{
    allMenuRef.current?.scrollIntoView({behavior:"smooth"});
  }};
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

  // category show only

  const showCategory = (menus: string, index: number) => {
    setActive(index);
    if (menus === "All") {
      setFilterMenu(menu);
      console.log(menu);
    } else {
      const filterMenu = menu.filter((item) => item.category === menus);
      setFilterMenu(filterMenu);
      console.log(filterMenu);
    }
  };

  return (
    <>
      <main className="overflow-x-hidden w-full max-w-full">
        <MenuSlide/>
        <nav className="shadow-lg bg-white h-20 md:h-20 flex items-center md:justify-around sticky top-0 z-50 w-full">
          <div className="hidden md:flex items-center  ">
            <img
              src={logo}
              alt=""
              className="ml:10 lg:ml-20 w-15 h-15 p-2 hidden md:block cursor-pointer   "
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

        
        {/* mobile view */}

        <div>

        </div>
        {/* Hero section--- */}

        <section className="relative mt-2  flex items-center overflow-hidden">
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
                
                  <button className="text-[clamp(12px,2vw,20px)] font-['poppins'] cursor-pointer" onClick={menuScroll}>
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
          <div className="w-screen grid justify-items-center mt-10 px-5 ">
            <div className="flex flex-wrap gap-4 w-[80vw]">
              {category.map((items, index) => (
                <button
                  key={index}
                  onClick={() => showCategory(items, index)}
                  className={`px-2 md:py-2 md:px-5 lg:px-8 font-[poppins] rounded-full border border-amber-500 cursor-pointer hover:bg-[#FF8000] hover:text-white transition duration-500 ${active === index ? "bg-[#FF8000] text-white" : "border border-[#FF8000]"}`}
                >
                  {items}
                </button>
              ))}
            </div>
          </div>
        </div>

       <div ref={allMenuRef}>
         <AllMenu menu={filterMenu.length ?filterMenu:menu} />
       </div>
      </main>
    </>
  );
};

export default Home;

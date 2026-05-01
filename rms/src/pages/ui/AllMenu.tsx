import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import type { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../../features/CartSlice";
import { openCart } from "../../features/CartOpen";
import CartUi from "./CartUi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MenuSlide from "../../components/MenuSlide";
import OrderSlide from "../../components/OrderSlide";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface MenuItems {
  menuName: string;
  price: string;
  category: string;
  available: string;
  description: string;
  imageUrl: string;
  length: number;
}

// interface Tabel {
//   _id: string;
// }
const AllMenu = () => {
  const [menu, setMenu] = useState<MenuItems[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [selectCategory, setSelectCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage, setRowPage] = useState(15);

  const dispatch: AppDispatch = useDispatch();

  const [parms] = useSearchParams();
  console.log(parms);

  const querySearch = parms.get("search") || "";
  console.log(querySearch);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  // fetch all menu

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get("http://localhost:3000/menu/all-menu");

      const menuData: MenuItems[] = res.data.allMenu;
      setMenu([...menuData].reverse());

      const uniqueCategory = [
        "All",
        ...new Set(menuData.map((item) => item.category)),
      ];
      setCategory(uniqueCategory);
    };
    fetchMenu();
  }, []);

  // cart

  const handleCart = (item: any) => {
    dispatch(addToCart(item));
    dispatch(openCart(item));
  };

  // filterMenu

  const filterMenu = menu
    .filter((items) =>
    {
      const matchCategory = selectCategory === "All"|| items.category === selectCategory;
      const matchSearch = items.menuName.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()) ||
      items.category.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim());

      return matchCategory && matchSearch;
    }
    
    )
   

  const handleCategory = (items: any) => {
    // console.log(items);
    setSelectCategory(items);
  };

  // pagination

  const indexOfLastPage = currentPage * rowPage;
  const indexOfFirstPage = indexOfLastPage - rowPage;
  const currentItems = filterMenu.slice(indexOfFirstPage, indexOfLastPage);
  const totalPage = Math.ceil(filterMenu.length / rowPage);
  // console.log(indexOfLastPage, indexOfFirstPage, totalPage, currentItems);

  return (
    <>
     <Helmet>
          <title>Endcodes Nepal Restaurant | View All Menu List</title>
          <meta name="description" content="Best food ordering system" />
        </Helmet>
      <main className="">
        <Navbar  />
        <div className=" md:flex  ">
          <div className="hidden md:block">
            <UiSlider />
          </div>
          <section className="px-5 overflow-hidden  relative ">
            <div>
              <h2 className=" py-5  lg:text-[22px] font-['poppins'] font-semibold">
                Step 2: Take Order
              </h2>
            </div>

            <div className=" w-full bg-white border border-amber-500/20 rounded-2xl  flex items-center justify-center md:justify-start p-2 md:p-5 gap-4 mb-5">
              <div className="flex flex-wrap gap-4 w-[80vw]">
                {category.map((items, index) => (
                  <button
                    key={index}
                    className={`border border-amber-600 px-5 py-1 rounded-full cursor-pointer hover:bg-red-800 hover:text-white transition duration-300 font-['poppins'] ${
                      selectCategory === items
                        ? "bg-red-800 text-white"
                        : "bg-white text-black hover:bg-red-100"
                    }`}
                    onClick={() => handleCategory(items)}
                  >
                    {items}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full mb-20">
              {filterMenu.length === 0 ? (
                <div className="w-full  flex flex-col justify-center items-center h-80">
                  <h2 className="text-[20px]">No items Founds</h2>
                  <button
                    className="bg-red-800 w-20 h-10 m-2 rounded-sm hover:bg-red-700 text-white cursor-pointer"
                    onClick={() => {
                      setSearch("");
                      setSelectCategory("All");
                    }}
                  >
                    Refresh
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
                  {currentItems.map((items, index) => (
                    <div
                      key={index}
                      className="w-full h-56 md:h-60  shadow-2xl rounded-2xl flex justify-center relative cursor-pointer group overflow-x-auto "
                    >
                      <img
                        src={items.imageUrl}
                        alt=""
                        className="w-full h-40 lg:h-48 object-cover rounded-2xl transform hover:scale-95 duration-500 p-2"
                      />
                      <div className="absolute bottom-10 md:bottom-14 lg:bottom-3">
                        <h1 className="font-[poppins] text-[12px] lg:text-[16px] font-bold line-clamp-1">
                          {items.menuName}
                        </h1>
                      </div>

                      <div className="absolute flex flex-col md:flex-row justify-between items-center top-3 w-auto   md:w-full px-3 ">
                        <h3 className="bg-red-800 px-4 py-1 rounded-full text-white font-[poppins] text-[12px] md:text-[12px] mb-1 md:mb-0">
                          {items.available}
                        </h3>
                        <h3 className="bg-yellow-800 px-4 py-1 rounded-full text-white font-[poppins]  text-[12px] md:text-[12px]">
                          Rs.{items.price}
                        </h3>
                      </div>

                      <div className=" absolute w-full bottom-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500">
                        <div
                          className={`text-center flex items-center justify-center  h-8 md:h-12 ${
                            items.available === "unavailable"
                              ? "cursor-not-allowed"
                              : "bg-[#3a230c] text-white cursor-pointer"
                          }`}
                          onClick={() => {
                            if (items.available === "unavailable") return;
                            handleCart(items);
                          }}
                        >
                          <h1 className="font-[poppins] text-[12px] lg:text-[18px] md:font-bold">
                            {items.available === "available"?"Order Now":""}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* pagination */}

                  <div className="absolute w-full  bottom-0 z-50 flex items-center justify-end gap-5 mb-5">
                    <div
                      className={` rounded-full transition duration-500 ${
                        currentPage === 1
                          ? " text-black/10 cursor-not-allowed"
                          : " hover:bg-red-800 cursor-pointer hover:text-white "
                      } `}
                    >
                      <ChevronLeft
                        size={35}
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      />
                    </div>
                    <span className="text-[20px] font-['poppins']">
                      {currentPage} ....... {totalPage}
                    </span>
                    <div
                      className={`mr-10 rounded-full transition duration-500 ${
                        currentPage === totalPage
                          ? " text-black/10 cursor-not-allowed"
                          : " hover:bg-red-800 cursor-pointer hover:text-white "
                      }`}
                    >
                      <ChevronRight
                        size={35}
                        onClick={() =>
                          setCurrentPage((next) =>
                            Math.min(next + 1, totalPage),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <CartUi />
            <OrderSlide />
          </section>
        </div>
      </main>
    </>
  );
};

export default AllMenu;

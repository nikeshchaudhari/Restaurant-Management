import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, cartSlice } from "../../features/CartSlice";
import { openCart } from "../../features/CartOpen";
import CartUi from "./CartUi";

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
  const table: any = useSelector(
    (state: RootState) => state.table.selectedTable,
  );
  console.log(table);

  const dispatch: AppDispatch = useDispatch();

  // fetch all menu

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get("http://localhost:3000/menu/all-menu");

      const menuData: MenuItems[] = res.data.allMenu;
      setMenu(res.data.allMenu);

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

  return (
    <>
      <main className="">
        <Navbar />
        <div className="md:flex ">
          <UiSlider />

          <section className="px-5 overflow-hidden ">
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
                    className={`border border-amber-600 px-5 py-1 rounded-full cursor-pointer hover:bg-red-800 hover:text-white transition duration-300 font-['poppins']`}
                  >
                    {items}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {menu.map((items, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="w-full h-56 md:h-60  shadow-2xl rounded-2xl flex justify-center relative cursor-pointer group "
                    >
                      <img
                        src={items.imageUrl}
                        alt=""
                        className="w-full h-40 lg:h-48 object-cover rounded-2xl transform hover:scale-95 duration-500 p-2"
                      />
                      <div className="absolute bottom-10 md:bottom-14 lg:bottom-3">
                        <h1 className="font-[poppins] lg:text-[18px] font-bold">
                          {items.menuName}
                        </h1>
                      </div>

                      <div className="absolute flex justify-between items-center top-3 w-full px-3">
                        <h3 className="bg-red-800 px-4 py-1 rounded-full text-white font-[poppins] text-[12px] md:text-[14px]">
                          {items.available}
                        </h3>
                        <h3 className="bg-yellow-800 px-4 py-1 rounded-full text-white font-[poppins]  text-[12px] md:text-[14px]">
                          Rs.{items.price}
                        </h3>
                      </div>

                      <div className=" absolute w-full bottom-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500">
                        <div
                          className="text-center flex items-center justify-center bg-[#3a230c] text-white h-8 md:h-12"
                          onClick={() => handleCart(items)}
                        >
                          <h1 className="font-[poppins] text-[12px] lg:text-[18px] md:font-bold">
                            Order Now
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <CartUi />
          </section>
        </div>
      </main>
    </>
  );
};

export default AllMenu;

import {
  Hamburger,
  HamIcon,
  Search,
  ShoppingBag,
  User2Icon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../features/CartOpen";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { menuOpen } from "../features/menuSlice";
import UiSlider from "./UiSlider";

const Navbar = ({ search, setSearch }: any) => {
  // const [search, setSearch] = useState("");

  const isLoggedIn: any = useSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  // const user: any = useSelector((state: RootState) => state.auth.user);
  const userProfile: any = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const profileHandle = () => {
    navigate("/food-order/profile");
  };

  //
  const cartHandle = () => {
    if (cart.length === 0) return;
    dispatch(openCart());
  };
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartCount = cart.length;

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/food-order/all-menu?search=${search.trim()}`);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <>
      <>
        <div className=" w-full h-16 bg-white shadow-lg flex items-center md:justify-around fixed top-0 z-40  ">
          <div className="md:px-4 w-auto">
            <h2 className="font-['poppins']  lg:text-[25px] font-bold hidden md:block">
              Hamro Restor
            </h2>
          </div>
          <div className="relative w-full md:w-auto flex items-center h-full  px-4 md:px-0 ">
            <input
              value={search}
              type="text"
              placeholder="Search Items..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnter}
              className="w-full md:w-[73vw] border border-red-800 outline-none focus:ring-1 focus:ring-red-800 h-2/3  pl-12 pr-24 rounded-full  font-['poppins'] "
            />
            <Search className="absolute left-8  md:left-5" />
            <button
              className="absolute right-5 md:right-1 bg-red-900 rounded-full px-3 py-1 md:px-5 md:py-1 text-white cursor-pointer font-['poppins'] "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div
            className="cursor-pointer md:px-5 lg:px-0 hidden md:block hover:text-red-900 transation duration-300 relative "
            onClick={cartHandle}
          >
            <ShoppingBag />
            <span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </span>
          </div>
          <div className="pr-5 hidden lg:block" onClick={profileHandle}>
            {isLoggedIn && (
              <div className="relative  group cursor-pointer">
                <div className=" ">
                  <img
                    src={userProfile.profileImage}
                    alt=""
                    className=" md:w-5 lg:w-8 border rounded-full border-amber-900/60  hover:border-amber-700 "
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="block md:hidden mr-5 "
            onClick={() => setIsOpen(!isOpen)}
          >
            <RxHamburgerMenu onClick={() => dispatch(menuOpen())} size={25} />
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;

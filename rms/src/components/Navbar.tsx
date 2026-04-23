
import { Search, ShoppingBag, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../features/CartOpen";

const Navbar = ({ search, setSearch }: any) => {
  // const [user, setUser] = useState<any>(null);

  const isLoggedIn: any = useSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  // const user: any = useSelector((state: RootState) => state.auth.user);
  const userProfile: any = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();


  return (
    <>
      <>
        <div className=" w-full h-15 bg-white shadow-lg flex items-center md:justify-around sticky top-0 z-40  ">
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
              className="w-full md:w-[73vw] border border-red-800 outline-none focus:ring-1 focus:ring-red-800 h-2/3  pl-12 pr-3 rounded-full  font-['poppins'] "
            />
            <Search className="absolute left-8  md:left-5" />
          </div>

          <div className="cursor-pointer md:pr-5 lg:pr-0 hidden md:block" onClick={() => dispatch(openCart())}>
            <ShoppingBag />
          </div>
          <div className="pr-5 hidden lg:block">
            {isLoggedIn ? (
              <div className="relative  group cursor-pointer">
                <div className=" " >
                  <img src={userProfile.profileImage} alt="" className=" md:w-5 lg:w-8 border rounded-full border-b-amber-900/60 " />
                </div>
              </div>
            ) : (
              <p>gfdgfdg</p>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;

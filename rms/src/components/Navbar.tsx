import axios from "axios";
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
  const user: any = useSelector((state: RootState) => state.auth.user);
  const userProfile: any = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <>
        <div className=" w-full h-15 bg-white shadow-lg flex items-center justify-around sticky top-0 z-40  ">
          <div className="px-4 w-auto">
            <h2 className="font-['poppins'] text-[25px] font-bold hidden md:block">
              Hamro Restor
            </h2>
          </div>
          <div className="relative  flex items-center h-full  px-4 md:px-0 ">
            <input
              value={search}
              type="text"
              placeholder="Search Items..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[73vw] border border-red-800 outline-none focus:ring-1 focus:ring-red-800 h-2/3  pl-12 pr-3 rounded-full  font-['poppins'] "
            />
            <Search className="absolute left-8  md:left-5" />
          </div>

          <div className="cursor-pointer " onClick={() => dispatch(openCart())}>
            <ShoppingBag />
          </div>
          <div className="pr-5">
            {isLoggedIn ? (
              <div className="relative  group cursor-pointer">
                <div className=" " onClick={() => setOpen(true)}>
                  <img src={userProfile.profileImage} alt="" className="w-8 border rounded-full border-b-amber-900/60 " />
                </div>

                <div className=" w-full flex justify-center">
                  {open && (
                    <div className=" fixed inset-0  bg-black/70 flex items-center justify-center ">
                      <div className="bg-white p-6 rounded w-[40vw]  ">
                        <button
                          onClick={() => setOpen(false)}
                          className="absolute top-2 right-2"
                        >
                          X
                        </button>

                        <h2 className="font-['poppins'] font-semibold">
                          Edit Profile
                        </h2>
                        <div className="">
                          <img
                            src={userProfile.profileImage}
                            alt=""
                            className="w-18 "
                          />
                          <div className="mb-2">
                            <label htmlFor="fullName" className="mb-5">Full Name <span className="text-red-600">*</span></label>
                          <input
                            type="text"
                            className="w-full border p-1 rounded mt-2"
                          />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-5">Email <span className="text-red-600">*</span></label>
                          <input
                            type="email"
                            className="w-full border p-1 rounded mt-2"
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

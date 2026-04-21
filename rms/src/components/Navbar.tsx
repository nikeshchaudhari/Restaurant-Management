import axios from "axios";
import { Search, ShoppingBag, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({ search, setSearch }: any) => {
  const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetechUser = async () => {
      const res = await axios.get("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });

      setUser(res.data);
    };

    fetechUser();
  }, []);

  return (
    <>
      <>
        <div className=" w-full h-15 bg-white shadow-lg flex items-center justify-between sticky top-0 z-40 ">
          <div className="px-4 ">
            <h2 className="font-['poppins'] text-[25px] font-bold hidden md:block">
              Hamro Restor
            </h2>
          </div>
          <div className="relative flex items-center h-full  px-4 md:px-0">
            <input
              value={search}
              type="text"
              placeholder="Search Items..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[70vw] border border-red-800 outline-none focus:ring-1 focus:ring-red-800 h-2/3  pl-12 pr-3 rounded-full  font-['poppins'] "
            />
            <Search className="absolute left-8  md:left-5" />
          </div>

          <div className="">
            <ShoppingBag />
          </div>
          <div className="pr-10 bg-red-600">
            <img src={user?.imageUrl} alt="" />
            <h2>{user.fullName}</h2>
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;

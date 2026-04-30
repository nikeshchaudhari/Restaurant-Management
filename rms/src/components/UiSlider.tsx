import {
  ChefHat,
  LogOut,
  SendToBack,
  Table,
  TableOfContents,
  UserRoundPen,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
const UiSlider = () => {

  const menuOpen = useSelector((state:RootState)=>(state.menu.isOpen))
  const buttons = [
    {
      name: "Select Table",
      path: "/food-order",
      icon: <TableOfContents size={18} />,
    },
    {
      name: "Take Order",
      path: "/food-order/all-menu",
      icon: <ChefHat size={18} />,
    },
    {
      name: "My Orders",
      path: "/food-order/my-order",
      icon: <SendToBack size={18} />,
    },
    {
      name: "Profile",
      path: "/food-order/profile",
      icon: <UserRoundPen size={18} />,
    },
    { name: "Logout", action: "logout", icon: <LogOut size={18} /> },
  ];
  // const [active, setActive] = useState<null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (item: any) => {
    if (item.action === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("Image");
      localStorage.removeItem("FullName");

      navigate("/", { replace: true });

      return;
    }

    navigate(item.path);
  };
  return (
    <>
      <div className="sticky top-0 min-h-screen ">
        <aside className=" md:w-[15vw] lg:w-[16vw] sticky top-10 h-[calc(100vh-4rem)] border-r border-gray-300 p-3  bg-white">
          <div>
            <h3 className="text-center md:p-5 md:text-[12px] lg:text-[15px] font-['poppins'] text-gray-400">
              Waiter Menu
            </h3>
          </div>
          <div className="">
            <ul className="flex justify-center flex-col   lg:px-2 ">
              {buttons.map((item, index: any) => (
                <div>
                  <li
                    key={index}
                    onClick={() => {
                      handleLogout(item);
                    }}
                    className={` flex  items-center  gap-2 lg:py-2 bg-[#faefee] hover:bg-[#e0e0e0]/30 w-full rounded  cursor-pointer md:mb-3 lg:mb-1 font-['poppins'] md:text-[12px] lg:text-[16px]  font-semibold px-5 ${
                      location.pathname === item.path
                        ? "bg-[#eb9e95] text-red-800"
                        : "bg-white"
                    }`}
                  >
                    {item.icon}
                    <span> {item.name}</span>
                  </li>
                </div>
              ))}
            </ul>
            
          </div>
        
        </aside>


      </div>
    </>
  );
};

export default UiSlider;

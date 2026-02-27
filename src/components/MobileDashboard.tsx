
import adminLogo from "../assets/adminlogo.png";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { menuClose } from "../features/menuSlice";
const MobileDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);
  // const [isOpen, SetIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* <button
        className="md:hidden p-2 m-4 text-white bg-blue-600 rounded"
        onClick={() => SetIsOpen(true)}
      >
        Open Menu
      </button> */}

      {Open && (
        <div
          className="md:hidden fixed top-0 left-0 w-screen h-screen bg-black/70 z-10"
          onClick={() => {
            dispatch(menuClose());
          }}
        ></div>
      )}

      <aside
        className={`md:hidden bg-[rgb(16,34,55)] w-64 h-screen fixed right-0 top-0 z-10 ${
          Open ? "fixed left-0" : "-left-100"
        }`}
      >
        <div className="py-2 flex items-center gap-2 mt-5 mx-4  ">
          <img src={adminLogo} alt="" className="w-5 h-5" />
          <h1 className="text-white text-[16px] font-bold">RMS Admin</h1>
        </div>
        <span
          className="absolute top-6 right-3"
          onClick={() => {
           dispatch(menuClose())
          }}
        >
          <RxCross2 className="text-white text-3xl" />
        </span>

        <ul className="mt-5 flex-1 overflow-y-auto ">
          <Link to="/dashboard/admin" onClick={()=>
            dispatch(menuClose())
          }>
            <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">
              Dashbaord
            </li>
          </Link>
          <Link
            to="/dashboard/useradd"
            onClick={() => {
             dispatch(menuClose());
            }}
          >
            <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Users</li>
          </Link>

        <Link to="/dashboard/menu" onClick={()=>dispatch(menuClose())}>
          <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Menus</li>
        </Link>
          <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Tables</li>
          <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Orders</li>
          <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Reports</li>
          <li className="bg-[#1F354D] p-2 text-white px-10 mb-3">Setting</li>
        </ul>
        <div className="absolute bottom-0 left-0 w-full bg-[#1F354D] p-4 text-white text-center  font-bold flex gap-5 items-center  justify-center">
          <FiLogOut className="text-2xl" />
          <button className="text-[20px]">Logout</button>
        </div>
      </aside>
    </>
  );
};

export default MobileDashboard;

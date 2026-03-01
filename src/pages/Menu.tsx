import { useDispatch, useSelector } from "react-redux";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { MenuIcon, X } from "lucide-react";
import { menuOpen } from "../features/menuSlice";
import { useState, type ReactElement } from "react";
const Menu = () => {
  const[menuName,setMenuName]= useState<string>("")
  const[price,setPrice]= useState<string>("")
  const[category,setCategory]=useState<string>("")
  const [available, setAvailable] = useState<string>("available");
const [photo,setPhoto]= useState<null>(null)
  const dispatch: AppDispatch = useDispatch();
  const Open = useSelector((state: RootState) => state.menu.isOpen);

  
  const formHandle =async(e:React.FormEvent<HTMLFormElement>)=>{
 e.preventDefault()
    // 
  const formData = new FormData();
  formData.append("menuName",menuName);
  formData.append("price",price);
  formData.append("category",category);
  formData.append("available",available);
if(photo){
  formData.append("photo",photo);
}
try{

}catch(err){
  
}
 
  }
   
  
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-screen bg-[#E9E9E9] overflow-hidden">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Menu</h1>
            <Link to="/login">
              {" "}
              <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
                Logout
              </button>
            </Link>
            <span className="md:hidden" onClick={() => dispatch(menuOpen())}>
              {Open ? <X /> : <MenuIcon />}
            </span>
          </div>
          {/* Add Menu Form */}
          <div className=" flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form onSubmit={formHandle} className="bg-white w-full md:w-250 h-full mt-5 rounded-md p-5">
              <h1 className="text-2xl font-medium mb-3">Menu Add</h1>
              <input
                type="text"
                placeholder="Enter Menu Name"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <input
                type="text"
                placeholder="Enter Price"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <input
                type="text"
                placeholder="Enter Category"
                className="border border-gray-300 outline-none w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <div className="flex gap-2 mb-3 ">
                <label htmlFor="">
                  <input
                    type="radio"
                    name="available"
                    className="cursor-pointer"
                    value="available"
                    checked={available === "available"}
                    onChange={(e) => setAvailable(e.target.value)}
                  />
                </label>
                Available
                <label htmlFor="">
                  <input
                    type="radio"
                    name="no available"
                    value="no available"
                    checked={available === "no available"}
                    onChange={(e)=>setAvailable(e.target.value)}
                    
                    className="cursor-pointer"
                  />
                </label>
                No Available
              </div>

              <input
                type="file"
                placeholder="Enter Price"
                className="border border-gray-300 outline-none cursor-pointer  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
              />
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#080833] p-2 rounded text-white md:font-bold cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  Add Menu
                </button>
              </div>
            </form>
          </div>

          {/* View All Menu */}
          <div className=" md:flex justify-center  overflow-x-auto p-5">
            <table className="bg-white min-w-50 w-full md:w-250 h-full mt-5 rounded-md "></table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;

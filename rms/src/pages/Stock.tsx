import { useState } from "react";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  // interface
  interface ItemsData {
    _id: any;
    materialName: string;
    quantity: string;
  }

  const [materialName, setMaterialName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [material, setMaterial] = useState<ItemsData[]>([]);
  const [editMaterial, setEditMaterial] = useState<ItemsData | null>(null);
 



  const logoutHandle =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("FullName")
    window.location.href = "/login";
  }

  return (
    <>
      <main className="flex">
        <Slide />
        <MobileDashboard />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Stocks</h1>
            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300" onClick={logoutHandle}>
              Logout
            </button>
            <span className="md:hidden"></span>
          </div>

          {/* form */}
          <div className="max-w-full flex justify-center p-2 md:p-0 mx-5 md:mx-2 lg:mx-0">
            <form className="bg-white w-full md:w-full md:mx-5 h-full mt-5 rounded-md p-5">
              <h1 className="text-2xl font-medium mb-3">Add Raw Material</h1>
              <input
                type="text"
                placeholder="Material Name (eg. Rice)"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                name="materialName"
                value={materialName}
                onChange={(e)=>setMaterialName(e.target.value)}

                
              />
              <input
                type="text"
                placeholder="Quantity"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
                value={quantity}
                onChange={(e)=>{
                    setQuantity(e.target.value)
                }}
              />
              <div className="w-full flex ">
                <button
                  type="submit"
                  className=" bg-[#080833] px-6 py-2 rounded text-white cursor-pointer transition hover:bg-[#232341] duration-300"
                >
                  Add Materials
                </button>
              </div>
            </form>
          </div>

          {/* Data View */}
          <div className=" md:flex justify-center  overflow-x-auto p-5">
            <table className="bg-white w-full  h-full mt-5 rounded-md ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th className=" px-4 py-2 text-left ">Material Name</th>
                  <th className=" px-4 py-2 text-left ">Quantity</th>
                  <th className=" px-4 py-2 text-left ">Action</th>
                </tr>
              </thead>

              <tbody></tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Stock;

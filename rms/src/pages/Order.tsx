import { useNavigate } from "react-router-dom";
import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";

const Order = () => {
const navigate = useNavigate()


    const logoutHandle =()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
    }
  return (
    <>
      <main className="md:flex">
        <MobileDashboard />

        <Slide />
        <section className="w-full  bg-[#E9E9E9] min-h-screen  ">
          <div className="flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">

             <h1 className="mx-2 md:text-[20px] font-bold">
             Orders
            </h1>
            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300" onClick={logoutHandle}>
                Logout
              </button>
          </div>

          <div className=" md:flex justify-center  overflow-x-auto p-5">

            <table className="bg-white  w-full  h-full mt-5  ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th className=" px-4 py-2 text-left ">Order Id</th>
                  <th className=" px-4 py-2 text-left ">Table</th>
                  <th className=" px-4 py-2 text-left ">Items</th>
                  <th className=" px-4 py-2 text-left ">Total Amount</th>
                  <th className=" px-4 py-2 text-left ">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td  className=" px-2 md:px-4 py-2">#301</td>
                  <td  className=" px-2 md:px-4 py-2">T1</td>
                  <td  className=" px-2 md:px-4 py-2">Momo x 3 </td>
                  <td  className=" px-2 md:px-4 py-2">Rs.360</td>
                  <td  className=" px-2 md:px-4 py-2">
                    <select name="" id=""   className="border border-gray-300 outline-none  p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                      <option value="">--SELECT STATUS--</option>
                      <option value="serve" >Serve</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Order;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import type { AppDispatch, RootState } from "../../store/store";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../features/CartSlice";

import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";

// import { openCart } from "../../features/CartOpen";
// import CartUi from "./CartUi";
// import { Table } from "lucide-react";
// import { setTable } from "../../features/TableSlice";
// interface MenuItems {
//   menuName: string;
//   price: string;
//   category: string;
//   available: string;
//   description: string;
//   imageUrl: string;
//   length: number;
// }
// type props = {
//   menu: MenuItems[];
// };

// interface Table {
//   _id: string;
//   tableNumber: string;
//   capacity?: string;
//   status: "available" | "unavailable";
// }
// const AllMenu = ({ menu }: props) => {
//   const location = useLocation();

//   const finalMenu: MenuItems[] = menu || location.state?.menu || [];
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   // const [tables, setTables] = useState<Table[]>([]);
//   const [selectedTable, setSelectedTable] = useState<any>(null);
//   const navigate = useNavigate();

//   const dispatch: AppDispatch = useDispatch();
//   const Cart = useSelector((state: RootState) => state.cart.items);
//   const tables = useSelector((state: RootState) => state.table.tables);

//   // fetchTable
//   const fetchTable = async () => {
//     const res = await axios.get("http://localhost:3000/table/all-table");
//     dispatch(setTable(res.data.allData));
//     console.log(res.data.allData);
//   };
//   useEffect(() => {
//     fetchTable();
//   }, []);

//   // handle orderclick
//   const handleClickOrder = (item: any) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     setSelectedItem(item);
//   };

//   // Table Handle

//   const handleTable = (table: Table) => {
//     if (!selectedItem) return;

//     dispatch(
//       addToCart({
//         menuId: selectedItem._id,
//         name: selectedItem.menuName,
//         price: selectedItem.price,
//         image: selectedItem.imageUrl,

//         tableId: table._id,
//         tableNumber: table.tableNumber,

//         quantity: 1,
//       }),
//     );

//     dispatch(openCart());
//     setSelectedItem(null);
//   };
//   // console.log(handleTable);

//   // useEffect(()=>{

//   //   const fetchTable =async ()=>{
//   //     const res = await axios.get("http://localhost:3000/table/all-table");
//   //     setTables(res.data.Table)
//   //   }

//   //   fetchTable()
//   // },[])
//   return (
//     <>
//       <main className="flex justify-center">
//         <CartUi />
//         <section className=" w-[90%]  ">
//           <h1 className="text-center font-['poppins'] text-[18px] md:text-[25px] lg:text-[30px] font-bold mt-10">
//             Menu
//           </h1>
//           <div className="mt-5 ">
//             {finalMenu.length === 0 ? (
//               <div className="flex flex-col items-center   justify-center mb-10 ">
//                 <h3 className="text-xl font-bold text-red-500">
//                   {" "}
//                   Oops! Something went wrong
//                 </h3>
//                 <p className="text-gray-500">Please try again later</p>

//                 <button
//                   className="mt-4 px-5 py-2 bg-black text-white rounded cursor-pointer"
//                   onClick={() => window.location.reload()}
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
//                 {finalMenu.map((items, index) => (
//                   <div
//                     key={index}
//                     className="h-60 w-full shadow-2xl rounded-2xl flex justify-center relative cursor-pointer group "
//                   >
//                     <img
//                       src={items.imageUrl}
//                       alt={items.menuName}
//                       className=" w-full h-48 object-cover rounded-2xl transform hover:scale-95 duration-500 p-2"
//                     />
//                     <div className="absolute w-full bottom-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 ">
//                       <div
//                         className="text-center flex items-center justify-center bg-[#3a230c] text-white h-12   "
//                         onClick={() => {
//                           handleClickOrder(items);
//                           setSelectedTable(null);
//                         }}
//                       >
//                         <h2 className="lg:text-[18px] font-['poppins'] font-semibold ">
//                           Order Now
//                         </h2>
//                       </div>
//                     </div>

//                     <div className="absolute bottom-3">
//                       <h1 className="font-[poppins] lg:text-[18px] font-bold">
//                         {items.menuName}
//                       </h1>
//                     </div>
//                     <div className="absolute top-3 text-[10px] md:text-[12px]  md:left-3   md:top-3 lg:left-5 lg:top-4 bg-[#FF8000] rounded-2xl px-3  md:px-2 py-1  text-white font-['poppins']">
//                       <h2>{items.available}</h2>
//                     </div>
//                     <div className="absolute top-10 text-[10px] md:text-[12px]  md:right-3 md:top-3  lg:right-5 lg:top-4 bg-[#3a230c] rounded-2xl px-3  md:px-2 py-1  text-white font-['poppins']">
//                       <h2>Rs. {items.price}</h2>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* table  */}

//         {selectedItem && !selectedTable && (
//           <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-5 rounded w-1/2">
//               <h2 className="text-xl font-bold font-['poppins']">
//                 Select Table
//               </h2>

//               <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-3">
//                 {tables?.map((table, index) => (
//                   <button
//                     disabled={table.status === "unavailable"}
//                     key={table._id}
//                     onClick={() => handleTable(table)}
//                     className={`border md:p-4 rounded font-['poppins'] text-[12px] md:w-20 cursor-pointer ${
//                       table.status === "unavailable"
//                         ? "bg-black/80 cursor-not-allowed"
//                         : "hover:bg-gray-200"
//                     }`}
//                   >
//                     {table.tableNumber}
//                     <br />
//                     {/* {table.capacity} Person */}
//                   </button>
//                 ))}
//               </div>

//               <div className=" ">
//                 <button
//                   className="mt-3  px-5 py-2 hover:bg-amber-700 text-white cursor-pointer transition duration-500 bg-amber-600 rounded"
//                   onClick={() => setSelectedItem(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

// export default AllMenu;

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

                      <div className=" absolute w-full bottom-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 ">
                        <div className="text-center flex items-center justify-center bg-[#3a230c] text-white h-8 md:h-12   ">
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
          </section>
        </div>
      </main>
    </>
  );
};

export default AllMenu;

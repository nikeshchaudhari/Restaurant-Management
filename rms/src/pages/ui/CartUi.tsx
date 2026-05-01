import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { closeCart } from "../../features/CartOpen";
import { Minus, Plus, X } from "lucide-react";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeCart,
} from "../../features/CartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setSelectedTable } from "../../features/TableSlice";

const CartUi = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cartUi.isCartOpen);

  const cart = useSelector((state: RootState) => state.cart.items);
  // console.log(cart);
  const selectTable = useSelector(
    (state: RootState) => state.table.selectedTable,
  );
  // console.log("Table", selectTable);

  const navigate = useNavigate();

  const totalPrice = cart.reduce((t, i: any) => t + i.price * i.quantity, 0);
  // console.log(totalPrice);

  // confirm order
  const token = localStorage.getItem("token");

  const confirmOrder = async () => {
    if (!selectTable) {
      toast.error("Select a table first");
      return;
    }

    const payload = {
      tableId: selectTable?._id,
      tableNumber: selectTable?.tableNumber,
      items: cart.map((i: any) => ({
        menuId: i._id,
        menuName: i.menuName,
        price: i.price,
        qty: i.quantity,
        totalAmount: i.price * i.quantity,
      })),
      totalAmount: totalPrice,

      status: "preparing",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/order/order",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(closeCart());
      setSelectedTable(null);
      localStorage.removeItem("selectedTable");

      toast.success("Order Successfully !");
      navigate("/food-order");

      setTimeout(() => {
        window.print();

        setTimeout(() => {
          dispatch(clearCart());
        },200);
      }, 200);
    } catch (err) {
      toast.error("Order Failed");
      console.log("error");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => dispatch(closeCart())}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[40vw] h-full bg-white z-50
        flex flex-col transform transition-transform duration-500
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between px-5 py-4 border-b">
          <h2 className="text-[20px] font-semibold">Add Items</h2>

          <X
            size={30}
            className="cursor-pointer"
            onClick={() => dispatch(closeCart())}
          />
        </div>

        {/* ITEMS (SCROLL AREA) */}
        <div className="flex-1 overflow-y-auto">
          {cart.map((items: any) => (
            <div
              key={items._id}
              className="flex justify-between items-center p-2 "
            >
              <div className="flex items-center gap-3">
                <img
                  src={items.imageUrl}
                  className="w-20 h-20 border border-gray-300 rounded p-0.5"
                />

                <div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-medium">{items.menuName}</h2>
                    <h2 className="font-['poppins']">
                      {items.quantity} X {items.price} ={" "}
                      <span className="text-red-900 ">
                        {items.price * items.quantity}
                      </span>
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="p-1 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => dispatch(decreaseQty(items._id))}
                    >
                      <Minus size={18} />
                    </div>
                    <span>{items.quantity}</span>
                    <div
                      className="p-1 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => dispatch(increaseQty(items._id))}
                    >
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <X
                className="cursor-pointer"
                onClick={() => dispatch(removeCart(items._id))}
              />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t p-4 flex gap-2 ">
          <h2 className="font-['poppins'] font-bold">Total Price : </h2>
          <h2 className="font-['poppins'] text-red-900">Rs.{totalPrice}</h2>
        </div>
        <button
          className={` p-2 mx-4 md:mx-2 mb-10 md:mb-2 rounded text-white font-['poppins']  transition-all transform  text-[18px] font-medium  ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-900 cursor-pointer hover:bg-red-800 transition-all transform hover:-translate-y-1 duration-500"
          }`}
          disabled={cart.length === 0}
          onClick={confirmOrder}
        >
          Order Confirm
        </button>
      </div>

      <div id="invoice" className="hidden print:block p-5">
        <h2 className="text-center font-medium text-xl">
          Endocdes Nepal Pvt.Ltd.
        </h2>
       <div className="flex justify-center"> <span className="text-center">Address: Balkot Bhaktapur</span></div>
        <p>Table: {selectTable?.tableNumber}</p>
        <hr />

        {cart.map((item: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>
              {item.menuName} x {item.quantity}
            </span>
            <span>Rs. {item.price * item.quantity}</span>
          </div>
        ))}

        <hr />
        <h3 className="font-bold text-end">Total: Rs. {totalPrice}</h3>
      </div>
    </>
  );
};

export default CartUi;

import { Minus, Plus, X, Table } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import cartUi, { closeCart, openCart } from "../../features/CartOpen";
import type { AppDispatch, RootState } from "../../store/store";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeCart,
} from "../../features/CartSlice";
import { RiAddLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CartUi = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartUi = useSelector((state: RootState) => state.cartUi.isCartOpen);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = useState<number>(1);  

  const handleOrder = async () => {
    if (cart.length === 0) return;

    const orderId = "Ord" + Date.now();
    const totalAmount = cart.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);

    const orderPayload = {
      tableId:cart[0]?.tableId,
      orderId,
      tableNumber: cart[0]?.tableNumber,
      items: cart,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/order/order",
        orderPayload,
      );
      console.log(res.data);
      

      toast.success("Order Placed Successfully..");
      dispatch(clearCart());
      dispatch(closeCart());

     

     window.location.reload()
      
    } catch (err) {
      toast.error("Error");
    }

    

    console.log("All order",orderPayload);
  };
  return (
    <>
      {/* Overlay */}
      {cartUi && (
        <div
          className={`fixed top-0 right-0 h-full w-full bg-black opacity-50 cursor-pointer z-70  `}
          onClick={() => dispatch(closeCart())}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full md:w-[40%] bg-white h-full z-90 transform transition-transform duration-500  overflow-y-auto ${
          cartUi ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between px-5 py-4 border-b">
          <h1 className="text-xl md:text-2xl font-bold">Items Cart</h1>

          <X className="cursor-pointer" onClick={() => dispatch(closeCart())} />
        </div>
        {/* producr details */}

        <div className="flex-grow overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex justify-center items-center h-full text-lg">
              <p>No products in the cart.</p>
            </div>
          ) : (
            cart.map((item, index) => {
              const quantity = item.quantity;
              const price = Number(item.price);

              return (
                <div
                  key={item.menuId}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="border w-20 h-20 flex justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 mx-4">
                    <h1 className="text-sm md:text-base">{item.name}</h1>
                    <p className="text-sm md:text-base">
                      {item.quantity} x Rs.{item.price} = Rs.{quantity * price}
                    </p>
                    <div className="flex gap-5 items-center bg-white w-20 p-2 ">
                      <div
                        className="hover:bg-black/5 p-2 rounded bg-gray-400/20 cursor-pointer"
                        onClick={() => dispatch(decreaseQty(item.menuId))}
                      >
                        <FaMinus />
                      </div>
                      <span>{quantity}</span>
                      <div
                        className="hover:bg-black/5 p-2 rounded bg-gray-400/20 cursor-pointer"
                        onClick={() => dispatch(increaseQty(item.menuId))}
                      >
                        <RiAddLine />
                      </div>
                    </div>
                  </div>

                  <div>
                    <X
                      className="cursor-pointer"
                      onClick={() => dispatch(removeCart(item.menuId))}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* confirm order */}

        {cart.length > 0 && (
          <div className="border-t p-4 w-full bg-white sticky  bottom-0">
            {(() => {
              const grandTotal = cart.reduce((total, item) => {
                return total + item.quantity * Number(item.price);
              }, 0);

              return (
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              );
            })()}
            <button
              className="w-full mt-3 bg-black text-white py-2 rounded cursor-pointer"
              onClick={handleOrder}
            >
              {" "}
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartUi;

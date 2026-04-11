import { Minus, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import cartUi, { closeCart, openCart } from "../../features/CartOpen";
import type { AppDispatch, RootState } from "../../store/store";
import { removeCart } from "../../features/CartSlice";
import { RiAddLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";

const CartUi = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartUi = useSelector((state: RootState) => state.cartUi.isCartOpen);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = useState<number>(1);

  // handle quantity

  const handleIncrease = () => {
    setQuantity((add) => Math.min(add + 1, 10));
  };

  const handleDecrease = () => {
    setQuantity((sub) => Math.max(sub - 1, 1));
  };

  const handleAddCart = (item: any) => {
    const alreadyAdd = cart.find((f: any) => f.menuId === item._id);

    if (alreadyAdd) {
      toast.error("Already Add Products..");
    } else {
      toast.success("Add to cart");

      console.log(quantity);
    }
  };

  
  return (
    <>
      {/* Overlay */}
      {cartUi && (
        <div
          className={`fixed top-0 right-0 h-full w-full bg-black opacity-50 cursor-pointer z-70 `}
          onClick={() => dispatch(closeCart())}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full md:w-[40%] bg-white h-full z-90 transform transition-transform duration-500 ${
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
            cart.map((item, index) => (
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
                    {Number(item.quantity)} x Rs.{Number(item.price)} = Rs.
                    {Number(item.quantity) * Number(item.price)}
                  </p>
                  <div className="flex gap-5 items-center bg-white w-20 p-2 ">
                    <div
                      className="hover:bg-black/5 p-2 rounded bg-gray-400/20 cursor-pointer"
                      onClick={handleDecrease}
                    >
                      <FaMinus />
                    </div>
                    <span>{quantity}</span>
                    <div
                      className="hover:bg-black/5 p-2 rounded bg-gray-400/20 cursor-pointer"
                      onClick={handleIncrease}
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
            ))
          )}
        </div>

        {/* confirm order */}
      </div>
    </>
  );
};

export default CartUi;

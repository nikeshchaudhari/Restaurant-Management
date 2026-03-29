import axios from "axios";
import { useEffect, useState } from "react";
const AllMenu = () => {
  interface AllMenu {
    menuName: string;
    price: string;
    category: string;
    available: string;
    description: string;
    imageUrl: string;
  }

  const [Menu, setMenu] = useState<AllMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/menu/all-menu");
        setMenu(res.data.allMenu);
        console.log(res.data.allMenu);
        setError(false);
      } catch (err) {
        console.log("error", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="flex justify-center">
        <section className=" w-[90%]  ">
          <h1 className="text-center font-['poppins'] text-[18px] md:text-[25px] lg:text-[30px] font-bold mt-10">
            Menu
          </h1>
          <div className="mt-5 lg:mt-10">
            {error && (
              <div className="flex flex-col items-center   justify-center mb-10 ">
                <h3 className="text-xl font-bold text-red-500">
                  {" "}
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-500">Please try again later</p>

                <button
                  className="mt-4 px-5 py-2 bg-black text-white rounded cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            )}
            {loading ? (
              <div className="">
                <h2>Loading..</h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
                {Menu.map((items, index) => (
                  <div
                    key={index}
                    className="h-60 w-auto shadow-2xl rounded-2xl flex justify-center relative cursor-pointer group "
                  >
                    <img
                      src={items.imageUrl}
                      alt={items.menuName}
                      className=" w-full h-48 object-cover rounded-2xl transform hover:scale-95 duration-500 p-2"
                    />
                    <div className="absolute w-full bottom-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 ">
                      <div className="text-center flex items-center justify-center bg-[#3a230c] text-white h-14   ">
                        <h2 className="lg:text-[20px] font-['poppins'] font-semibold ">Order Now</h2>
                      </div>
                    </div>

                    <div className="absolute bottom-3">
                      <h1 className="font-[poppins] lg:text-[18px] font-bold">
                        {items.menuName}
                      </h1>
                    </div>
                    <div className="absolute top-3 text-[10px] md:text-[12px] lg:text-[16px] md:left-3   md:top-3 lg:left-5 lg:top-4 bg-[#FF8000] rounded-2xl px-3  md:px-2 py-1 lg:px-3 text-white font-['poppins']">
                      <h2>{items.available}</h2>
                    </div>
                    <div className="absolute top-10 text-[10px] md:text-[12px] lg:text-[16px] md:right-3 md:top-3  lg:right-5 lg:top-4 bg-[#3a230c] rounded-2xl px-3  md:px-2 py-1 lg:px-3 text-white font-['poppins']">
                      <h2>{items.price}</h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AllMenu;

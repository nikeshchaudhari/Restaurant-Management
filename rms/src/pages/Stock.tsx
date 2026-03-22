import MobileDashboard from "../components/MobileDashboard";
import Slide from "../components/Slide";

const Stock = () => {
  return (
    <>
      <main className="flex">
        <Slide />
        <MobileDashboard />
        <section className="w-screen  bg-[#E9E9E9] min-h-screen">
          <div className=" flex justify-between mx-5 mt-5 bg-white p-2 rounded-full items-center">
            <h1 className="mx-2 md:text-[20px] font-bold">Stocks</h1>
            <button className="hidden md:block rounded-full bg-[#1F354D] text-[12px] md:text-[18px] w-20 md:w-30 p-2 text-white cursor-pointer transition-all  hover:bg-[#445971]  duration-300">
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
              />
              <input
                type="text"
                placeholder="Quantity"
                className="border border-gray-300 outline-none  w-full p-2  rounded mb-3 focus:ring-1 focus:ring-blue-500 "
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
        </section>
      </main>
    </>
  );
};

export default Stock;

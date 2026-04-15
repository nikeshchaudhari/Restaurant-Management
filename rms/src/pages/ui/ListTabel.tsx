import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
const ListTabel = () => {
  return (
    <>
      <main>
        <Navbar />
        <div className="md:flex ">
          <UiSlider />

          <section className="px-5 w-full">
            <div>
              <h2 className=" py-5  text-[22px] font-['poppins'] font-semibold">
                Step 1: Select Table
              </h2>
              <div className="w-full bg-white border border-amber-500/20 rounded-2xl h-full flex items-center p-5 gap-4 mb-5">
                <div className="bg-amber-500 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300">
                  <h2 className="">Available</h2>
                </div>
                <div className="bg-red-400 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300">
                  <h2 className="">Reserved</h2>
                </div>
                <div className="bg-amber-500/40 px-5 py-2 rounded-full text-white transition transform hover:-translate-x-1 duration-300">
                  <h2 className="">Unavailable</h2>
                </div>
              </div>
            </div>

            {/* all tables */}

            <div className="w-full h-[50vh] rounded-4xl border border-amber-100 shadow-2xl ">
                <div></div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ListTabel;

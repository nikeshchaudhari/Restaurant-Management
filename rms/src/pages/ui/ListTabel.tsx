import Navbar from "../../components/Navbar";
import UiSlider from "../../components/UiSlider";
const ListTabel = () => {
  return (
    <>
      <main>
        <Navbar />
        <div className="md:flex ">
          <UiSlider />

          <section className="pl-10">
            <div>
              <h2 className=" py-5  text-[22px] font-['poppins'] font-semibold">Step 1: Select Table</h2>
              <div className="w-full bg-white shadow-lg rounded-2xl h-[10vh] ">  </div>
            
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ListTabel;

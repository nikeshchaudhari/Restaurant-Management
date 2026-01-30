import food from "../assets/foods.png";

const SignUp = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      
      <div className="w-200 h-112.5 rounded-lg flex overflow-hidden bg-white">
        
        {/* Image section */}
        <div className="w-1/2">
          <img
            src={food}
            alt="food"
            className="w-[400px] h-[400px] p-10"
          />
        </div>

        {/* Form section */}
        <div className="w-1/2 bg-[#04578B] text-white p-8">
          <form className="flex flex-col gap-1">
            <h1 className="text-center text-[20px]">Create Account</h1>
            <label htmlFor="fullname">Full_Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="p-2 border outline-none text-white rounded" id="fullname"
              placeholder="Enter full name"
            />
            <label htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input
              type="email" id="email"
              className="p-2 border outline-none text-white rounded"
              placeholder="Enter your email"
            />
            <label htmlFor="password">Password<span className="text-red-500">*</span></label>
            <input
              type="password" id="password"
              className="p-2 border outline-none text-white rounded"
              placeholder="Enter password"
            />
            <label htmlFor="password">Confirm Password<span className="text-red-500">*</span></label>
            <input
              type="password" id="password"
              className="p-2 border outline-none text-white rounded"
              placeholder="Enter confirm password"
            />

            <button className="bg-[#1992DE] p-2 mt-2 transition duration-300 hover:bg-[#0E6BA6] cursor-pointer">SignUp</button>
            <span className="text-center">Already have an account?SignIn</span>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUp;

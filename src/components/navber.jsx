import React from "react";

const Navber = ({ cart, setView }) => {
  return (
    <div>
      <nav className="flex justify-between items-center px-6 md:px-20 py-5 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/assets/products/rocket.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-black tracking-tight text-purple-700">
            DigiTools
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="hidden md:flex gap-8 font-semibold text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-purple-600 cursor-pointer transition">
              Tools
            </li>
          </ul>
          {/* Cart Icon with Count */}
          <div
            className="relative cursor-pointer group"
            onClick={() => setView("cart")}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform block">
              🛒
            </span>
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              {cart.length}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navber;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("product"); // Default: Product Section

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Data load failed:", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} Added to Cart!`, { position: "top-center" });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Item removed from cart", { position: "top-center" });
  };

  const handleCheckout = () => {
    setCart([]);
    toast.info("Checkout Complete! Cart is now empty.", {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <ToastContainer autoClose={1500} />

      {/* --- Navbar --- */}
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

      {/* --- Banner Section --- */}
      <header className="container mx-auto px-6 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Supercharge Your <br />{" "}
            <span className="text-purple-600">Digital Workflow</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-lg">
            Access premium AI tools, design assets, templates, and productivity
            software—all in one place. Start creating faster today. Explore
            Products
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-purple-700 transition">
              Get Started
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center">
          <img
            src="/assets/products/banner.png"
            alt="Banner"
            className="rounded-[40px] shadow-2xl w-full max-w-xl"
          />
        </div>
      </header>

      {/* --- Stats Section --- */}
      <section className="bg-purple-700 py-16">
        <div className="container mx-auto flex flex-wrap justify-around text-white text-center gap-8">
          <div>
            <h2 className="text-5xl font-black">50K+</h2>
            <p className="text-purple-200 mt-2 uppercase tracking-widest text-sm">
              Active Users
            </p>
          </div>
          <div>
            <h2 className="text-5xl font-black">200+</h2>
            <p className="text-purple-200 mt-2 uppercase tracking-widest text-sm">
              Premium Tools
            </p>
          </div>
          <div>
            <h2 className="text-5xl font-black">4.9</h2>
            <p className="text-purple-200 mt-2 uppercase tracking-widest text-sm">
              User Ratings
            </p>
          </div>
        </div>
      </section>

      {/* --- Main Toggling Section --- */}
      <main className="container mx-auto px-6 md:px-20 py-20">
        <div className="flex justify-center mb-20">
          <div className="inline-flex bg-gray-200 p-2 rounded-2xl">
            <button
              onClick={() => setView("product")}
              className={`px-12 py-4 rounded-xl font-black text-lg transition-all ${view === "product" ? "bg-white text-purple-700 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              Product
            </button>
            <button
              onClick={() => setView("cart")}
              className={`px-12 py-4 rounded-xl font-black text-lg transition-all ${view === "cart" ? "bg-white text-purple-700 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {/* --- Layouts --- */}
        {view === "product" ? (
          /* Product Grid: 3-column layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <img
                      src={product.icon}
                      alt=""
                      className="w-16 h-16 object-contain"
                    />
                    <span className="bg-orange-100 text-orange-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                      {product.tagType}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {product.features.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm font-semibold text-gray-600 flex items-center gap-3"
                      >
                        <span className="text-green-500 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-end gap-1 mb-8">
                    <span className="text-4xl font-black">
                      ${product.price}
                    </span>
                    <span className="text-gray-400 font-medium mb-1">
                      /{product.period}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-purple-600 shadow-lg transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cart: 1-column layout */
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[50px] shadow-2xl border border-gray-100">
            <h2 className="text-4xl font-black mb-12 text-center text-gray-800">
              Your Cart
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-300 font-medium italic">
                  Cart is empty! Choose some tools.
                </p>
                <button
                  onClick={() => setView("product")}
                  className="mt-6 text-purple-600 font-black border-b-2 border-purple-600"
                >
                  Back to Tools
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-6 rounded-[30px] border border-gray-100"
                  >
                    <div className="flex items-center gap-6">
                      <img src={item.icon} alt="" className="w-16 h-16" />
                      <div>
                        <p className="font-black text-xl text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-purple-600 font-black">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-50 text-red-500 px-5 py-2 rounded-xl font-black text-sm hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-16 pt-10 border-t-4 border-dotted border-gray-200">
                  <div className="flex justify-between text-3xl font-black text-gray-900 mb-10 px-4">
                    <span>Total Cost:</span>
                    <span className="text-purple-600">
                      ${cart.reduce((acc, curr) => acc + curr.price, 0)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl hover:bg-purple-700 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400 py-20 px-10 text-center mt-20">
        <div className="flex justify-center items-center gap-3 mb-6">
          <img
            src="/assets/products/rocket.png"
            alt="Logo"
            className="w-10 h-10 brightness-200"
          />
          <h2 className="text-white text-3xl font-black tracking-tight">
            DigiTools
          </h2>
        </div>
        <p className="text-lg max-w-md mx-auto mb-10 leading-relaxed italic">
          "The best place to find premium tools for your next big digital
          empire."
        </p>
        <div className="border-t border-gray-800 pt-10 mt-10 text-sm font-medium">
          &copy; 2026 DigiTools Platform. Designed with ❤️ for Builders.
        </div>
      </footer>
    </div>
  );
};

export default App;

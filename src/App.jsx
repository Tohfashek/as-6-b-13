import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navber from "./components/navber";

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
      <Navber cart={cart} setView={setView}></Navber>

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
      {/* --- Header Section (Premium Digital Tools) --- */}
      <div className="text-center pt-16 pb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Premium Digital Tools
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-6">
          Choose from our curated collection of premium digital products
          designed to boost your productivity and creativity.
        </p>
      </div>

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

      {/* --- Get Started In 3 Steps Section --- */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6 text-center">
    {/* Section Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
      Get Started In 3 Steps
    </h2>

    {/* Steps Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
      
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">01</span>
          <span className="text-2xl"><img src="public/assets/user.png" alt="" /></span>
        </div>
        <h3 className="text-xl font-bold mb-3">Create Account</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
          Sign up for free in seconds. No credit card required to get started.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">02</span>
          <span className="text-2xl"><img src="public/assets/package.png" alt="" /></span>
        </div>
        <h3 className="text-xl font-bold mb-3">Choose Products</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
          Browse our catalog and select the tools that fit your needs.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">03</span>
          <span className="text-2xl">public/assets/products/rocket.png</span>
        </div>
        <h3 className="text-xl font-bold mb-3">Start Creating</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
          Download and start using your premium tools immediately.
        </p>
      </div>

    </div>
  </div>
</section>

<section className="bg-gray-50 py-12 px-4 font-sans">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
    
    {/* Starter Card */}
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900">Starter</h3>
      <p className="text-gray-500 text-sm mb-4">Perfect for getting started</p>
      <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-400">/Month</span></div>
      <ul className="space-y-3 mb-8 text-gray-700 flex-grow">
        <li>✓ Access to 10 free tools</li>
        <li>✓ Basic templates</li>
        <li>✓ Community support</li>
        <li>✓ 1 project per month</li>
      </ul>
      <button className="w-full py-3 bg-[#450868] text-white rounded-full font-bold hover:opacity-90 transition">Get Started Free</button>
    </div>

    {/* Pro Card (Full Pink) */}
    <div className="bg-[#450868] text-white p-8 rounded-[2.5rem] shadow-xl relative md:scale-105 flex flex-col">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#450868] px-4 py-0.5 rounded-full text-xs font-bold shadow-sm">Most Popular</div>
      <h3 className="text-xl font-bold">Pro</h3>
      <p className="opacity-90 text-sm mb-4">Best for professionals</p>
      <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal opacity-70">/Month</span></div>
      <ul className="space-y-3 mb-8 flex-grow">
        <li>✓ Access to all premium tools</li>
        <li>✓ Unlimited templates</li>
        <li>✓ Priority support</li>
        <li>✓ Unlimited projects</li>
        <li>✓ Cloud sync</li>
        <li>✓ Advanced analytics</li>
      </ul>
      <button className="w-full py-3 bg-white text-[#450868] rounded-full font-bold hover:bg-gray-50 transition">Start Pro Trial</button>
    </div>

    {/* Enterprise Card */}
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
      <p className="text-gray-500 text-sm mb-4">For teams and businesses</p>
      <div className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal text-gray-400">/Month</span></div>
      <ul className="space-y-3 mb-8 text-gray-700 flex-grow">
        <li>✓ Everything in Pro</li>
        <li>✓ Team collaboration</li>
        <li>✓ Custom integrations</li>
        <li>✓ Dedicated support</li>
        <li>✓ SLA guarantee</li>
        <li>✓ Custom branding</li>
      </ul>
      <button className="w-full py-3 bg-[#450868] text-white rounded-full font-bold hover:opacity-90 transition">Contact Sales</button>
    </div>

  </div>
</section>

<section className="bg-purple-800 py-12 px-4 text-center text-white rounded-2xl mx-4 my-8">
        <h2 className="text-3xl font-bold">Ready To Transform Your Workflow?</h2>
        <p className="my-4 opacity-80">Start your free trial today.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-purple-800 px-6 py-2 rounded-full font-bold">Explore</button>
          <button className="border border-white px-6 py-2 rounded-full">Pricing</button>
        </div>
      </section>

      
      <footer className="bg-[#0b0f1a] text-gray-400 py-16 px-6">
  <div className="max-w-7xl mx-auto">
    
    {/* Main Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
      
      {/* 1. Brand Section */}
      <div className="lg:col-span-2">
        <h2 className="text-white text-2xl font-bold mb-4 flex items-center">
          <span className="text-orange-500 mr-2 text-2xl">●</span> DigiTools
        </h2>
        <p className="text-sm leading-relaxed max-w-xs">
          Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.
        </p>
      </div>

      {/* 2. Product Links */}
      <div>
        <h4 className="text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Features</a></li>
          <li><a href="#" className="hover:text-white transition">Pricing</a></li>
          <li><a href="#" className="hover:text-white transition">Templates</a></li>
          <li><a href="#" className="hover:text-white transition">Integrations</a></li>
        </ul>
      </div>

      {/* 3. Company & Resources Links */}
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm mb-6">
          <li><a href="#" className="hover:text-white transition">About</a></li>
          <li><a href="#" className="hover:text-white transition">Blog</a></li>
          <li><a href="#" className="hover:text-white transition">Careers</a></li>
          <li><a href="#" className="hover:text-white transition">Press</a></li>
        </ul>
        
        <h4 className="text-white font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Documentation</a></li>
          <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition">Community</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>

      {/* 4. Social Links */}
      <div>
        <h4 className="text-white font-semibold mb-4">Social Links</h4>
        <div className="flex space-x-3">
          {/* Icons */}
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer text-white text-xs"><img src="public/assets/products/instagram.png" alt="" /></div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer text-white text-xs"><img src="public/assets/products/x.png" alt="" /></div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer text-white text-xs"><img src="public/assets/products/x.png" alt="" /></div>
        </div>
      </div>

    </div>

    {/* Bottom copyright & Links bar */}
    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px]">
      <p>© 2026 DigiTools. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Cookies</a>
      </div>
    </div>

  </div>
</footer>
     
     
     
     
   

  </div>


      
     
  );
};

export default App;

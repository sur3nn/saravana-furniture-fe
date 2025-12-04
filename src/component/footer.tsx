import React from "react";

export const Footers = () => {
  return (
    <footer className="w-full bg-[#EADBC8] text-[#5A4632] py-12 mt-20 rounded-t-2xl shadow-inner">

      {/* FULL-WIDTH GRID */}
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold mb-3">Sarvanan Furniture</h3>
          <p className="text-sm leading-relaxed">
            Premium quality sofas, beds, tables, and chairs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Products</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">FAQ</li>
            <li className="hover:underline cursor-pointer">Shipping Info</li>
            <li className="hover:underline cursor-pointer">Return Policy</li>
            <li className="hover:underline cursor-pointer">Warranty</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Instagram</li>
            <li className="hover:underline cursor-pointer">YouTube</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-xs mt-12 opacity-70 px-6">
        © 2025 Sarvanan Furniture. All rights reserved.
      </div>

    </footer>
  );
};

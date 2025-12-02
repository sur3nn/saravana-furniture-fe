import React from 'react'

export const Footers = () => {
  return (
   <>
   <footer className=" bg-[#EADBC8] text-[#5A4632] py-10 mt-16 rounded-t-2xl shadow-inner">
 <div className=" mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 px-6">

    <div>
      <h3 className="font-bold mb-3">Sarvanan Furniture</h3>
      <p className="text-sm">Premium quality sofas, beds, tables, and chairs.</p>
    </div>

    <div>
      <h3 className="font-bold mb-3">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li>Home</li>
        <li>Products</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-3">Customer Support</h3>
      <ul className="space-y-1 text-sm">
        <li>FAQ</li>
        <li>Shipping Info</li>
        <li>Return Policy</li>
        <li>Warranty</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-3">Follow Us</h3>
      <ul className="space-y-1 text-sm">
        <li>Facebook</li>
        <li>Instagram</li>
        <li>YouTube</li>
      </ul>
    </div>

  </div>

  <div className="text-center text-xs mt-10 opacity-70">
    © 2025 Sarvanan Furniture. All rights reserved.
  </div>
</footer>

   </>
  )
}

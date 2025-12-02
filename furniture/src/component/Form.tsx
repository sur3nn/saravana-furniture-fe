import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type FurnitureFormProps = {
  flag?: number;
  productName?: string;
  categoryName?: string;
  setEnquiry : (value: boolean) => void ;
};

export default function FurnitureForm(props: FurnitureFormProps) {
  const [budget, setBudget] = useState("50");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: props.categoryName || "",
    product: props.productName || "",
    material: "Wood",
    size: "4ft × 6ft",
    description: "",
  });

  const [errors, setErrors] = useState<any>({});

  // handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // phone only allow digits
    if (name === "phone") {
      const digitValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: digitValue });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // email validation regex
  const isValidEmail = (mail: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  const validate = () => {
    let temp: any = {};

    if (!form.name.trim()) temp.name = "Name is required";

    if (!form.phone.trim()) temp.phone = "Phone number is required";
    else if (form.phone.length !== 10) temp.phone = "Must be 10 digits";

    if (form.email.trim()) {
      if (!isValidEmail(form.email)) temp.email = "Enter a valid email";
    }

    if (!form.category) temp.category = "Category is required";
    if (!form.product) temp.product = "Product is required";
    if (!budget) temp.budget = "Budget is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submitForm = () => {
    if (!validate()) {
      return;
    }

    alert("Form Submitted Successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-[#4a3a3a] p-6 rounded-2xl text-white shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={()=>props.setEnquiry(false)}
          className="absolute top-3 right-3 p-1 rounded-full bg-[#2d2323] hover:bg-[#3a2d2d]"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Enquiry Form</h2>

        {/* Scroll content */}
        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 px-2">

          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-[#2d2323] border ${
                errors.name ? "border-red-400" : "border-[#6b5656]"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 font-medium">Phone Number *</label>
            <input
              name="phone"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-[#2d2323] border ${
                errors.phone ? "border-red-400" : "border-[#6b5656]"
              }`}
              placeholder="10 digit mobile number"
            />
            {errors.phone && (
              <p className="text-red-300 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-[#2d2323] border ${
                errors.email ? "border-red-400" : "border-[#6b5656]"
              }`}
              placeholder="Enter valid email"
            />
            {errors.email && (
              <p className="text-red-300 text-sm">{errors.email}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 font-medium">Category *</label>

            {props.flag === 1 ? (
              <input
                readOnly
                value={form.category}
                className="w-full p-3 rounded-lg bg-[#2d2323] border border-[#6b5656]"
              />
            ) : (
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-[#2d2323] border ${
                  errors.category ? "border-red-400" : "border-[#6b5656]"
                }`}
              >
                <option value="">Select Category</option>
                <option>Custom Sofa</option>
                <option>Wardrobe</option>
                <option>TV Unit</option>
                <option>Dining Table</option>
                <option>Office Furniture</option>
              </select>
            )}
            {errors.category && (
              <p className="text-red-300 text-sm">{errors.category}</p>
            )}
          </div>

          {/* PRODUCT */}
          <div>
            <label className="block mb-1 font-medium">Product *</label>

            {props.flag === 1 ? (
              <input
                readOnly
                value={form.product}
                className="w-full p-3 rounded-lg bg-[#2d2323] border border-[#6b5656]"
              />
            ) : (
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-[#2d2323] border ${
                  errors.product ? "border-red-400" : "border-[#6b5656]"
                }`}
              >
                <option value="">Select Product</option>
                <option>Sofa</option>
                <option>Cot</option>
                <option>Table</option>
                <option>Chairs</option>
              </select>
            )}
            {errors.product && (
              <p className="text-red-300 text-sm">{errors.product}</p>
            )}
          </div>

          {/* MATERIAL */}
          <div>
            <label className="block mb-1 font-medium">Preferred Material *</label>
            <select
              name="material"
              value={form.material}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#2d2323] border border-[#6b5656]"
            >
              <option>Wood</option>
              <option>MDF</option>
              <option>Metal</option>
              <option>Upholstery</option>
              <option>Mixed</option>
            </select>
          </div>

          {/* SIZE */}
          <div>
            <label className="block mb-1 font-medium">Approximate Size *</label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#2d2323] border border-[#6b5656]"
            >
              <option>4ft × 6ft</option>
              <option>6ft × 6ft</option>
              <option>6ft × 8ft</option>
              <option>Custom Size</option>
            </select>
          </div>

          {/* BUDGET */}
          <div>
            <label className="block mb-1 font-medium">Budget Range *</label>

            <input
              type="range"
              min="0"
              max="100"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full"
            />
            <p className="text-sm mt-1">₹{budget},000 approx</p>

            {errors.budget && (
              <p className="text-red-300 text-sm">{errors.budget}</p>
            )}
          </div>

          {/* DESCRIPTION — optional */}
          <div>
            <label className="block mb-1 font-medium">
              Additional Requirements (optional)
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 h-28 rounded-lg bg-[#2d2323] border border-[#6b5656]"
              placeholder="Describe your furniture requirement..."
            ></textarea>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <motion.button
          onClick={submitForm}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-[#8a6b4f] mt-6 py-3 rounded-xl font-semibold hover:bg-[#9b7a5c]"
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash } from "lucide-react";

type FurnitureFormProps = {
  flag?: number;
  productName?: string;
  categoryName?: string;
  setEnquiry: (value: boolean) => void;
};

type ProductEntry = {
  categoryId: string;
  category: string;
  productId: string;
  product: string;
};

export default function FurnitureForm(props: FurnitureFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    material: "Wood",
    size: "4ft × 6ft",
    description: "",
  });

  const [products, setProducts] = useState<ProductEntry[]>([
    { categoryId: "", category: "", productId: "", product: "" },
  ]);
  const [errors, setErrors] = useState<any>({});

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [productOptions, setProductOptions] = useState<{ id: string; name: string }[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState<number[]>([]); // track per row

  // ===== Safe fetch helper =====
  const safeFetch = async (url: string, options?: RequestInit) => {
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      try {
        return JSON.parse(text); // parse if JSON
      } catch {
        console.warn("Non-JSON response:", text);
        return text;
      }
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  };

  // ===== Fetch dropdown data from API =====
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const data: any = await safeFetch("http://localhost:5000/api/meta/categories");
        setCategories(Array.isArray(data?.data) ? data.data : []);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchMaterials = async () => {
      const data: any = await safeFetch("http://localhost:5000/api/meta/material");
      setMaterials(Array.isArray(data) ? data : []);
    };

    fetchCategories();
    fetchMaterials();
  }, []);

  const fetchProductsByCategory = async (index: number, categoryId: string) => {
    setLoadingProducts((prev) => [...prev, index]);
    try {
      const data: any = await safeFetch("http://localhost:5000/api/meta/product?categoryId=${categoryId}", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId }),
      });
      setProductOptions(Array.isArray(data?.data) ? data.data : []);
    } finally {
      setLoadingProducts((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleProductChange = (index: number, field: keyof ProductEntry, value: string) => {
    const newProducts = [...products];
    newProducts[index][field] = value;

    if (field === "categoryId") {
      newProducts[index].productId = "";
      const selectedCategory = categories.find((c) => c.id.toString() === value.toString());
      newProducts[index].category = selectedCategory?.name || "";
      fetchProductsByCategory(index, value);
    }

    setProducts(newProducts);
  };

  const addProduct = () =>
    setProducts([...products, { categoryId: "", category: "", productId: "", product: "" }]);
  const removeProduct = (index: number) =>
    setProducts(products.filter((_, i) => i !== index));

  const validate = () => {
    let temp: any = {};
    if (!form.name.trim()) temp.name = "Name required";
    if (!form.phone.trim()) temp.phone = "Phone required";
    if (form.phone && form.phone.length !== 10) temp.phone = "Must be 10 digits";
    if (!form.email.trim()) temp.email = "Email required";

    products.forEach((p, i) => {
      if (!p.categoryId) temp[`category_${i}`] = "Category required";
      if (!p.productId) temp[`product_${i}`] = "Product required";
    });

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const [submitting, setSubmitting] = useState(false);

  const submitForm = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const productMap = products.map((p) => ({ productMapId: p.productId }));
      const payload = {
        name: form.name,
        email: form.email,
        mobile: form.phone,
        comment: form.description,
        products: productMap,
      };

      const res: any = await safeFetch("http://localhost:5000/api/add-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Form submitted successfully!");
      props.setEnquiry(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div className="relative w-full max-w-lg bg-[#F7EFE5] p-6 rounded-2xl shadow-xl border border-[#E8D8C4]">
        <button onClick={() => props.setEnquiry(false)} className="absolute top-3 right-3 p-1 rounded-full bg-[#E8D8C4] hover:bg-[#DCC9B5]">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Enquiry Form</h2>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 px-2 scrollbar-thin scrollbar-thumb-[#C6A27B]/60 scrollbar-track-[#F3E9DD]/40">
          {/* Name, Phone, Email */}
          {["name", "phone", "email"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className={`w-full p-3 rounded-lg bg-[#F3E9DD] border ${errors[field] ? "border-red-500" : "border-[#D3C2AF]"} text-[#5A4632]`}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          {/* Multiple Products */}
          <div className="space-y-4">
            {products.map((p, idx) => (
              <motion.div key={idx} className="p-4 rounded-2xl border border-[#D3C2AF] bg-linear-to-r from-[#FFF4E5] to-[#F7EFE5] relative shadow-sm">
                {idx > 0 && (
                  <button type="button" onClick={() => removeProduct(idx)} className="absolute top-2 right-2 p-1 rounded-full bg-[#E8D8C4] hover:bg-[#DCC9B5]">
                    <Trash size={16} />
                  </button>
                )}

                <div className="mb-2">
                  <label className="block text-sm font-medium">Category *</label>
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    <select value={p.categoryId} onChange={(e) => handleProductChange(idx, "categoryId", e.target.value)} className={`w-full p-2 rounded-lg border ${errors[`category_${idx}`] ? "border-red-500" : "border-[#D3C2AF]"} text-[#5A4632]`}>
                      <option value="">Select Category</option>
                      {Array.isArray(categories) && categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                  {errors[`category_${idx}`] && <p className="text-red-500 text-sm">{errors[`category_${idx}`]}</p>}
                </div>

                {p.categoryId && (
                  <div>
                    <label className="block text-sm font-medium">Product *</label>
                    {loadingProducts.includes(idx) ? (
                      <p>Loading products...</p>
                    ) : (
                      <select value={p.productId} onChange={(e) => handleProductChange(idx, "productId", e.target.value)} className={`w-full p-2 rounded-lg border ${errors[`product_${idx}`] ? "border-red-500" : "border-[#D3C2AF]"} text-[#5A4632]`}>
                        <option value="">Select Product</option>
                        {Array.isArray(productOptions) && productOptions.map((pr) => (
                          <option key={pr.id} value={pr.id}>{pr.name}</option>
                        ))}
                      </select>
                    )}
                    {errors[`product_${idx}`] && <p className="text-red-500 text-sm">{errors[`product_${idx}`]}</p>}
                  </div>
                )}
              </motion.div>
            ))}

            <button type="button" onClick={addProduct} className="flex items-center gap-2 text-sm font-semibold px-3 py-2 bg-[#b1681b] text-white rounded-lg hover:bg-[#995c16]">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        <motion.button onClick={submitForm} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full bg-[#634729] text-white mt-6 py-3 rounded-xl font-semibold hover:bg-[#774f27] flex justify-center items-center gap-2">
          {submitting ? "Submitting..." : "Submit"}
        </motion.button>
      </motion.div>
    </div>
  );
}

"use client";

import AutoFadeCarousel from "@/src/component/AutoFadeCarousel";
import Card from "antd/es/card";
import { Row, Col } from "antd";
import ScrollReveal from "@/src/component/ScrollReveal";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/src/component/Header";
import { Footers } from "@/src/component/footer";
import FurnitureForm from "@/src/component/Form";

type CategoryKey = "all" | "premiumsofa" | "table" | "chair";

export function Home() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isEnquiry, setEnquiry] = useState<boolean>(false);

  const categoriesRef: any = {
    all: useRef<HTMLDivElement | null>(null),
    premiumsofa: useRef<HTMLDivElement | null>(null), // sofa
    table: useRef<HTMLDivElement | null>(null),
    chair: useRef<HTMLDivElement | null>(null),
  };

  const smoothScrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref || !ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAboutClick = () => {
    smoothScrollTo(footerRef);
  };

  const handleCategorySelect = (key: CategoryKey) => {
    smoothScrollTo(categoriesRef[key]);
  };

  // =================== API FETCH ===================
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products?categoryId=0");

    const json = await res.json();
    console.log("API JSON:", json);

    const formatted = json.data.flatMap((item: any) =>
      item.productDetails.map((p: any) => ({
        category: item.category,
        ...p,
      }))
    );

    setProducts(formatted);

  } catch (error) {
    console.log("API ERROR:", error);
  } finally {
    setLoading(false);
  }
};


    fetchProducts();
  }, []);

  // =================== SECTIONS ===================

  const renderProducts = (filterCategory: string) => {
    if (loading) {
      return (
        <div className="text-center w-full py-10 text-gray-500">Loading...</div>
      );
    }

    const filtered = products.filter(
      (item) => item.category.toLowerCase() === filterCategory.toLowerCase()
    );

    if (filtered.length === 0) {
      return (
        <div className="text-center w-full py-10 text-gray-400">
          No products available
        </div>
      );
    }

    return filtered.map((data, index) => (
      <Col key={index} xs={12} sm={8} md={6} lg={6}>
        <ScrollReveal delay={index * 0.1}>
          <Card
            hoverable
            bodyStyle={{ padding: "14px" }}
            className="
              group relative overflow-hidden
              bg-[#FCF8F3]/80 backdrop-blur-md
              border border-[#E6D8C2]/70
              rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.1)]
              transition-all duration-500 
              hover:shadow-[0_10px_28px_rgba(0,0,0,0.15)]
              hover:-translate-y-1
            "
            cover={
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  alt={data.productName}
                  src={data.imgUrl}
                  className="
                    w-full h-48 object-cover
                    transition-all duration-700
                    group-hover:scale-110 group-hover:rotate-1
                  "
                />
              </div>
            }
          >
            <h3 className="text-lg font-semibold text-[#5A4632]">
              {data.productName}
            </h3>

            <div className="flex items-baseline gap-3">
              <span className="text-sm line-through text-gray-500">
                MRP ₹ {data.price + 2000}
              </span>
              <span className="text-xl font-bold text-[#8C6239]">
                ₹ {data.price}
              </span>
            </div>

            <button
              className="
                w-full mt-4 py-2.5 rounded-xl font-semibold
                bg-linear-to-r from-[#8C6239] to-[#A47A52]
                text-white! shadow-md
                transition-all duration-500
                hover:shadow-lg hover:scale-[1.02]
              "
              onClick={() => setEnquiry(true)}
            >
              Enquire Now
            </button>
          </Card>
        </ScrollReveal>
      </Col>
    ));
  };

  // ================= FULL UI =================

  return (
    <>
      <Header
        setEnquiry={setEnquiry}
        onAboutClick={handleAboutClick}
        onCategorySelect={handleCategorySelect}
      />

      {isEnquiry && <FurnitureForm flag={0} setEnquiry={setEnquiry} />}

      <div className="px-6 z-10">
        {/* ALL */}
        <div ref={categoriesRef.all}>
          <AutoFadeCarousel />
        </div>

        {/* PREMIUM SOFA */}
        <div className="py-7" ref={categoriesRef.premiumsofa}>
          <div className="flex items-center justify-center py-2">
            <img src="./design.png" className="max-w-xl" />
          </div>

          <div className="text-2xl font-bold text-[#5A4632] pt-10 pb-4 flex justify-center">
            PREMIUM SOFA
          </div>

          <Row gutter={[24, 24]}>{renderProducts("sofa")}</Row>
        </div>

        {/* MID ANIMATION PART (unchanged) */}
        <div className="hidden lg:block">
          <div className="flex">
          <div className="w-1/2 mx-auto py-10 perspective">
            <div className="flip-card">
              <div className="flip-inner">
                <img src="./banner1.png" className="flip-front" />
                <img src="./banner2.png" className="flip-back" />
              </div>
            </div>
            </div>
          

          <div className="w-1/2 mx-auto py-10 perspective">
            <div className="flip-card">
              <div className="flip-inner">
                <img src="./banner1.png" className="flip-front" />
                <img src="./banner2.png" className="flip-back" />
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* TABLE */}
        <div ref={categoriesRef.table}>
          <div className="text-xl font-bold text-[#5A4632] flex justify-center py-10">
            TABLE
          </div>

          <Row gutter={[24, 24]}>{renderProducts("table")}</Row>
        </div>

        <div className="py-5">
          <img
            src="./bigBanner.png"
            className="w-full shadow-[0_-2px_4px_rgba(0.1,0.1,0.1,0.1)]"
          />
        </div>

        {/* CHAIR */}
        <div className="pt-10" ref={categoriesRef.chair}>
          <div className="flex items-center justify-center mt-5">
            <img src="./design.png" className="max-w-xl" />
          </div>

          <div className="text-2xl font-bold text-[#5A4632] tracking-wide mb-6 flex justify-center">
            CHAIR
          </div>

          <Row gutter={[24, 24]}>{renderProducts("chair")}</Row>
        </div>
      </div>

      <div ref={footerRef} className="w-full">
        <Footers />
      </div>
    </>
  );
}

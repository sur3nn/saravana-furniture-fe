"use client";

import AutoFadeCarousel from "@/src/component/AutoFadeCarousel";
import Card from "antd/es/card";
import { Row, Col } from "antd";
import ScrollReveal from "@/src/component/ScrollReveal";
import React, { useRef, useState } from "react";
import { Header } from "@/src/component/Header";
import { Footers } from "@/src/component/footer";
import FurnitureForm from "@/src/component/Form";


type CategoryKey = "all" | "premiumsofa" | "table" | "chair";


export function Home() {
  const footerRef = useRef<HTMLDivElement | null>(null);
const [isEnquiry,setEnquiry] = useState<boolean>(false);
  const categoriesRef: any = {
    all: useRef<HTMLDivElement | null>(null),
    premiumsofa: useRef<HTMLDivElement | null>(null),   // PREMIUM SOFA
    table: useRef<HTMLDivElement | null>(null),  // TABLE
    chair: useRef<HTMLDivElement | null>(null),   // CHAIR
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

  const arr = [
    { banner_url: "./card1.webp", name: "FamilyComfort Sofa", price: "12000" },
    { banner_url: "./card1.webp", name: "HappyHome Sofa", price: "13000" },
    { banner_url: "./card1.webp", name: "HomelyHug", price: "14000" },
    { banner_url: "./card1.webp", name: "ZenPlush", price: "14000" },
    { banner_url: "./card1.webp", name: "CozyNest", price: "15000" },
    { banner_url: "./card1.webp", name: "VelvetAura", price: "16000" },
    { banner_url: "./card1.webp", name: "UrbanLuxe", price: "18000" },
    { banner_url: "./card1.webp", name: "UrbanLuxe", price: "18000" },
  ];

  return (
    <>
      {/* Fixed header */}
      <Header 
        setEnquiry={setEnquiry}
        onAboutClick={handleAboutClick}
        onCategorySelect={handleCategorySelect}
      />

            { isEnquiry
               &&
              <FurnitureForm flag={0} setEnquiry={setEnquiry}/>
            }
      {/* Add top padding to avoid header overlay */}
      <div className="px-6 z-10">
        {/* ALL CATEGORY (top of content) */}
        <div ref={categoriesRef.all}>
          <AutoFadeCarousel />
        </div>
         
        {/* ================ PREMIUM SOFA (LIVING) ================ */}
        <div className="py-7" ref={categoriesRef.premiumsofa}>
             <div className="flex items-center justify-center py-2">
   <img
            src="./design.png"
            className="max-w-xl"
          />
</div>
          <div className="text-2xl font-bold text-[#5A4632] pt-10 pb-4 py-1 tracking-wide flex justify-center item-center">
            PREMIUM SOFA
          </div>

          <Row gutter={[24, 24]}>
            {arr.map((data, index) => (
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
                          alt={data.name}
                          src={data.banner_url}
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
                      {data.name}
                    </h3>

                    <div className="flex items-baseline gap-3">
                      <span className="text-sm line-through text-gray-500">
                        MRP ₹ {parseInt(data.price) + 3000}
                      </span>
                      <span className="text-xl font-bold text-[#8C6239]">
                        ₹ {data.price}
                      </span>
                    </div>

                    <button
                      className="
                        w-full mt-4! py-2.5 rounded-xl font-semibold
                        bg-linear-to-r from-[#8C6239] to-[#A47A52]
                        text-white! shadow-md
                        transition-all duration-500
                        hover:shadow-lg hover:scale-[1.02]
                      "
                      onClick={()=>setEnquiry(true)}
                    >
                      Enquire Now


                    </button>
                  </Card>
                </ScrollReveal>
              </Col>
            ))}
          </Row>
        </div>

    <div className="flex">
          <div className="w-1/2 mx-auto py-10 perspective">
  <div className="flip-card">
    <div className="flip-inner">
      {/* Front Image */}
      <img src="./banner1.png" className="flip-front" />

      {/* Back Image */}
      <img src="./banner2.png" className="flip-back" />
    </div>
  </div>
</div>
   <div className="w-1/2 mx-auto py-10 perspective">
  <div className="flip-card">
    <div className="flip-inner">
      {/* Front Image */}
      <img src="./banner1.png" className="flip-front" />

      {/* Back Image */}
      <img src="./banner2.png" className="flip-back" />
    </div>
  </div>
</div>
    </div>

            <div className="flex items-center justify-center">
   <img
            src="./design.png"
            className="max-w-xl"
          />
</div>
        {/* ================= TABLE SECTION (BEDROOM) ================= */}
        <div ref={categoriesRef.table}>
          <div className="text-xl font-bold text-[#5A4632] flex justify-center item-center py-10">TABLE</div>

          <Row gutter={[24, 24]}>
            {arr.map((data, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={4}>
                <ScrollReveal delay={index * 0.1}>
                  <Card
                    hoverable
                    bodyStyle={{ padding: "12px" }}
                    className="
                      bg-[#FCF8F3]
                      border border-[#E6D8C2]
                      rounded-xl
                      shadow-md
                      transition-all duration-500
                      hover:-translate-y-2 hover:shadow-lg
                    "
                    cover={
                      <div className="rounded-t-xl overflow-hidden">
                        <img
                          alt={data.name}
                          src={data.banner_url}
                          className="w-full h-40 object-cover transition duration-500 hover:scale-105"
                        />
                      </div>
                    }
                  >
                    <h3 className="text-sm font-semibold text-[#5A4632]">
                      {data.name}
                    </h3>

                    <div className="flex items-baseline gap-2">
                      <span className="line-through text-xs text-gray-500">
                        MRP ₹ 12000
                      </span>
                      <span className="text-sm font-bold text-[#8C6239]">
                        ₹ 9999
                      </span>
                    </div>
                  </Card>
                </ScrollReveal>
              </Col>
            ))}
          </Row>
        </div>

        <div className="py-5">
          <img
            src="./bigBanner.jpeg"
            className="w-full shadow-[0_-2px_4px_rgba(0.1,0.1,0.1,0.1)]"
          />
        </div>

        {/* ================= CHAIR SECTION (OFFICE) ================= */}
              <div className="flex items-center justify-center mt-5">
   <img
            src="./design.png"
            className="max-w-xl"
          />
</div>
        <div className="pt-10" ref={categoriesRef.chair}>
          <div className="text-2xl font-bold text-[#5A4632] tracking-wide mb-6 flex justify-center item-center">
            CHAIR
          </div>

          <Row gutter={[24, 24]}>
            {arr.map((data, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={4}>
                <ScrollReveal delay={index * 0.1}>
                  <Card
                    hoverable
                    bodyStyle={{ padding: "12px" }}
                    className="
                      bg-[#FCF8F3]
                      border border-[#E6D8C2]
                      rounded-xl
                      h-full
                      shadow-sm
                      hover:shadow-xl
                      transition-all duration-500
                      hover:scale-[1.04] hover:brightness-105
                    "
                    cover={
                      <div className="p-2">
                        <img
                          alt={data.name}
                          src={data.banner_url}
                          className="object-cover h-60 w-full rounded-lg border border-[#E6D8C2]"
                        />
                      </div>
                    }
                  >
                    <h3 className="text-sm font-semibold text-[#5A4632]">
                      {data.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs text-gray-500 line-through">
                        MRP ₹ 12000
                      </span>
                      <span className="text-sm font-bold text-[#8C6239]">
                        ₹ 9999
                      </span>
                    </div>
                  </Card>
                </ScrollReveal>
              </Col>
            ))}
          </Row>
        </div>

      
      </div>
        <div ref={footerRef} className="w-full">
  <Footers />
</div>

    </>
  );
}

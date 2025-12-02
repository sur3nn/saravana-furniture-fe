"use client";

import React, { useState, useRef } from "react";
import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from "antd";

type HeaderProps = {
  setEnquiry : (value: boolean) => void ;
  onAboutClick?: () => void;
  onCategorySelect?: (key: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  setEnquiry,
  onAboutClick,
  onCategorySelect,
}) => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setOptions(
      [{ value }, { value: `${value} sofa` }, { value: `${value} chair` }].map(
        (item) => ({
          value: item.value,
          label: item.value,
        })
      )
    );
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  const menuItems = ["Home", "About Us", "Product"] as const;

  const handleMenuClick = (item: (typeof menuItems)[number]) => {
    if (item === "About Us") {
      if (typeof onAboutClick === "function") {
        onAboutClick();
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    } else if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Product – hook later if needed
    }
  };

  const categoryList: { key: string; label: string }[] = [
    { key: "all", label: "All Sections" },
    { key: "premiumsofa", label: "Premium Sofa" },
    { key: "table", label: "Table" },
    { key: "chair", label: "Chair" },
  ];

  // === dropdown open/close with delay ===
  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsCategoryOpen(true);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 150); // adjust delay if you want slower/faster
  };

  return (
    <header
  className="
    fixed top-0 left-0 right-0 h-21.5
    bg-[#FCF8F3] shadow-md
    z-40 transition-all duration-300
    border-b border-[#E6D8C2]
  "
>

      <div className="flex justify-evenly mt-5 items-center relative">
        {/* Logo */}
        <div className="text-2xl text-[#5A4632] font-semibold">
            <img src="./logo.png" />
          {/* <p className="text-sm text-[#8C6239] -mt-1">Sarvanan Furniture</p> */}
        </div>

        {/* Search */}
        <div>
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 500 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              size="large"
              placeholder="Search here..."
              className="
                rounded-full 
                border border-[#E6D8C2] 
                focus:ring-0 focus:border-[#8C6239]
              "
            />
          </AutoComplete>
        </div>

        {/* Menu + Category */}
        <nav className="relative flex items-center gap-3 text-[#5A4632] font-medium">
          {/* Normal menu items */}
          {menuItems.map((item) => (
            <div
              key={item}
              className="
                px-5 py-2 cursor-pointer rounded-lg 
                hover:bg-[#E6D8C2] hover:text-[#8C6239]
                transition
              "
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </div>
          ))}

          {/* Category (hover dropdown with delay) */}
          <div
            className="relative inline-block"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleCloseDropdown}
          >
            {/* Trigger */}
            <div
              className="
                px-5 py-2 cursor-pointer rounded-lg
                flex items-center gap-2
                hover:bg-[#E6D8C2] hover:text-[#8C6239]
                transition
              "
            >
              <span>Category</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 8L10 13L15 8"
                  stroke="#5A4632"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Dropdown */}
            <div
              className={`
                absolute right-0 top-full mt-1 w-44 z-50
                bg-white border border-[#E6D8C2]
                rounded-xl shadow-lg overflow-hidden
                origin-top-right
                transition-all duration-200
                ${
                  isCategoryOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }
              `}
            >
              {categoryList.map((cat) => (
                <div
                  key={cat.key}
                  className="
                    px-4 py-2 text-sm cursor-pointer
                    hover:bg-[#E6D8C2]/60 hover:text-[#8C6239]
                    transition-all duration-150
                  "
                  onClick={() => {
                    if (onCategorySelect) {
                      onCategorySelect(cat.key);
                    } else {
                      const el = document.getElementById(cat.key);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }
                    setIsCategoryOpen(false);
                  }}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA Button */}
        <button
          className="
            bg-[#8C6239] text-white!
            px-5 py-2.5 rounded-lg
            hover:bg-[#704F2D] transition
            font-semibold cursor-pointer
          "
          onClick={()=>setEnquiry(true)}
        >
          Enquiry Now
        </button>
      </div>
    </header>
  );
};

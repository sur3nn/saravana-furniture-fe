"use client";

import React, { useState, useRef } from "react";
import { AutoComplete, Input, Drawer } from "antd";
import type { AutoCompleteProps } from "antd";
import { CaretDownFilled, MenuOutlined } from "@ant-design/icons";

type HeaderProps = {
  setEnquiry: (value: boolean) => void;
  onAboutClick?: () => void;
  onCategorySelect?: (key: any) => void;
};

export const Header: React.FC<HeaderProps> = ({
  setEnquiry,
  onAboutClick,
  onCategorySelect,
}) => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    if (!value) return setOptions([]);
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
    console.log("selected:", value);
  };

  const menuItems = ["Home", "About Us", "Product"] as const;

  const categoryList = [
    { key: "all", label: "All Sections" },
    { key: "premiumsofa", label: "Premium Sofa" },
    { key: "table", label: "Table" },
    { key: "chair", label: "Chair" },
  ];

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsCategoryOpen(true);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsCategoryOpen(false), 150);
  };

  const handleMenuClick = (item: string) => {
    console.log("item",item);
    
    if (item === "About Us") {
      onAboutClick?.();
    } else if (item === "Home") {
      console.log("home");
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        bg-[#FCF8F3] border-b border-[#E6D8C2]
        shadow-md z-50
        px-3 sm:px-4 lg:px-8
        py-1.5 sm:py-2.5    /* smaller padding on mobile */
      "
    >
      <div className="flex items-center justify-between w-full gap-2 sm:gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden text-[#5A4632] text-xl"
        >
          <MenuOutlined />
        </button>

        {/* Logo – smaller on mobile */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src="./Saravanalogo.png"
            className="h-6 sm:h-10 lg:h-10 w-auto object-contain"
            alt="Saravanan Furnitures"
          />
        </div>

        {/* Search (hidden on mobile) */}
        <div className="hidden sm:block flex-1 px-3 sm:px-5 max-w-2xl">
          <AutoComplete
            className="w-full"
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              placeholder="Search furniture..."
              size="large"
              className="rounded-full border-[#E6D8C2] focus:border-[#8C6239]"
            />
          </AutoComplete>
        </div>

        {/* Mobile Enquiry button – smaller */}
        <button
          onClick={() => setEnquiry(true)}
          className="
            inline-flex lg:hidden items-center justify-center
            text-xs! xs:text-xs sm:text-sm
            px-2.5 sm:px-3 py-1.5
            rounded-md 
            bg-gradient-to-r from-[#8C6239] to-[#A47A52]
            text-white! shadow-md
            hover:shadow-lg hover:scale-[1.02]
            transition-all duration-300
          "
        >
          Enquire Now
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 text-[#5A4632] font-medium">
          {menuItems.map((item) => (
            <span
              key={item}
              className="px-3 py-2 cursor-pointer hover:text-white! hover:bg-[#8C6239] rounded-lg"
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </span>
          ))}

          {/* Category dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleCloseDropdown}
          >
            <span className="px-3 py-2 cursor-pointer hover:text-[#8C6239] flex items-center gap-1">
              Category
              <CaretDownFilled
                className={`text-sm transition ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </span>

            <div
              className={`
                absolute right-0 mt-2 w-44 bg-white border border-[#E6D8C2]
                rounded-xl shadow-lg transition-all duration-200 z-50
                ${
                  isCategoryOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-1"
                }
              `}
            >
              {categoryList.map((cat) => (
                <div
                  key={cat.key}
                  className="px-4 py-2 hover:bg-[#E6D8C2]/50 cursor-pointer"
                  onClick={() => onCategorySelect?.(cat.key)}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Enquiry btn */}
          <button
            onClick={() => setEnquiry(true)}
            className="bg-[#8C6239] text-white! px-5 py-2 rounded-lg hover:bg-[#704F2D] transition-colors duration-200"
          >
            Enquire Now
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <AutoComplete
          className="w-full mb-4"
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search placeholder="Search..." size="large" className="rounded-full" />
        </AutoComplete>

        <div className="flex flex-col gap-4 font-medium text-[#5A4632]">
          {menuItems.map((item) => (
            <span
              key={item}
              className="py-1 cursor-pointer text-lg"
              onClick={() => {
                handleMenuClick(item);
                setDrawerOpen(false);
              }}
            >
              {item}
            </span>
          ))}

          <div className="pt-4 font-semibold">Categories</div>
          {categoryList.map((cat) => (
            <span
              key={cat.key}
              className="pl-2 py-1 cursor-pointer text-base"
              onClick={() => {
                onCategorySelect?.(cat.key);
                setDrawerOpen(false);
              }}
            >
              {cat.label}
            </span>
          ))}

          <button
            onClick={() => {
              setEnquiry(true);
              setDrawerOpen(false);
            }}
            className="
              mt-6 w-full py-2.5 rounded-xl font-semibold
              bg-gradient-to-r from-[#8C6239] to-[#A47A52]
              text-white! shadow-md
              hover:shadow-lg hover:scale-[1.02]
              transition-all duration-300
            "
          >
            Enquire Now
          </button>
        </div>
      </Drawer>
    </header>
  );
};

"use client";

import React, { useState, useRef } from "react";
import { AutoComplete, Input, Drawer, Button } from "antd";
import type { AutoCompleteProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";

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
    if (item === "About Us") {
      onAboutClick?.();
    } else if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 bg-[#FCF8F3] border-b border-[#E6D8C2]
        shadow-md z-50 px-4 lg:px-8 py-3
      "
    >
      <div className="flex items-center justify-between w-full">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden text-[#5A4632] text-2xl"
        >
          <MenuOutlined />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="./logo.png" className="h-12 w-auto" />
        </div>

        {/* Search (Responsive Width) */}
        <div className="hidden sm:block flex-1 px-5 max-w-2xl">
          <AutoComplete
            className="w-full"
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              placeholder="Search furniture..."
              size="large"
              className="
                rounded-full border-[#E6D8C2]
                focus:border-[#8C6239]
              "
            />
          </AutoComplete>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 text-[#5A4632] font-medium">

          {menuItems.map((item) => (
            <span
              key={item}
              className="px-3 py-2 cursor-pointer hover:text-[#8C6239]"
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
              <span className={`${isCategoryOpen ? "rotate-180" : ""} transition`}>
                ▼
              </span>
            </span>

            <div
              className={`
                absolute right-0 mt-2 w-44 bg-white border border-[#E6D8C2] 
                rounded-xl shadow-lg transition-all duration-200 z-50
                ${isCategoryOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
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

          {/* Enquiry btn */}
          <button
            onClick={() => setEnquiry(true)}
            className="bg-[#8C6239] text-white! px-5 py-2 rounded-lg hover:bg-[#704F2D]"
          >
            Enquiry
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
        {/* Search on mobile inside drawer */}
        <AutoComplete
          className="w-full mb-4"
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            placeholder="Search..."
            size="large"
            className="rounded-full"
          />
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

          {/* Category */}
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

          {/* Enquiry btn */}
          
        </div>
      </Drawer>
      
    </header>
  );
};

"use client";

import { useState } from "react";

interface CategoryItem {
  name: string;
  subcategories: string[];
}

const Categories = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const categories: CategoryItem[] = [
    {
      name: "Groceries",
      subcategories: ["Rice & Grains", "Pulses", "Spices", "Oil & Ghee", "Salt & Sugar"]
    },
    {
      name: "Premium Fruits",
      subcategories: ["Apples", "Oranges", "Bananas", "Grapes", "Mangoes"]
    },
    {
      name: "Home & Kitchen",
      subcategories: ["Cookware", "Kitchen Tools", "Storage", "Cleaning", "Appliances"]
    },
    {
      name: "Fashion",
      subcategories: ["Men's Wear", "Women's Wear", "Kids Wear", "Footwear", "Accessories"]
    },
    {
      name: "Electronics",
      subcategories: ["Mobiles", "Laptops", "TVs", "Cameras", "Accessories"]
    },
    {
      name: "Beauty",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"]
    },
    {
      name: "Home Improvement",
      subcategories: ["Tools", "Hardware", "Paint", "Electrical", "Plumbing"]
    },
    {
      name: "Sports, Toys & Luggage",
      subcategories: ["Sports Equipment", "Toys", "Bags", "Travel Gear", "Outdoor"]
    }
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <div className="w-full overflow-x-auto px-4 py-3 bg-gray-50 border-b pl-15 relative z-50">
        <div className="flex gap-3">
          {categories.map((cat, index) => (
            <div key={cat.name} className="relative flex-shrink-0">
              <button
                onClick={() => toggleDropdown(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  index === 0
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.name} ▼
              </button>
              
              {openDropdown === index && (
                <div className="fixed bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-[9999] border border-gray-200 mt-2">
                  {cat.subcategories.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;

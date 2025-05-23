import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter, resetFilters } from "@/store/slices/filterSlice";

const FilterBox = ({ onClose }) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter);

  // Check if any filter is active
  const hasActiveFilters = Object.values(filterState).some(
    (filter) => filter && filter.length > 0
  );

  const handleCheckBox = (filterType, value) => {
    dispatch(updateFilter({ filterType, value }));
  };

  const resetAllFilters = () => {
    // إعادة ضبط كل الفلاتر في Redux
    dispatch(resetFilters());

    // إعادة ضبط جميع checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div dir="rtl" className="bg-white h-full md:w-[350px] p-8 overflow-y-auto">
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 left-4 text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        className={`flex justify-between items-center ${
          !hasActiveFilters ? "mb-6" : ""
        }`}
      >
        <p className="text-xl font-semibold">التصفية</p>
      </div>{" "}
      {hasActiveFilters && (
        <button
          onClick={resetAllFilters}
          className={`text-gray-800 px-2 py-1 ${
            hasActiveFilters ? "mb-6" : ""
          } rounded-md underline`}
        >
          إعادة ضبط
        </button>
      )}
      {/* نوع كرت الشاشة */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          نوع كرت الشاشة
        </label>
        <div className="flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="nvidia"
              className="mr-2"
              onChange={(e) => handleCheckBox("gpu", "nvidia")}
            />
            NVIDIA
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="amd"
              className="mr-2"
              onChange={(e) => handleCheckBox("gpu", "amd")}
            />
            AMD
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="intel"
              className="mr-2"
              onChange={(e) => handleCheckBox("gpu", "intel")}
            />
            Intel
          </label>
        </div>
      </div>
      {/* نوع المعالج */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          نوع المعالج
        </label>
        <div className="flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="intel"
              className="mr-2"
              onChange={(e) => handleCheckBox("cpu", "intel")}
            />
            Intel
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="amd"
              className="mr-2"
              onChange={(e) => handleCheckBox("cpu", "amd")}
            />
            AMD
          </label>
        </div>
      </div>
      {/* حجم الرام */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          حجم الرام
        </label>
        <div className="flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="8"
              className="mr-2"
              onChange={(e) => handleCheckBox("ram", "8")}
            />
            8GB
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="16"
              className="mr-2"
              onChange={(e) => handleCheckBox("ram", "16")}
            />
            16GB
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="32"
              className="mr-2"
              onChange={(e) => handleCheckBox("ram", "32")}
            />
            32GB
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="64"
              className="mr-2"
              onChange={(e) => handleCheckBox("ram", "64")}
            />
            64GB
          </label>
        </div>
      </div>
      {/* نوع التخزين */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          نوع التخزين
        </label>
        <div className="flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="ssd"
              className="mr-2"
              onChange={(e) => handleCheckBox("hardDisk", "ssd")}
            />
            SSD
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="hdd"
              className="mr-2"
              onChange={(e) => handleCheckBox("hardDisk", "hdd")}
            />
            HDD
          </label>
        </div>
      </div>
      {/* دقة الشاشة */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          دقة الشاشة
        </label>
        <div className="flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="1080p"
              className="mr-2"
              onChange={(e) => handleCheckBox("screenRes", "1080p")}
            />
            1080p
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="1440p"
              className="mr-2"
              onChange={(e) => handleCheckBox("screenRes", "1440p")}
            />
            1440p
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="4k"
              className="mr-2"
              onChange={(e) => handleCheckBox("screenRes", "4k")}
            />
            4K
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;

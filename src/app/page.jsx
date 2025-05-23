"use client";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "../data/products.json";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import FilterBox from "./sections/FilterBox";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetAllFilters } from "@/store/slices/filterSlice";
import SuspenseWrapper from "./components/SuspenseWrapper";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const [pageIndex, setPageIndex] = useState(searchParams.get("page") ?? "1");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const router = useRouter();
  const dispatch = useDispatch();

  const [laptops, setLaptops] = useState(products.products);
  const filterState = useSelector((state) => state.filter);

  const productsChunk = 9;
  const pagesNumber = Math.ceil(laptops.length / productsChunk);

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  if (parseInt(pageIndex) <= 0) setPageIndex(1);

  useEffect(() => {
    const filteredLaptops = products.products.filter((laptop) => {
      // Search Query Filter
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        const laptopName = laptop.name.toLowerCase();
        const laptopDescription = laptop.description.toLowerCase();
        const cpuName = laptop.specs.cpu.name.toLowerCase();
        const gpuName = laptop.specs.graphics.name.toLowerCase();

        // البحث في اسم اللابتوب والمعالج وكرت الشاشة
        if (
          !laptopName.includes(searchTerm) &&
          !laptopDescription.includes(searchTerm) &&
          !cpuName.includes(searchTerm) &&
          !gpuName.includes(searchTerm)
        ) {
          return false;
        }
      }

      // CPU Brand Filter
      if (filterState.cpu && filterState.cpu.length > 0) {
        if (!filterState.cpu.includes(laptop.specs.cpu.brand.toLowerCase())) {
          return false;
        }
      }

      // GPU Brand Filter
      if (filterState.gpu && filterState.gpu.length > 0) {
        if (
          !filterState.gpu.includes(laptop.specs.graphics.brand.toLowerCase())
        ) {
          return false;
        }
      }

      // RAM Size Filter
      if (filterState.ram && filterState.ram.length > 0) {
        if (!filterState.ram.includes(laptop.specs.memory.size.toString())) {
          return false;
        }
      }

      // Storage Type Filter
      if (filterState.hardDisk && filterState.hardDisk.length > 0) {
        const storageType = laptop.specs.storage.type.toLowerCase();
        const hasSSD = storageType.includes("ssd");
        const hasHDD = storageType.includes("hdd");

        const matchesFilter = filterState.hardDisk.some((type) => {
          if (type === "ssd") return hasSSD;
          if (type === "hdd") return hasHDD;
          return false;
        });

        if (!matchesFilter) return false;
      }

      // Screen Resolution Filter
      if (filterState.screenRes && filterState.screenRes.length > 0) {
        const resolution = laptop.specs.display.resolution;
        const [width, height] = resolution
          .split("x")
          .map((num) => parseInt(num));

        const matchesFilter = filterState.screenRes.some((res) => {
          if (res === "1080p" && height === 1080) return true;
          if (res === "1440p" && height === 1440) return true;
          if (res === "4k" && height >= 2160) return true;
          return false;
        });

        if (!matchesFilter) return false;
      }

      return true;
    });

    setLaptops(filteredLaptops);
  }, [filterState, searchQuery]);

  useEffect(() => {
    const page = parseInt(pageIndex);
    if (page < 1) {
      setPageIndex(1);
    } else if (page > pagesNumber) {
      setPageIndex(pagesNumber);
    }
  }, [pageIndex, pagesNumber, router]);

  const changePage = (newPage) => {
    if (newPage < 1) return;

    const params = new URLSearchParams(searchParams);
    setPageIndex(newPage);
    params.set("page", newPage);

    router.push(`?${params}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
      params.set("page", "1");
    } else {
      // إعادة ضبط كل شيء عند مسح البحث
      params.delete("q");
      params.delete("page");
      dispatch(resetAllFilters());
    }

    router.push(query ? `?${params}` : "/");
  };

  return (
    <div>
      <Header onSearch={handleSearch} initialSearch={searchQuery} />
      <div className="flex relative">
        {/* Filter Toggle Button for Mobile */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-yellow-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowMobileFilter((prev) => !prev)}
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>

        {/* FilterBox - Desktop & Mobile */}
        <div
          className={`
          ${showMobileFilter ? "fixed inset-0 z-40 bg-white" : "hidden"} 
          md:relative md:block
        `}
        >
          <FilterBox onClose={() => setShowMobileFilter(false)} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {laptops
              .slice(productsChunk * (pageIndex - 1), productsChunk * pageIndex)
              .map((laptop) => (
                <ProductCard
                  key={laptop.id}
                  id={laptop.id}
                  name={laptop.name}
                  img={laptop.image}
                  price={laptop.price}
                />
              ))}
          </div>

          {/* Pagination - تحسين التنقل بين الصفحات */}
          <div className="pagination-buttons flex flex-wrap gap-1 m-5 justify-center">
            <button
              className="w-8 h-8 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 disabled:cursor-not-allowed"
              disabled={parseInt(pageIndex) === 1}
              onClick={() => changePage(parseInt(pageIndex) - 1)}
            >
              {"<"}
            </button>
            {Array.from({ length: pagesNumber }).map((_, index) => (
              <button
                onClick={() => changePage(index + 1)}
                key={index}
                className={`w-8 h-8 rounded-md text-white ${
                  index + 1 === parseInt(pageIndex)
                    ? "bg-gray-800"
                    : "bg-yellow-500"
                } hover:bg-yellow-600`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="w-8 h-8 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 disabled:cursor-not-allowed"
              disabled={parseInt(pageIndex) === pagesNumber}
              onClick={() => changePage(parseInt(pageIndex) + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <SuspenseWrapper>
      <HomeContent />
    </SuspenseWrapper>
  );
}

import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import FilterDropdown from "../components/FilterDropdown";

const GET_MODELS_BY_BRAND = gql`
  query GetModelsByBrand($id: ID!, $sortBy: sortBy!) {
    findUniqueBrand(id: $id) {
      id
      name
      image
    }
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

const GUITAR_TYPES = ["typeAll", "typeElectric", "typeAcoustic", "typeBass"];

function ModelsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { loading, error, data } = useQuery(GET_MODELS_BY_BRAND, {
    variables: {
      id: brandId,
      sortBy: { field: "price", order: "ASC" },
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("typeAll");
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 6;

  const filteredModels = useMemo(() => {
    if (!data?.findBrandModels) return [];
    return data.findBrandModels.filter((model) => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "typeAll" ||
        model.type.toLowerCase() === typeFilter.replace("type", "").toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const paginatedModels = filteredModels.slice(
    (currentPage - 1) * modelsPerPage,
    currentPage * modelsPerPage
  );

  if (loading)
    return <p className="text-center mt-10">{t("loading")}</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {t("errorLoading")}: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500 hover:underline flex items-center gap-1"
      >
        &larr; {t("backToBrands")}
      </button>

      <div className="relative">
        <img src="/images/img1.png" alt="Logo" />

        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 pt-20">
          <div className="md:w-2/3 text-center md:text-center">
          <h1 className="text-[56px] font-bold mb-4">
  {t("playLike")} <span className="text-orange-500">{t("rockStar")}</span>
</h1>
<p className="text-gray-600 text-[16px] max-w-2xl mx-auto">
  {t("brandDescription", { brand: data.findUniqueBrand.name })}
</p>

          </div>

          <div
            className="relative mx-auto w-[672px] h-[459px] overflow-visible"
            style={{
              borderBottomLeftRadius: "360px",
              borderBottomRightRadius: "151px",
              background: "linear-gradient(180deg, #FF8C60 0%, #FF5B1C 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={data.findUniqueBrand.image}
                alt={`${data.findUniqueBrand.name} Logo`}
                className="h-32 opacity-90"
              />
            </div>
            <div
              className="
                absolute
                -bottom-8
                left-[60%]
                -translate-x-[20%]
                w-20 h-20
                bg-white
                rounded-full
                flex items-center justify-center
                shadow-lg
                z-10
              "
            >
              <img
                src="/images/Butterfly.png"
                alt="Icon"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-[30px] font-semibold mb-8 text-left lg:text-right lg:translate-x-[240px] lg:w-fit lg:mx-auto">
        {t("checkOutSelection")} <span className="text-orange-500">Selection</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-start lg:justify-end lg:pr-12">
        <FilterDropdown
          value={typeFilter}
          onChange={(val) => {
            setTypeFilter(val);
            setCurrentPage(1);
          }}
        />

        <div className="relative w-full sm:w-72">
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C0]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full border border-gray-300 pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-[#B8B8C0] focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {paginatedModels.map((model) => (
          <div
            key={model.id}
            onClick={() => navigate(`/brand/${brandId}/guitar/${model.id}`)}
            className="cursor-pointer flex flex-col"
          >
            <div className="w-full flex justify-center mb-4">
              <img
                src={model.image}
                alt={model.name}
                className="h-48 object-contain"
              />
            </div>
            <h3 className="text-base font-medium">{model.name}</h3>
            <p className="text-sm text-gray-500">${model.price}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
          <p className="text-sm text-[#9A98A7] uppercase tracking-widest">
            Showing {paginatedModels.length} results from {filteredModels.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`w-9 h-9 flex items-center justify-center border rounded ${
                currentPage === 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              &lt;
            </button>
            {/* Pagination */}
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let startPage = Math.max(2, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
              if (endPage - startPage < maxVisible - 1) {
                startPage = Math.max(2, endPage - maxVisible + 1);
              }
              pages.push(
                <button
                  key={1}
                  onClick={() => setCurrentPage(1)}
                  className={`w-9 h-9 flex items-center justify-center border rounded ${
                    currentPage === 1 ? "border-orange-500 text-orange-500 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  1
                </button>
              );
              if (startPage > 2) {
                pages.push(
                  <span key="left-ellipsis" className="w-9 h-9 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                );
              }
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-9 h-9 flex items-center justify-center border rounded ${
                      currentPage === i ? "border-orange-500 text-orange-500 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              if (endPage < totalPages - 1) {
                pages.push(
                  <span key="right-ellipsis" className="w-9 h-9 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                );
              }
              if (totalPages > 1) {
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-9 h-9 flex items-center justify-center border rounded ${
                      currentPage === totalPages ? "border-orange-500 text-orange-500 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                );
              }
              return pages;
            })()}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`w-9 h-9 flex items-center justify-center border rounded ${
                currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelsPage;
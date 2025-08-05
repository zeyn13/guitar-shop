import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";  // Context'in olduğu yolu uygun ayarla

const GET_MODELS_BY_BRAND = gql`
  query GetModelsByBrand($id: ID!, $sortBy: sortBy!) {
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

  // useLanguage'den t fonksiyonunu çekiyoruz
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
        typeFilter === "typeAll" || model.type.toLowerCase() === typeFilter.replace("type", "").toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const paginatedModels = filteredModels.slice(
    (currentPage - 1) * modelsPerPage,
    currentPage * modelsPerPage
  );

  if (loading) return <p className="text-center mt-10">{t("loading")}</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{t("errorLoading")}: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; {t("backToBrands")}
      </button>

      <h1 className="text-2xl font-bold mb-4">{t("modelsTitle")}</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="border p-2 rounded flex-grow"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border p-2 rounded"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {GUITAR_TYPES.map((typeKey) => (
            <option key={typeKey} value={typeKey}>
              {t(typeKey)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedModels.map((model) => (
          <div
            key={model.id}
            onClick={() => navigate(`/brand/${brandId}/guitar/${model.id}`)}
            className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-40 object-contain mb-3"
            />
            <h2 className="font-semibold text-lg">{model.name}</h2>
            <p className="text-sm text-gray-600">
              {t("Type") /* Buraya da "Type" ekleyebilirsin */}: {t(`type${model.type.charAt(0).toUpperCase() + model.type.slice(1).toLowerCase()}`)}
            </p>
            <p className="text-green-700 font-bold mt-1">${model.price}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            {t("prev")}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            {t("next")}
          </button>
        </div>
      )}
    </div>
  );
}

export default ModelsPage;

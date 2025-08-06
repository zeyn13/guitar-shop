import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      price
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

function GuitarDetailsPage() {
  const { brandId, guitarId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId: guitarId },
    skip: !brandId || !guitarId,
  });

  const [activeTab, setActiveTab] = useState("specs");
  const [musicianIndex, setMusicianIndex] = useState(0);

  if (!brandId || !guitarId) {
    return (
      <p className="text-center text-red-500 mt-10">
        {t("errorMissingParams") || "Error: Missing brandId or guitarId in URL params."}
      </p>
    );
  }

  if (loading) return <p className="text-center mt-10">{t("loading")}</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {t("error")}: {error.message}
      </p>
    );

  const model = data.findUniqueModel;
  const musiciansToShow = model.musicians.slice(musicianIndex, musicianIndex + 2);

  const handleNextMusicians = () => {
    if (musicianIndex + 2 < model.musicians.length) {
      setMusicianIndex(musicianIndex + 2);
    }
  };

  const handlePrevMusicians = () => {
    if (musicianIndex - 2 >= 0) {
      setMusicianIndex(musicianIndex - 2);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500 hover:underline flex items-center gap-1"
      >
        &larr; {t("backToModels") || "Back to Models"}
      </button>

      {/* HEADER */}
      <div className="relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3 text-center">
            <h1 className="text-3xl md:text-[56px] font-bold mb-4">{model.name}</h1>
          </div>
          <div
            className="relative mx-auto w-full max-w-[400px] md:max-w-[672px] h-[300px] md:h-[459px] overflow-visible"
            style={{
              borderBottomLeftRadius: "360px",
              borderBottomRightRadius: "151px",
              background: "linear-gradient(180deg, #FF8C60 0%, #FF5B1C 100%)",
              marginTop: "0",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={model.image}
                alt={model.name}
                className="h-24 md:h-32 opacity-90 -rotate-45 translate-x-6 -translate-y-4"
              />
            </div>
            <div
              className="
                absolute
                -bottom-8
                left-1/2
                -translate-x-1/2
                w-16 h-16 md:w-20 md:h-20
                bg-white
                rounded-full
                flex items-center justify-center
                shadow-lg
                z-10
              "
            >
              <img src="/images/Butterfly.png" alt="Icon" className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="grid grid-cols-2 text-center mt-16 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("specs")}
          className={`text-sm md:text-lg font-medium pb-3 border-b-2 transition-colors duration-200 ${
            activeTab === "specs"
              ? "text-orange-500 border-orange-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
          }`}
        >
          {t("Specification") || "Specification"}
        </button>
        <button
          onClick={() => setActiveTab("musicians")}
          className={`text-sm md:text-lg font-medium pb-3 border-b-2 transition-colors duration-200 ${
            activeTab === "musicians"
              ? "text-orange-500 border-orange-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
          }`}
        >
          {t("Who plays it?") || "Who plays it?"}
        </button>
      </div>

      {/* SPECS */}
      {activeTab === "specs" && (
        <div className="mt-8 space-y-3 text-gray-700 text-sm md:text-base">
          <p><strong>{t("Body Wood")}</strong>: {model.specs.bodyWood}</p>
          <p><strong>{t("Neck Wood")}</strong>: {model.specs.neckWood}</p>
          <p><strong>{t("Fingerboard Wood")}</strong>: {model.specs.fingerboardWood}</p>
          <p><strong>{t("Pickups")}</strong>: {model.specs.pickups}</p>
          <p><strong>{t("Tuners")}</strong>: {model.specs.tuners}</p>
          <p><strong>{t("Scale Length")}</strong>: {model.specs.scaleLength}</p>
          <p><strong>{t("Bridge")}</strong>: {model.specs.bridge}</p>
        </div>
      )}

      {/* MUSICIANS */}
      {activeTab === "musicians" && (
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {musiciansToShow.length === 0 && (
            <p className="text-center">{t("noMusiciansFound") || "No musicians found."}</p>
          )}

          {musiciansToShow.map((musician, index) => (
            <div
              key={index}
              className="flex flex-col items-center border"
              style={{
                backgroundColor: "#FFEFE8",
                width: "100%",
                maxWidth: "320px",
                height: "420px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "#ddd",
                padding: "16px",
                gap: "12px",
                opacity: 1,
              }}
            >
              <div
                className="w-full overflow-hidden rounded"
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={musician.musicianImage}
                  alt={musician.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <p className="font-medium text-gray-800 mt-2 text-center">{musician.name}</p>
            </div>
          ))}

          {/* Pagination */}
          <div className="w-full flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(model.musicians.length / 2) }, (_, i) => (
              <div
                key={i}
                onClick={() => setMusicianIndex(i * 2)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  musicianIndex === i * 2 ? "bg-[#D9D9D9]" : "bg-[#D9D9D9] opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuitarDetailsPage;

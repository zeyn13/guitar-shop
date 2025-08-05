import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Context yolunu kendine göre ayarla

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
  if (error) return <p className="text-center text-red-500 mt-10">{t("error")}: {error.message}</p>;

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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; {t("backToModels") || "Back to Models"}
      </button>

      <h1 className="text-3xl font-bold mb-4">{model.name}</h1>

      <img
        src={model.image}
        alt={model.name}
        className="w-full max-h-96 object-contain mb-6"
      />

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "specs" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("specs")}
        >
          {t("specs") || "Specs"}
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "musicians" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("musicians")}
        >
          {t("musicians") || "Musicians"}
        </button>
      </div>

      {activeTab === "specs" && (
        <div className="space-y-3 text-gray-700">
          <p><strong>{t("bodyWood") || "Body Wood"}:</strong> {model.specs.bodyWood}</p>
          <p><strong>{t("neckWood") || "Neck Wood"}:</strong> {model.specs.neckWood}</p>
          <p><strong>{t("fingerboardWood") || "Fingerboard Wood"}:</strong> {model.specs.fingerboardWood}</p>
          <p><strong>{t("pickups") || "Pickups"}:</strong> {model.specs.pickups}</p>
          <p><strong>{t("tuners") || "Tuners"}:</strong> {model.specs.tuners}</p>
          <p><strong>{t("scaleLength") || "Scale Length"}:</strong> {model.specs.scaleLength}</p>
          <p><strong>{t("bridge") || "Bridge"}:</strong> {model.specs.bridge}</p>
        </div>
      )}

      {activeTab === "musicians" && (
        <div>
          {musiciansToShow.length === 0 && <p>{t("noMusiciansFound") || "No musicians found."}</p>}
          {musiciansToShow.map((musician, index) => (
            <div
              key={index}
              className="mb-4 border p-3 rounded shadow bg-white flex items-center gap-4"
            >
              <img
                src={musician.musicianImage}
                alt={musician.name}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold">{musician.name}</p>
                <p className="text-sm text-gray-600">{musician.bands.join(", ")}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between max-w-xs mx-auto mt-4">
            <button
              onClick={handlePrevMusicians}
              disabled={musicianIndex === 0}
              className={`px-3 py-1 rounded border ${
                musicianIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              {t("prev") || "Prev"}
            </button>
            <button
              onClick={handleNextMusicians}
              disabled={musicianIndex + 2 >= model.musicians.length}
              className={`px-3 py-1 rounded border ${
                musicianIndex + 2 >= model.musicians.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              {t("next") || "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuitarDetailsPage;

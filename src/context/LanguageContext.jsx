import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    backToBrands: "Back to Brands",
    searchPlaceholder: "Search models...",
    typeAll: "All",
    typeElectric: "Electric",
    typeAcoustic: "Acoustic",
    typeBass: "Bass",
    modelsTitle: "Models",
    loading: "Loading...",
    errorLoading: "Error loading data",
    // Diğer çeviriler...
  },
  mk: {
    backToBrands: "Назад кон брендови",
    searchPlaceholder: "Пребарувај модели...",
    typeAll: "Сите",
    typeElectric: "Електрични",
    typeAcoustic: "Акустични",
    typeBass: "Бас",
    modelsTitle: "Модели",
    loading: "Се вчитува...",
    errorLoading: "Грешка при вчитување",
    // Diğer çeviriler...
  },
  sq: {
    backToBrands: "Kthehu tek markat",
    searchPlaceholder: "Kërko modele...",
    typeAll: "Të gjitha",
    typeElectric: "Elektrike",
    typeAcoustic: "Akustike",
    typeBass: "Bas",
    modelsTitle: "Modelet",
    loading: "Duke ngarkuar...",
    errorLoading: "Gabim gjatë ngarkimit",
    // Diğer çeviriler...
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Sayfa yüklendiğinde localStorage'dan dil getir
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    // Dil değiştiğinde localStorage'a kaydet
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

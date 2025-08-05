import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="border-t mt-10 py-4 text-center">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="en">English</option>
        <option value="mk">Macedonian</option>
        <option value="sq">Albanian</option>
      </select>
    </footer>
  );
}

export default Footer;

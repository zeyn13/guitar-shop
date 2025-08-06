import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-gray-100 pt-20 pb-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Left: Logo and contact */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/img1.png" alt="Logo" className="h-6" />
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                stroke="#666666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                stroke="#666666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Enquiry@VibeStrings.com
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z"
                stroke="#666666"
                strokeWidth="1.5"
              />
              <path
                d="M3.6202 8.49C5.5902 -0.169998 18.4202 -0.159997 20.3802 8.5C21.5302 13.58 18.3702 17.88 15.6002 20.54C13.5902 22.48 10.4102 22.48 8.3902 20.54C5.6302 17.88 2.4702 13.57 3.6202 8.49Z"
                stroke="#666666"
                strokeWidth="1.5"
              />
            </svg>
            San Francisco
          </div>
        </div>

        {/* Center: Pages */}
        <div>
          <h4 className="font-semibold mb-4">{t("pages")}</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">{t("store")}</a></li>
            <li><a href="#" className="hover:underline">{t("collections")}</a></li>
            <li><a href="#" className="hover:underline">{t("support")}</a></li>
          </ul>
        </div>

        {/* Center: Product */}
        <div>
          <h4 className="font-semibold mb-4">{t("product")}</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">{t("terms")}</a></li>
            <li><a href="#" className="hover:underline">{t("privacy")}</a></li>
            <li><a href="#" className="hover:underline">{t("copyright")}</a></li>
          </ul>
        </div>

        {/* Right: Follow Us */}
        <div>
          <h4 className="font-semibold mb-4">{t("followUs")}</h4>
          <div className="flex gap-6 mt-2">
            <a href="#" aria-label="Facebook">
              <svg className="w-5 h-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07C2 17.1 5.66 21.28 10.44 22v-7.02H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.91h-2.34V22C18.34 21.28 22 17.1 22 12.07z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg className="w-5 h-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.12 12.12 0 013 5.16a4.27 4.27 0 001.32 5.7A4.24 4.24 0 012.8 10v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54 12.12 12.12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className="w-5 h-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="max-w-6xl mx-auto mt-10 flex justify-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 text-sm px-3 py-1 rounded"
        >
          <option value="en">{t("English")}</option>
          <option value="sq">{t("Albanian")}</option>
          <option value="mk">{t("Macedonian")}</option>
        </select>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-6 text-center text-gray-500 text-sm">
        © 2022 Copyright. VibeStrings
      </div>
    </footer>
  );
}

export default Footer;

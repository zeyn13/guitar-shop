import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "../context/LanguageContext";

export default function FilterDropdown({ value, onChange, options }) {
  const { t } = useLanguage();

  const defaultOptions = [
    { id: "typeAll", label: t("typeAll") },
    { id: "typeElectric", label: t("typeElectric") },
    { id: "typeAcoustic", label: t("typeAcoustic") },
    { id: "typeBass", label: t("typeBass") },
  ];

  const types = options || defaultOptions;
  const selected = types.find((t) => t.id === value);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative w-full sm:w-56">
          {/* Button */}
          <Listbox.Button className="relative w-full border border-gray-300 bg-white py-3 pl-10 pr-10 text-left cursor-default text-sm text-gray-700">
            {/* Left icon */}
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17V13.414L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>

            <span>
              {value === "typeAll"
                ? t("filterByType")
                : selected?.label || t("filterByType")}
            </span>

            {/* Right chevron */}
            <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center">
              <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Options */}
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {types.map((type) => (
              <Listbox.Option key={type.id} value={type.id} as={Fragment}>
                {({ active, selected }) => (
                  <div
                    className={`cursor-default select-none py-3 px-4 ${
                      active || selected
                        ? "bg-orange-50 text-[#FF8C60]"
                        : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}

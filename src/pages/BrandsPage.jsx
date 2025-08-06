import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";


const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();
    const { t } = useLanguage();
  

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-10">
       <img
  src="/images/img1.png" 
  alt="Logo"
/>
    {/* HERO SECTION */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative">
      {/* Left Text */}
      <div className="md:w-1/2 flex justify-start">
      <div className="max-w-xl text-center mr-20">
      <h1 className="text-[56px] font-bold mb-4">
        {t("browseTopQuality")} <span className="text-orange-500">{t("guitars")}</span> {t("online")}
      </h1>
      <p className="text-gray-600 text-[16px]">
        {t("exploreCollections")} <br />
        {t("withVibeStrings")}
      </p>
    </div>
</div>

      {/* Right Image */}
      <div
  className="relative overflow-visible w-full md:w-[672px] h-auto"
>
  <img
    src="/images/img2.png"
    alt="Guitar"
    className="w-full h-auto object-contain"
  />

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

      {/* BRANDS SECTION */}
      <div className="text-center mb-12">
      <h2 className="text-[44px] font-semibold mb-2">
  {t("featuringThe")} <span className="text-orange-500">{t("bestBrands")}</span>
</h2>
<p className="text-gray-600 mb-8">
  {t("selectYourBrand")}
</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.findAllBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => navigate(`/brand/${brand.id}`)}
              className="cursor-pointer bg-white p-4 rounded-xl  hover:shadow-md transition flex flex-col items-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-20 object-contain mb-2"
              />
            </div>
          ))}
        </div>
      </div>

     {/* FEATURES SECTION */}
<section className="bg-[#111] text-white py-16 px-6">
  {/* Heading */}
  <h2 className="text-center text-4xl font-semibold mb-16">
  {t("whyTry")} <span className="text-[#FF5B1C]">VibeStrings?</span>
  </h2>

  {/* Features */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
    {/* Feature 1 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#222] p-4 rounded-xl mb-6 flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9599 1.95952C18.8802 1.03917 20.1795 0.666626 21.667 0.666626H24.3337C25.8211 0.666626 27.1204 1.03917 28.0408 1.95952C28.9611 2.87987 29.3337 4.17915 29.3337 5.66663V8.33329C29.3337 9.82077 28.9611 11.1201 28.0408 12.0404C27.1204 12.9607 25.8211 13.3333 24.3337 13.3333H21.667C20.1795 13.3333 18.8802 12.9607 17.9599 12.0404C17.0395 11.1201 16.667 9.82077 16.667 8.33329V5.66663C16.667 4.17915 17.0395 2.87987 17.9599 1.95952ZM19.3741 3.37373C18.9611 3.78672 18.667 4.48744 18.667 5.66663V8.33329C18.667 9.51248 18.9611 10.2132 19.3741 10.6262C19.7871 11.0392 20.4878 11.3333 21.667 11.3333H24.3337C25.5128 11.3333 26.2136 11.0392 26.6266 10.6262C27.0395 10.2132 27.3337 9.51248 27.3337 8.33329V5.66663C27.3337 4.48744 27.0395 3.78672 26.6266 3.37373C26.2136 2.96075 25.5128 2.66663 24.3337 2.66663H21.667C20.4878 2.66663 19.7871 2.96075 19.3741 3.37373Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.95989 17.9595C2.88023 17.0392 4.17951 16.6666 5.66699 16.6666H8.33366C9.82114 16.6666 11.1204 17.0392 12.0408 17.9595C12.9611 18.8799 13.3337 20.1791 13.3337 21.6666V24.3333C13.3337 25.8208 12.9611 27.1201 12.0408 28.0404C11.1204 28.9607 9.82114 29.3333 8.33366 29.3333H5.66699C4.17951 29.3333 2.88023 28.9607 1.95989 28.0404C1.03954 27.1201 0.666992 25.8208 0.666992 24.3333V21.6666C0.666992 20.1791 1.03954 18.8799 1.95989 17.9595ZM3.3741 19.3737C2.96111 19.7867 2.66699 20.4874 2.66699 21.6666V24.3333C2.66699 25.5125 2.96111 26.2132 3.3741 26.6262C3.78709 27.0392 4.4878 27.3333 5.66699 27.3333H8.33366C9.51285 27.3333 10.2136 27.0392 10.6266 26.6262C11.0395 26.2132 11.3337 25.5125 11.3337 24.3333V21.6666C11.3337 20.4874 11.0395 19.7867 10.6266 19.3737C10.2136 18.9607 9.51285 18.6666 8.33366 18.6666H5.66699C4.4878 18.6666 3.78709 18.9607 3.3741 19.3737Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00033 2.66663C4.60709 2.66663 2.66699 4.60673 2.66699 6.99996C2.66699 9.39319 4.60709 11.3333 7.00033 11.3333C9.39356 11.3333 11.3337 9.39319 11.3337 6.99996C11.3337 4.60673 9.39356 2.66663 7.00033 2.66663ZM0.666992 6.99996C0.666992 3.50216 3.50252 0.666626 7.00033 0.666626C10.4981 0.666626 13.3337 3.50216 13.3337 6.99996C13.3337 10.4978 10.4981 13.3333 7.00033 13.3333C3.50252 13.3333 0.666992 10.4978 0.666992 6.99996Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.0003 18.6666C20.6071 18.6666 18.667 20.6067 18.667 23C18.667 25.3932 20.6071 27.3333 23.0003 27.3333C25.3936 27.3333 27.3337 25.3932 27.3337 23C27.3337 20.6067 25.3936 18.6666 23.0003 18.6666ZM16.667 23C16.667 19.5022 19.5025 16.6666 23.0003 16.6666C26.4981 16.6666 29.3337 19.5022 29.3337 23C29.3337 26.4978 26.4981 29.3333 23.0003 29.3333C19.5025 29.3333 16.667 26.4978 16.667 23Z" fill="#A4A4A4"/>
</svg>

      </div>
      <h4 className="uppercase font-semibold tracking-wide mb-2">
  {t("smoothBrowsing")}
</h4>
<div className="flex flex-col items-center text-center">
  <p className="text-gray-400 text-xs leading-snug">
    {t("smoothBrowsingDescLine1")}<br />
    {t("smoothBrowsingDescLine2")}
  </p>
</div>


    </div>

    {/* Feature 2 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#222] p-4 rounded-xl mb-6 flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.47338 4.91308C3.54959 2.98225 5.6233 1.66663 8.00018 1.66663H20.0002C20.5525 1.66663 21.0002 2.11434 21.0002 2.66663V16C21.0002 18.0189 19.3525 19.6666 17.3335 19.6666H16.0002C15.4479 19.6666 15.0002 19.2189 15.0002 18.6666C15.0002 18.1143 15.4479 17.6666 16.0002 17.6666H17.3335C18.2479 17.6666 19.0002 16.9143 19.0002 16V3.66663H8.00018C6.37706 3.66663 4.95747 4.56431 4.22034 5.8868C3.95146 6.36921 3.34241 6.54231 2.86 6.27342C2.37759 6.00454 2.2045 5.39549 2.47338 4.91308Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0003 6.66663C19.0003 6.11434 19.448 5.66663 20.0003 5.66663H22.4537C23.7788 5.66663 24.984 6.38395 25.6385 7.51117L25.6418 7.51685L25.6418 7.51686L27.9217 11.5035C28.0987 11.813 28.0975 12.1933 27.9186 12.5017C27.7397 12.8101 27.4102 13 27.0536 13H25.3337C25.1526 13 25.0003 13.1522 25.0003 13.3333V17.3333C25.0003 17.5143 25.1526 17.6666 25.3337 17.6666H29.3337C29.8859 17.6666 30.3337 18.1143 30.3337 18.6666V22.6666C30.3337 25.4322 28.0993 27.6666 25.3337 27.6666H24.0003C23.448 27.6666 23.0003 27.2189 23.0003 26.6666C23.0003 25.7522 22.248 25 21.3337 25C20.4193 25 19.667 25.7522 19.667 26.6666C19.667 27.2189 19.2193 27.6666 18.667 27.6666H13.3337C12.7814 27.6666 12.3337 27.2189 12.3337 26.6666C12.3337 25.7522 11.5814 25 10.667 25C9.75261 25 9.00033 25.7522 9.00033 26.6666C9.00033 27.2189 8.55261 27.6666 8.00033 27.6666H6.66699C3.90137 27.6666 1.66699 25.4322 1.66699 22.6666C1.66699 22.1143 2.11471 21.6666 2.66699 21.6666C3.21928 21.6666 3.66699 22.1143 3.66699 22.6666C3.66699 24.3277 5.00594 25.6666 6.66699 25.6666H7.1394C7.57668 24.1308 8.99445 23 10.667 23C12.3395 23 13.7573 24.1308 14.1946 25.6666H17.8061C18.2434 24.1308 19.6611 23 21.3337 23C23.0062 23 24.424 24.1308 24.8612 25.6666H25.3337C26.9947 25.6666 28.3337 24.3277 28.3337 22.6666V19.6666H25.3337C24.048 19.6666 23.0003 18.6189 23.0003 17.3333V13.3333C23.0003 12.049 24.0459 11.0021 25.3298 11L23.9089 8.51544C23.9084 8.51461 23.9079 8.51378 23.9074 8.51295C23.6017 7.98831 23.0476 7.66663 22.4537 7.66663H21.0003V16C21.0003 18.0189 19.3526 19.6666 17.3337 19.6666H16.0003C15.448 19.6666 15.0003 19.2189 15.0003 18.6666C15.0003 18.1143 15.448 17.6666 16.0003 17.6666H17.3337C18.248 17.6666 19.0003 16.9143 19.0003 16V6.66663Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 25C9.74619 25 9 25.7462 9 26.6667C9 27.5871 9.74619 28.3333 10.6667 28.3333C11.5871 28.3333 12.3333 27.5871 12.3333 26.6667C12.3333 25.7462 11.5871 25 10.6667 25ZM7 26.6667C7 24.6416 8.64162 23 10.6667 23C12.6917 23 14.3333 24.6416 14.3333 26.6667C14.3333 28.6917 12.6917 30.3333 10.6667 30.3333C8.64162 30.3333 7 28.6917 7 26.6667Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3337 25C20.4132 25 19.667 25.7462 19.667 26.6667C19.667 27.5871 20.4132 28.3333 21.3337 28.3333C22.2541 28.3333 23.0003 27.5871 23.0003 26.6667C23.0003 25.7462 22.2541 25 21.3337 25ZM17.667 26.6667C17.667 24.6416 19.3086 23 21.3337 23C23.3587 23 25.0003 24.6416 25.0003 26.6667C25.0003 28.6917 23.3587 30.3333 21.3337 30.3333C19.3086 30.3333 17.667 28.6917 17.667 26.6667Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.3333 13C25.1523 13 25 13.1523 25 13.3333V17.3333C25 17.5144 25.1523 17.6667 25.3333 17.6667H28.3333V16.265L26.4723 13H25.3333ZM23 13.3333C23 12.0477 24.0477 11 25.3333 11H27.0533C27.4125 11 27.7442 11.1927 27.9221 11.5048L30.2021 15.5048C30.2881 15.6557 30.3333 15.8263 30.3333 16V18.6667C30.3333 19.219 29.8856 19.6667 29.3333 19.6667H25.3333C24.0477 19.6667 23 18.619 23 17.3333V13.3333Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.66699 10.6666C1.66699 10.1143 2.11471 9.66663 2.66699 9.66663H10.667C11.2193 9.66663 11.667 10.1143 11.667 10.6666C11.667 11.2189 11.2193 11.6666 10.667 11.6666H2.66699C2.11471 11.6666 1.66699 11.2189 1.66699 10.6666Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.66699 14.6666C1.66699 14.1143 2.11471 13.6666 2.66699 13.6666H8.00033C8.55261 13.6666 9.00033 14.1143 9.00033 14.6666C9.00033 15.2189 8.55261 15.6666 8.00033 15.6666H2.66699C2.11471 15.6666 1.66699 15.2189 1.66699 14.6666Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.66699 18.6666C1.66699 18.1143 2.11471 17.6666 2.66699 17.6666H5.33366C5.88594 17.6666 6.33366 18.1143 6.33366 18.6666C6.33366 19.2189 5.88594 19.6666 5.33366 19.6666H2.66699C2.11471 19.6666 1.66699 19.2189 1.66699 18.6666Z" fill="#A4A4A4"/>
</svg>

      </div>
      <h4 className="uppercase font-semibold tracking-wide mb-2">
  {t("Easy Delivery")}
</h4>
<div className="flex flex-col items-center text-center">
  <p className="text-gray-400 text-xs leading-snug">
    {t("Easy Delivery Description Line1")}
    <br />
    {t("Easy Delivery Description Line2")}
  </p>
</div>

    </div>

    {/* Feature 3 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#222] p-4 rounded-xl mb-6 flex items-center justify-center">
      <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.34633 10.3334C4.13862 10.3334 2.33301 12.139 2.33301 14.3467V18.4477C3.05655 18.1594 3.84415 18 4.66634 18C8.16529 18 10.9997 20.8344 10.9997 24.3334C10.9997 25.4102 10.7261 26.4383 10.2355 27.3334H21.653C23.8607 27.3334 25.6663 25.5277 25.6663 23.32V22.7334H24.133C22.2536 22.7334 20.4294 21.3591 20.257 19.329C20.1493 18.1794 20.587 17.1054 21.3454 16.36C22.0276 15.6642 22.9628 15.2667 23.973 15.2667H25.6663V14.3467C25.6663 12.139 23.8607 10.3334 21.653 10.3334H6.34633ZM0.333008 14.3467C0.333008 11.0344 3.03404 8.33337 6.34633 8.33337H21.653C24.9653 8.33337 27.6663 11.0344 27.6663 14.3467V16.2667C27.6663 16.819 27.2186 17.2667 26.6663 17.2667H23.973C23.4943 17.2667 23.0732 17.4523 22.7695 17.7643L22.7515 17.7823C22.3968 18.1286 22.1986 18.6216 22.2485 19.1452L22.2496 19.157L22.2496 19.157C22.3201 20.0036 23.1342 20.7334 24.133 20.7334H26.6663C27.2186 20.7334 27.6663 21.1811 27.6663 21.7334V23.32C27.6663 26.6323 24.9653 29.3334 21.653 29.3334H8.17301C7.75257 29.3334 7.37704 29.0704 7.23328 28.6753C7.08953 28.2802 7.20826 27.8374 7.5304 27.5672C7.85433 27.2955 8.13987 26.9579 8.36256 26.5762L8.37517 26.5551C8.77232 25.9111 8.99967 25.1459 8.99967 24.3334C8.99967 21.939 7.06072 20 4.66634 20C3.65096 20 2.70843 20.3558 1.95632 20.9554C1.65597 21.1948 1.24505 21.241 0.899022 21.0743C0.552991 20.9076 0.333008 20.5575 0.333008 20.1734V14.3467Z" fill="#A4A4A4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7997 4.26675C16.7997 3.19006 15.7236 2.45088 14.7274 2.82847L4.14023 6.82867C3.05121 7.24094 2.33301 8.28069 2.33301 9.45344V15.5467C2.33301 16.099 1.88529 16.5467 1.33301 16.5467C0.780723 16.5467 0.333008 16.099 0.333008 15.5467V9.45344C0.333008 7.45302 1.56172 5.66594 3.43244 4.9581L14.0186 0.958298C16.3291 0.082551 18.7997 1.79678 18.7997 4.26675V9.33341C18.7997 9.88569 18.352 10.3334 17.7997 10.3334C17.2474 10.3334 16.7997 9.88569 16.7997 9.33341V4.26675Z" fill="#A4A4A4"/>
</svg>

      </div>
      <h4 className="uppercase font-semibold tracking-wide mb-2">
  {t("Swift Payments")}
</h4>
<div className="flex flex-col items-center text-center">
  <p className="text-gray-400 text-xs leading-snug">
    {t("Swift Payments Description Line1")}
    <br />
    {t("Swift Payments Description Line2")}
  </p>
</div>

    </div>
  </div>
</section>

     {/* MOBILE APP SECTION */}
<div className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 md:px-0">
  {/* Left Text */}
  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
  <h2 className="text-[48px] leading-tight mb-6 text-center">
  {t("heroFinalTitleLine1")}
  <br />
  <span className="text-orange-500">{t("heroFinalTitleHighlight")}</span> {t("heroFinalTitleLine2")}
  <br />
  VibeStrings.
</h2>
<div className="flex justify-center md:justify-start gap-4">
  <img
    src="/images/gr2.png"
    alt="Get it on Google Play"
    className="w-[300px] ml-16 mt-6" // daha büyük ve sağa kaymış
  />
</div>
  </div>

  {/* Right Images */}
  <div className="md:w-1/2 flex justify-center relative">
    <div className="relative  z-10">
      <img
        src="/images/gr1.png"
        alt="App Screenshot 1"
        className="w-full h-full "
      />
    </div>
  </div>
</div>
    </div>
  );
}

export default BrandsPage;

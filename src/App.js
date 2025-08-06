import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <Router>
          <Routes>
            <Route path="/" element={<BrandsPage />} />
            <Route path="/brand/:brandId" element={<ModelsPage />} />
            <Route path="/guitar/:guitarId" element={<GuitarDetailsPage />} />
            <Route path="/brand/:brandId/guitar/:guitarId" element={<GuitarDetailsPage />} />

          </Routes>
          <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;

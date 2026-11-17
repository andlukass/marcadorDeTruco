import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TrucoScore from "./pages/TrucoScore";
import seo from "./assets/seo.json";
import "./App.css";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {seo.pages.map(page => (
            <Route key={page.path} path={page.path} element={<TrucoScore page={page} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

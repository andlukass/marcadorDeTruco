import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TrucoScore from "./pages/TrucoScore";
import "./App.css";

function App() {
  const isBrowser = typeof window !== "undefined";

  return (
    <HelmetProvider>
      {isBrowser ? (
        <Router>
          <Routes>
            <Route
              path="/marcador-de-truco"
              element={
                <TrucoScore
                  title="Marcador de Truco Online | Controle de Pontos"
                  description="Marcador de truco online gratuito. Controle os pontos da sua partida de truco de forma simples e intuitiva. Perfeito para jogos de truco paulista, mineiro e gaúcho."
                />
              }
            />
            <Route
              path="/anotador-de-truco"
              element={
                <TrucoScore
                  title="Anotador de Truco | Controle Suas Partidas"
                  description="Anotador de truco online para controlar suas partidas. Interface simples e prática para marcar pontos no truco. Ideal para jogos casuais e campeonatos."
                />
              }
            />
            <Route
              path="/placar-de-truco"
              element={
                <TrucoScore
                  title="Placar de Truco Digital | Marque Seus Pontos"
                  description="Placar digital de truco para suas partidas. Marque os pontos de forma rápida e precisa. Suporte para diferentes estilos de truco brasileiro."
                />
              }
            />
            <Route
              path="/contador-de-truco"
              element={
                <TrucoScore
                  title="Contador de Truco | Marque Pontos Online"
                  description="Contador de truco online gratuito. Marque os pontos da sua partida de truco de forma prática. Perfeito para jogos de truco em qualquer lugar."
                />
              }
            />
            <Route
              path="/"
              element={
                <TrucoScore
                  title="Truco Score | Placar Digital para Truco"
                  description="Placar digital gratuito para truco. Marque seus pontos de forma rápida e eficiente. Ideal para partidas casuais e campeonatos de truco em qualquer estilo."
                />
              }
            />
          </Routes>
        </Router>
      ) : (
        <div>
          <TrucoScore
            title="Truco Score | Placar Digital para Truco"
            description="Placar digital gratuito para truco. Marque seus pontos de forma rápida e eficiente. Ideal para partidas casuais e campeonatos de truco em qualquer estilo."
          />
        </div>
      )}
    </HelmetProvider>
  );
}

export default App;

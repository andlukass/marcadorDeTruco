import type { Team } from "../types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Counter from "../components/Counter";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { onAnalyticsEvent, onFirestoreEvent } from "../firebase";
import seo from "../assets/seo.json";
import { Link, useLocation } from "react-router-dom";

const handValues = [1, 3, 6, 9, 12];

function TrucoScore({ page }: { page: (typeof seo.pages)[number] }) {
  const { title, description } = page;
  const canonical = seo.origin + page.path;
  const image = seo.origin + "/android-chrome-512x512.png";
  const location = useLocation();
  const [, setCountryLocation] = useState<string | null>(null);
  const [teamOne, setTeamOne] = useState<Team>({
    name: "Nós",
    points: 0,
    victories: 0,
  });
  const [teamTwo, setTeamTwo] = useState<Team>({
    name: "Eles",
    points: 0,
    victories: 0,
  });

  const [handLevel, setHandLevel] = useState(0);
  const handValue = handValues[handLevel];
  const nextValue = handValues[handLevel + 1];
  const resetHand = () => setHandLevel(0);

  const clear = () => {
    resetHand();
    onAnalyticsEvent("scoreCleared");
    onFirestoreEvent("scoreCleared", location || "unknown");
    console.log("score_cleared");
    setTeamOne({ ...teamOne, points: 0 });
    setTeamTwo({ ...teamTwo, points: 0 });
  };

  useEffect(() => {
    if (location === undefined) return;
    onAnalyticsEvent("gameStarted");
    onFirestoreEvent("gameStarted", location || "unknown");
  }, [location]);

  useEffect(() => {
    const fetchGeoData = async () => {
      fetch("https://ipapi.co/json/")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setCountryLocation(data?.country_name);
        })
        .catch((error) => {
          setCountryLocation(null);
          console.error("Error fetching IP and location:", error);
        });
    };

    fetchGeoData();
  }, []);

  return (
    <>
      <Helmet defer={false}>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage", url: canonical,
          name: title, description, inLanguage: "pt-BR",
          about: { "@type": "WebApplication", "@id": seo.origin + "/#marcador",
            name: "Marcador de Truco", url: seo.origin + "/", applicationCategory: "GameApplication",
            operatingSystem: "Web", inLanguage: "pt-BR", isAccessibleForFree: true }
        })}</script>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <main className="tabletop">
        <section className="game" aria-label="Placar da partida">
          <div className="teams">
            <Counter team={teamOne} updateTeam={setTeamOne} handValue={handValue} onScore={resetHand} />
            <div className="hand-controls">
              <button className="truco" disabled={!nextValue || teamOne.points === 12 || teamTwo.points === 12} onClick={() => setHandLevel(handLevel + 1)}>
                {handLevel === 0 ? "Truco" : nextValue ? `Pedir ${nextValue}` : "Vale 12"}
              </button>
              <button className="cancel-request" disabled={handLevel === 0} onClick={resetHand}>
                Cancelar
              </button>
            </div>
            <Counter team={teamTwo} updateTeam={setTeamTwo} handValue={handValue} onScore={resetHand} />
          </div>
          <button className="reset" onClick={clear}><BsArrowCounterclockwise /> Zerar partida</button>
        </section>
        <article className="reading space-y-4 py-6">
          <h1 className="text-xl font-semibold">{page.path === "/" ? page.title : page.heading}</h1>
          {page.path === "/" && <h2 className="text-lg font-semibold">{page.heading}</h2>}
          {page.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <nav aria-label="Guias do marcador" className="flex flex-wrap gap-x-5 gap-y-3">
            {seo.pages.filter(other => other.path !== page.path).map(other => (
              <Link className="underline" key={other.path} to={other.path}>{other.title}</Link>
            ))}
          </nav>
        </article>
      </main>
    </>
  );
}

export default TrucoScore;

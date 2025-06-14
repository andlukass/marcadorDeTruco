import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Counter from "../components/Counter/Counter";
import { BsXCircleFill } from "react-icons/bs";
import logo42 from "../assets/42.png";
import { onAnalyticsEvent, onFirestoreEvent } from "../firebase";
import { texts } from "../assets/texts";
import { useLocation } from "react-router-dom";

function TrucoScore({ title, description }) {
  const location = useLocation();
  const [countryLocation, setCountryLocation] = useState(null);
  const currentText = texts.find(text => text.path === location.pathname) || texts[0];
  const [teamOne, setTeamOne] = useState({
    name: "Nós",
    points: 0,
    victories: 0,
  });
  const [teamTwo, setTeamTwo] = useState({
    name: "Eles",
    points: 0,
    victories: 0,
  });

  const pointsChange = (teamName, change) => {
    if (teamName == teamOne.name) {
      let newPoints = Math.min(12, Math.max(0, teamOne.points + change));
      setTeamOne({ ...teamOne, points: newPoints });
    } else {
      let newPoints = Math.min(12, Math.max(0, teamTwo.points + change));
      setTeamTwo({ ...teamTwo, points: newPoints });
    }
  };

  const nameChange = (teamName, newName) => {
    if (teamName == teamOne.name) {
      setTeamOne({ ...teamOne, name: newName });
    } else {
      setTeamTwo({ ...teamTwo, name: newName });
    }
  };

  const clear = () => {
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <div className="h-screen overflow-y-auto relative">
        <section className="h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="absolute top-[13%] left-1/2 -translate-x-1/2 -translate-y-1/2 mb-[50px] text-[0.8rem] opacity-70">
              <span className="ml-6">um oferecimento...</span>
              <img src={logo42} alt="Imagem" className="w-[180px] h-[80px] rounded-[25px] mt-1" />
            </div>
            <div className="flex mt-[30px] items-center justify-center w-full max-w-[700px]">
              <Counter
                team={teamOne}
                nameChange={nameChange}
                pointsChange={pointsChange}
              />
              <div className="border border-white h-[350px] sm:h-[400px] opacity-50"/>
              <Counter
                team={teamTwo}
                nameChange={nameChange}
                pointsChange={pointsChange}
              />
            </div>
            <div
              className="cursor-pointer select-none flex gap-2 border rounded-2xl p-3 items-center justify-center active:scale-75 transition-all duration-300"
              onClick={clear}
            >
              <span className="font-bold">zerar partida</span>
              <BsXCircleFill color="#ff6c64" className="bg-white rounded-full" />
            </div>
          </div>
        </section>
        <section className="w-screen flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <article className="prose prose-lg prose-invert">
              <h1 className="text-xl font-bold mb-6">{currentText.title}</h1>
              <div className="space-y-6">
                {currentText.text.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="space-y-4">
                    {paragraph.split('\n').map((line, lineIndex) => {
                      if (line.trim().match(/^\d+\./)) {
                        const [number, ...content] = line.split('.');
                        return (
                          <div key={lineIndex}>
                            <h2 className="text-lg font-semibold">{number}.{content.join('.')}</h2>
                          </div>
                        );
                      }
                      return <p key={lineIndex} className="text-md">{line}</p>;
                    })}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

export default TrucoScore; 
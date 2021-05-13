import React from "react";
import { req } from "./services/api";
import { theme } from "./utils";
function App() {
  const [w, setW] = React.useState({
    temp: 0,
    city: "Pereiro, CE",
    description: "--",
    wind_speedy: "--",
    forecast: [
      {
        condition: "",
        date: "",
        description: "",
        max: 30,
        min: 22,
        weekday: "",
      },
    ],
  });

  React.useEffect(() => {
    const html: HTMLHtmlElement | null = document.querySelector("html");

    html?.style.setProperty("--background", theme.background);
    html?.style.setProperty("--text", theme.foreground);

    document
      ?.querySelector('[name="theme-color"]')
      ?.setAttribute("content", theme.background);

    req()
      .then((e) => {
        setW(e.results);
        // localStorage.setItem("tm", JSON.stringify(e));
      })
      .catch((error) => {
        console.dir(error);
      });

    // setW(JSON.parse(localStorage.getItem("tm") || "{}").results || {});
  }, []);

  return (
    <div className="W">
      <div className="W__top fadeIn">
        <span className="W__city">{w.city}</span>
      </div>
      <div className="W__center">
        <img src={theme.icon} alt="moon" />
        <h1 className="W__degree">{w.temp}º</h1>
        <h4 className="W__state">{w.description}</h4>
        <h6 className="W__wind">Vento</h6>
        <span className="W__velocity">{w.wind_speedy}</span>
      </div>
      <div className="W__bottom">
        <div className="W__forecast" role="list">
          {w.forecast.slice(0, 6).map((i, x) => (
            <div
              data-date={i.date}
              role="listitem"
              key={x}
              className="W-forecast__item"
            >
              <span>{i.weekday}</span>
              <span className="W-forecast__item-opacity">{i.condition}</span>
              <span>
                {i.min}º <span className="W-forecast__item-opacity">~</span>{" "}
                {i.max}º
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

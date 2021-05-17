import React from "react";
import { req } from "./services/api";
import { theme } from "./utils";
import PullToRefresh from "react-simple-pull-to-refresh";

interface IWeatherState {
  temp: number;
  city: string;
  description: string;
  wind_speedy: string;
  forecast: Array<{
    condition: string;
    date: string;
    description: string;
    max: number;
    min: number;
    weekday: string;
  }>;
  loaded: false;
}

function App() {
  const [w, setW] = React.useState<IWeatherState>({
    temp: 0,
    city: "Pereiro, CE",
    description: "",
    wind_speedy: "",
    forecast: [],
    loaded: false,
  });

  React.useEffect(() => {
    const html: HTMLHtmlElement | null = document.querySelector("html");

    html?.style.setProperty("--background", theme.background);
    html?.style.setProperty("--text", theme.foreground);

    document
      ?.querySelector('[name="theme-color"]')
      ?.setAttribute("content", theme.background);

    if (navigator.onLine) {
      req()
        .then((e) => {
          setW({ ...e.results, loaded: true });
          localStorage.setItem("tm", JSON.stringify(e));
        })
        .catch((error) => {
          ab();
        });
    } else {
      const div = document.createElement("div");
      div.textContent = "Offline: mostrando dados do cache";
      div.className = "popup-alert";
      document.body.appendChild(div);

      setTimeout(function () {
        document.body.removeChild(div);
      }, 2000);

      ab();
    }

    // setTimeout(function () {
    //   setW(
    //     {
    //       ...JSON.parse(localStorage.getItem("tm") || "{}").results,
    //       loaded: true,
    //     } || {}
    //   );
    // }, 1000);
  }, []);

  function ab() {
    setTimeout(function () {
      setW(
        {
          ...JSON.parse(localStorage.getItem("tm") || "{}").results,
          loaded: true,
        } || {}
      );
    }, 1000);
  }

  return (
    <PullToRefresh
      pullingContent=""
      onRefresh={async () => {
        if (navigator.onLine) {
          try {
            const data = await req();
            setW({ ...data.results, loaded: true });
            localStorage.setItem("tm", JSON.stringify(data));
          } catch (e) {
            ab();
          }
        } else {
          const div = document.createElement("div");
          div.textContent = "Offline: mostrando dados do cache";
          div.className = "popup-alert";
          document.body.appendChild(div);

          setTimeout(function () {
            document.body.removeChild(div);
          }, 2000);

          ab();
        }
      }}
    >
      <div className="W">
        {w.loaded ? (
          <>
            <div className="W__top animate__animated animate__fadeInUp">
              <span className="W__city">{w.city}</span>
            </div>
            <div className="W__center animate__animated animate__fadeInUp animate__delay-center">
              <>
                <img src={theme.icon} alt="moon" />
                <h1 className="W__degree animate__animated animate__fadeInUp">
                  {w.temp}º
                </h1>
                {w.description && <h4 className="W__state">{w.description}</h4>}
                {w.wind_speedy && (
                  <>
                    <h6 className="W__wind">Vento</h6>
                    <span className="W__velocity">{w.wind_speedy}</span>
                  </>
                )}
              </>
            </div>
            <div className="W__bottom animate__animated animate__fadeInUp animate__delay-bottom">
              {w.forecast?.length ? (
                <div className="W__forecast" role="list">
                  {w.forecast.slice(0, 6).map((i, x) => (
                    <div
                      data-date={i.date}
                      role="listitem"
                      key={x}
                      className="W-forecast__item"
                    >
                      <span>{i.weekday}</span>
                      <span className="W-forecast__item-opacity">
                        {i.condition}
                      </span>
                      <span>
                        <span style={{ opacity: 0.7 }}>{i.min}º</span>{" "}
                        <span className="W-forecast__item-opacity">~</span>{" "}
                        {i.max}º
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <h1 style={{ fontSize: 30 }}>¯\_(ツ)_/¯</h1>
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader">
              <svg className="circular-loader" viewBox="25 25 50 50">
                <circle className="loader-path" cx="50" cy="50" r="20"></circle>
              </svg>
            </div>
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}

export default App;

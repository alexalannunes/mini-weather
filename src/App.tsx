import { theme } from "./utils";
function App() {
  return (
    <div className="W">
      <div className="W__top">
        <span className="W__city">Pereiro, CE</span>
      </div>
      <div className="W__center">
        <img src={theme.icon} alt="moon" />
        <h1 className="W__degree">45º</h1>
        <h4 className="W__state">Nublado</h4>
        <h6 className="W__wind">Vento</h6>
        <span className="W__velocity">10 km/h</span>
      </div>
      <div className="W__bottom"></div>
    </div>
  );
}

export default App;

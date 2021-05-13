// import axios from "axios";

import axios from "axios";

const params = {
  key: process.env.REACT_APP_API_KEY,
  woeid: 443871,
  format: "json-cors",
};

const req = () =>
  axios.get("https://api.hgbrasil.com/weather", { params }).then((e) => e.data);

export { req };

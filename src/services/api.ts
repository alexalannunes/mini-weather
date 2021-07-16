// import axios from "axios";

import axios from "axios";

interface IParams {
  key?: string;
  format: string;
  user_ip?: string;
  woeid?: number | null;
  lat?: number | null | undefined;
  lon?: number | null | undefined;
}

interface ICoord {
  latitude: number | null;
  longitude: number | null;
}

const req = (userLocation: ICoord | false = false) => {
  const params: IParams = {
    key: process.env.REACT_APP_API_KEY,
    format: "json-cors",
    woeid: null,
  };

  if (userLocation) {
    params.lat = userLocation.latitude || -6.0467953;
    params.lon = userLocation.longitude || -38.4808856;
    params.user_ip = "remote";
  }

  if (!userLocation) {
    params.woeid = 443871;
  }

  return axios
    .get("https://api.hgbrasil.com/weather", { params })
    .then((e) => e.data);
};

export { req };

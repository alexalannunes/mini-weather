const key = process.env.REACT_APP_API_KEY;
const city_id = 443871;
const format = "json-cors";

// {
//   url: "",
//   mode: "no-cors",
// }

const req = () =>
  fetch(
    `https://api.hgbrasil.com/weather?woeid=${city_id}&key=${key}&format=${format}`,
    {
      method: "GET",
      mode: "cors",
    }
  ).then((r) => r.json());

export { req };

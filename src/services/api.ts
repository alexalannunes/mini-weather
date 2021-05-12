const key = process.env.REACT_APP_API_KEY;
const city_id = 443871;
const format = "json-cors";

console.log(process.env);
const req = () =>
  fetch(
    `https://api.hgbrasil.com/weather?woeid=${city_id}&key=${key}&format=${format}`,
    {
      mode: "no-cors",
    }
  ).then((r) => r.json());

export { req };

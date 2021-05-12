const key = process.env.REACT_APP_API_KEY;
const city_id = 443871;

console.log(process.env);
const req = () =>
  fetch(
    `https://api.hgbrasil.com/weather?woeid=${city_id}&key=${key}&format=json-cors`
  ).then((r) => r.json());

export { req };

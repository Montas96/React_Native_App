const app_id = '4f9c8aac';
const app_key = '233a08758152d09c1ccf8ab2320b2eb2';

export function getRecip(text) {
  const url = `https://api.edamam.com/search?q=${text}&app_id=${app_id}&app_key=${app_key}`;
  console.log(url)
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

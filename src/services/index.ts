const BASE_URL = "https://api.punkapi.com/v2";

export const getBeerList = (): Promise<Response> => {
  return fetch(`${BASE_URL}/beers`);
};

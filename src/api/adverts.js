import client from "./client";

const advertsBaseUrl = "/api/v1";

export const getLatestAdverts = (query = "") => {
  const url = `${advertsBaseUrl}/adverts${query}`;
  return client.get(url);
};

export const getNumberAdverts = () => {
  const url = `${advertsBaseUrl}/adverts/number`;
  return client.get(url);
};

export const getAdvertsTags = () => {
  const url = `${advertsBaseUrl}/adverts/tags`;
  return client.get(url);
};

export const getAdvertDetail = (advertId) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const createAdvert = (advert) => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, advert);
};

export const deleteAdvert = (advertId) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};

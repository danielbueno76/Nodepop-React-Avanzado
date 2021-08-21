import client from "./client";

const advertsBaseUrl = "/api/v1";

export const getLatestAdverts = (query = "") => {
  const url = `${advertsBaseUrl}/adverts${query}`;
  return client.get(url);
};

export const getNumberAdverts = (query = "") => {
  const url = `${advertsBaseUrl}/adverts/number${query}`;
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

export const updateAdvert = (advertId, ad) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.put(url, ad);
};

export const createAdvert = (advert) => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, advert);
};

export const deleteAdvert = (advertId) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};

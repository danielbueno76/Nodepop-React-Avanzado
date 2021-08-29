import { orderAds } from "../utils/utils";

export const getIsLogged = (state) => state.auth.isLogged;

export const getOwnUserInfo = (state) => state.auth.user;

export const getAdvertsFav = (state) => {
  if (state.adverts.data) orderAds(state.adverts.order, state.adverts.data);

  return (
    state.adverts.data &&
    state.adverts.data.filter(
      (ad) => state.auth.user && state.auth.user.adsFav.includes(ad.id)
    )
  );
};

export const getOwnAdverts = (state) => {
  return (
    state.adverts.data &&
    state.adverts.data.filter((ad) => ad.username === state.auth.user.username)
  );
};

export const getAdverts = (state, { limit, username }) => {
  let adverts = state.adverts.data;
  if (username) {
    adverts = adverts.filter((ad) => ad.username === username);
  }
  if (adverts) orderAds(state.adverts.order, state.adverts.data);

  if (limit && adverts) {
    const page = (state.page.data - 1) * limit;
    adverts = adverts.slice(page, page + limit);
  }

  return adverts;
};

export const getUser = (state) => state.user.data;

export const getNumberTotalAdverts = (state, { username }) => {
  let adverts = state.adverts.data;

  if (username) {
    adverts = adverts.filter((ad) => ad.username === username);
  }

  return adverts ? adverts.length : 0;
};

export const getAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvertsOrder = (state) => state.adverts.order;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find((advert) => {
    return advert.id === advertId;
  });

export const getTagsLoaded = (state) => state.tags.loaded;

export const getTags = (state) => state.tags.data;

export const getPage = (state) => state.page.data;

export const getUi = (state) => state.ui;

export const getLanguage = (state) => state.language;

export const getIsLogged = (state) => state.auth.isLogged;

export const getUsername = (state) => state.auth.username;

export const getAdverts = (state, { limit, username }) => {
  let adverts = state.adverts.data;

  if (username) {
    adverts = adverts.filter((ad) => ad.username === username);
  }

  if (limit) {
    const page = (state.page.data - 1) * limit;
    return adverts.slice(page, page + limit);
  }

  return adverts;
};

export const getUser = (state) => state.user.data;

export const getNumberTotalAdverts = (state, { username }) => {
  let adverts = state.adverts.data;

  if (username) {
    adverts = adverts.filter((ad) => ad.username === username);
  }

  return adverts.length;
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

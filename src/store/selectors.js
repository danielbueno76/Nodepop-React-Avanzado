export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
  state.adverts.data.sort((t1, t2) => {
    if (t1.createdAt < t2.createdAt) return 1;
    return -1;
  });

export const getAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find((advert) => {
    return advert.id === advertId;
  });

export const getTagsLoaded = (state) => state.tags.loaded;

export const getTags = (state) => state.tags.data;

export const getUi = (state) => state.ui;

export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;

export const getNumberTotalAdverts = (state) => state.adverts.numberTotalAds;

export const getAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find((advert) => {
    return advert.id === advertId;
  });

export const getTagsLoaded = (state) => state.tags.loaded;

export const getTags = (state) => state.tags.data;

export const getPage = (state) => state.page.data;

export const getUi = (state) => state.ui;

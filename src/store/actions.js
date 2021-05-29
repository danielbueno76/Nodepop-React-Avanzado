import { getAdvertDetail, getAdvertsLoaded } from "./selectors";

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_DETAIL_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
  UI_RESET_ERROR,
} from "./types";

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
};

export const authLoginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

export const loginAction = (credentials, storeCredentials = false) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials, storeCredentials);
      dispatch(authLoginSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const advertsLoadedRequest = () => {
  return {
    type: ADVERTS_LOADED_REQUEST,
  };
};

export const advertsLoadedSuccess = (adverts) => {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
};

export const advertsLoadedFailure = (error) => {
  return {
    type: ADVERTS_LOADED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsLoadAction = (query) => {
  return async function (dispatch, getState, { api }) {
    const advertsLoaded = getAdvertsLoaded(getState());
    if (advertsLoaded) {
      return;
    }

    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getLatestAdverts(query);
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertsCreatedRequest = () => {
  return {
    type: ADVERTS_CREATED_REQUEST,
  };
};

export const advertsCreatedSuccess = (advert) => {
  return {
    type: ADVERTS_CREATED_SUCCESS,
    payload: advert,
  };
};

export const advertsCreatedFailure = (error) => {
  return {
    type: ADVERTS_CREATED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsCreateAction = (advert) => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertsCreatedRequest());
    try {
      const newAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertsCreatedSuccess(newAdvert));
      return newAdvert;
    } catch (error) {
      dispatch(advertsCreatedFailure(error));
    }
  };
};

export const advertsDetailRequest = () => {
  return {
    type: ADVERTS_DETAIL_REQUEST,
  };
};

export const advertsDetailSuccess = (advert) => {
  return {
    type: ADVERTS_DETAIL_SUCCESS,
    payload: advert,
  };
};

export const advertsDetailFailure = (error) => {
  return {
    type: ADVERTS_DETAIL_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsDetailAction = (advertId) => {
  return async function (dispatch, getState, { api }) {
    const advertLoaded = getAdvertDetail(getState(), advertId);
    if (advertLoaded) {
      return;
    }

    dispatch(advertsDetailRequest());
    try {
      const advert = await api.adverts.getAdvertDetail(advertId);
      dispatch(advertsDetailSuccess(advert));
    } catch (error) {
      dispatch(advertsDetailFailure(error));
    }
  };
};

export const advertsDeleteRequest = () => {
  return {
    type: ADVERTS_DELETE_REQUEST,
  };
};

export const advertsDeleteSuccess = (advertId) => {
  return {
    type: ADVERTS_DELETE_SUCCESS,
    payload: { advertId },
  };
};

export const advertsDeleteFailure = (error) => {
  return {
    type: ADVERTS_DELETE_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsDeleteAction = (advertId) => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertsDeleteRequest());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeleteSuccess(advertId));
    } catch (error) {
      dispatch(advertsDeleteFailure(error));
    }
  };
};

export const resetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};

import { getAdvertDetail, getAdvertsLoaded, getTagsLoaded } from "./selectors";

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
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
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
  ADVERTS_TAGS_FAILURE,
  CHANGE_PAGE_REQUEST,
  CHANGE_PAGE_SUCCESS,
  CHANGE_PAGE_FAILURE,
  ADVERTS_ORDER_FAILURE,
  ADVERTS_ORDER_REQUEST,
  ADVERTS_ORDER_SUCCESS,
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

export const loginAction = (credentials) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authSignupRequest = () => {
  return {
    type: AUTH_SIGNUP_REQUEST,
  };
};

export const authSignupSuccess = () => {
  return {
    type: AUTH_SIGNUP_SUCCESS,
  };
};

export const authSignupFailure = (error) => {
  return {
    type: AUTH_SIGNUP_FAILURE,
    payload: error,
    error: true,
  };
};

export const signupAction = (credentials) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authSignupRequest());
    try {
      await api.auth.signup(credentials);
      dispatch(authSignupSuccess());
      // Redirect
      const { from } = history.location.state || {
        from: { pathname: "/" },
      };
      history.replace(from);
    } catch (error) {
      dispatch(authSignupFailure(error));
    }
  };
};

export const authLogoutRequest = () => {
  return {
    type: AUTH_LOGOUT_REQUEST,
  };
};

export const authLogoutSuccess = () => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
};

export const authLogoutFailure = (error) => {
  return {
    type: AUTH_LOGOUT_FAILURE,
    payload: error,
    error: true,
  };
};

export const logoutAction = (credentials) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLogoutRequest());
    try {
      await api.auth.logout();
      dispatch(authLogoutSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLogoutFailure(error));
    }
  };
};

export const sendEmailRequest = () => {
  return {
    type: SEND_EMAIL_REQUEST,
  };
};

export const sendEmailSuccess = () => {
  return {
    type: SEND_EMAIL_SUCCESS,
  };
};

export const sendEmailFailure = (error) => {
  return {
    type: SEND_EMAIL_FAILURE,
    payload: error,
    error: true,
  };
};

export const sendEmailAction = (email) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(sendEmailRequest());
    try {
      await api.others.resetPasswordSendEmail(email);
      dispatch(sendEmailSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(sendEmailFailure(error));
    }
  };
};

export const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

export const resetPasswordFailure = (error) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

export const resetPasswordAction = (token, password) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(resetPasswordRequest());
    try {
      await api.auth.modifyUserPassword(token, password);
      dispatch(resetPasswordSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(resetPasswordFailure(error));
    }
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

export const advertsLoadAction = (query, forceToApi = false) => {
  return async function (dispatch, getState, { api }) {
    const advertsLoaded = getAdvertsLoaded(getState());
    if (!forceToApi && advertsLoaded) {
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

export const advertsOrderRequest = () => {
  return {
    type: ADVERTS_ORDER_REQUEST,
  };
};

export const advertsOrderSuccess = (order) => {
  return {
    type: ADVERTS_ORDER_SUCCESS,
    payload: order,
  };
};

export const advertsOrderFailure = (error) => {
  return {
    type: ADVERTS_ORDER_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsOrderAction = (order) => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertsOrderRequest());
    try {
      dispatch(advertsOrderSuccess(order));
    } catch (error) {
      dispatch(advertsOrderFailure(error));
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
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsCreatedRequest());
    try {
      const newAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertsCreatedSuccess(newAdvert));
      history.push(`/adverts/${newAdvert.id}`);
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
    payload: advertId,
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
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsDeleteRequest());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeleteSuccess(advertId));
      history.push("/adverts");
    } catch (error) {
      dispatch(advertsDeleteFailure(error));
    }
  };
};

export const advertsTagsRequest = () => {
  return {
    type: ADVERTS_TAGS_REQUEST,
  };
};

export const advertsTagsSuccess = (tags) => {
  return {
    type: ADVERTS_TAGS_SUCCESS,
    payload: tags,
  };
};

export const advertsTagsFailure = (error) => {
  return {
    type: ADVERTS_TAGS_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsTagsAction = () => {
  return async function (dispatch, getState, { api }) {
    const tagsLoaded = getTagsLoaded(getState());
    if (tagsLoaded) {
      return;
    }

    dispatch(advertsTagsRequest());
    try {
      const tags = await api.adverts.getAdvertsTags();
      dispatch(advertsTagsSuccess(tags));
    } catch (error) {
      dispatch(advertsTagsFailure(error));
    }
  };
};

export const changePageRequest = () => {
  return {
    type: CHANGE_PAGE_REQUEST,
  };
};

export const changePageSuccess = (page) => {
  return {
    type: CHANGE_PAGE_SUCCESS,
    payload: page,
  };
};

export const changePageFailure = (error) => {
  return {
    type: CHANGE_PAGE_FAILURE,
    payload: error,
    error: true,
  };
};

export const changePageAction = (page) => {
  return async function (dispatch, getState, { api }) {
    dispatch(changePageRequest());
    try {
      dispatch(changePageSuccess(page));
    } catch (error) {
      dispatch(changePageFailure(error));
    }
  };
};

export const resetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export const initialState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    loading: false,
    error: null,
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
      return { ...state, loaded: false, data: [...state.data, action.payload] };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  if (action.error) {
    return { ...state, loading: false, error: action.payload };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERTS_CREATED_REQUEST:
    case ADVERTS_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
      return { ...state, loading: false };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

import { DESC } from "../utils/utils";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_ORDER_REQUEST,
  ADVERTS_ORDER_SUCCESS,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
  CHANGE_PAGE_REQUEST,
  CHANGE_PAGE_SUCCESS,
  AUTH_GET_OWN_USERDATA_REQUEST,
  AUTH_GET_OWN_USERDATA_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  ADVERTS_UPDATED_REQUEST,
  ADVERTS_UPDATED_SUCCESS,
  CHANGE_LANGUAGE_REQUEST,
  CHANGE_LANGUAGE_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export const initialState = {
  auth: {
    isLogged: false,
    user: {},
  },
  adverts: {
    loaded: false,
    order: DESC,
    data: [],
  },
  user: {
    loaded: false,
    data: {},
  },
  tags: {
    loaded: false,
    data: [],
  },
  page: {
    loaded: false,
    data: 1,
  },
  ui: {
    loading: false,
    error: null,
    messageSuccess: null,
  },
  language: {
    loaded: false,
    data: "en",
  },
};

export function language(state = initialState.language, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_GET_OWN_USERDATA_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, isLogged: true, user: action.payload };
    case AUTH_LOGOUT_SUCCESS:
    case DELETE_USER_SUCCESS:
      return { ...state, isLogged: false, user: {} };
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    case ADVERTS_ORDER_SUCCESS:
      return { ...state, order: action.payload };
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
      return { ...state, loaded: false, data: [...state.data, action.payload] };
    case ADVERTS_UPDATED_SUCCESS:
      let newData;
      newData = state.data.map((ad) =>
        ad.id === action.payload.id ? action.payload : ad
      );
      return { ...state, loaded: false, data: [...newData] };
    case ADVERTS_DELETE_SUCCESS:
      return {
        ...state,
        loaded: false,
        data: [...state.data.filter((advert) => advert.id !== action.payload)],
      };
    default:
      return state;
  }
}

export function user(state = initialState.user, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case ADVERTS_TAGS_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function page(state = initialState.page, action) {
  switch (action.type) {
    case CHANGE_PAGE_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  if (action.error) {
    return {
      ...state,
      loading: false,
      error: action.payload,
      messageSuccess: null,
    };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_LOGOUT_REQUEST:
    case AUTH_SIGNUP_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERTS_CREATED_REQUEST:
    case ADVERTS_DETAIL_REQUEST:
    case ADVERTS_DELETE_REQUEST:
    case ADVERTS_TAGS_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case SEND_EMAIL_REQUEST:
    case CHANGE_PAGE_REQUEST:
    case ADVERTS_ORDER_REQUEST:
    case AUTH_GET_OWN_USERDATA_REQUEST:
    case GET_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case ADVERTS_UPDATED_REQUEST:
    case CHANGE_LANGUAGE_REQUEST:
      return { ...state, loading: true, error: null, messageSuccess: null };
    case AUTH_LOGOUT_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case AUTH_GET_OWN_USERDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "",
      };
    case CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "change_language_msg",
      };
    case ADVERTS_UPDATED_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "adverts_updated_msg",
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "user_updated_msg",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "user_deleted_msg",
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "user_registered_msg",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "password_reset_msg",
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "email_sent_msg",
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "login_msg",
      };
    case ADVERTS_CREATED_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "advert_created_msg",
      };
    case ADVERTS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        messageSuccess: "advert_deleted_msg",
      };
    case ADVERTS_TAGS_SUCCESS:
    case CHANGE_PAGE_SUCCESS:
    case ADVERTS_ORDER_SUCCESS:
    case GET_USER_SUCCESS:
      return { ...state, loading: false };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
        messageSuccess: null,
      };
    default:
      return state;
  }
}

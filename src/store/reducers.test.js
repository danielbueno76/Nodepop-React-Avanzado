import { adverts, tags, initialState } from "./reducers";
import {
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_TAGS_SUCCESS,
  ADVERTS_DELETE_SUCCESS,
} from "./types";

describe("adverts", () => {
  test("should manage ANY action", () => {
    const state = initialState.adverts;
    const action = { type: "ANY" };
    const nextState = adverts(state, action);
    expect(nextState).toBe(state);
  });

  test("should manage ADVERTS_LOADED_SUCCESS action", () => {
    const state = initialState.adverts;
    const advertsData = [];
    const action = { type: ADVERTS_LOADED_SUCCESS, payload: advertsData };
    const expectedState = {
      ...initialState.adverts,
      loaded: true,
      data: advertsData,
    };
    const nextState = adverts(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });

  test("should manage ADVERTS_DETAIL_SUCCESS action", () => {
    const state = initialState.adverts;
    const advert = {};
    const action = { type: ADVERTS_DETAIL_SUCCESS, payload: advert };
    const expectedState = {
      ...initialState.adverts,
      loaded: false,
      data: [...initialState.adverts.data, advert],
    };
    const nextState = adverts(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });

  test("should manage ADVERTS_DELETE_SUCCESS action", () => {
    const state = initialState.adverts;
    const advertId = "";
    const action = { type: ADVERTS_DELETE_SUCCESS, payload: advertId };
    const expectedState = {
      ...initialState.adverts,
      loaded: false,
      data: [...initialState.adverts.data],
    };
    const nextState = adverts(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });
});

describe("tags", () => {
  test("ANY action", () => {
    const state = initialState.tags;
    const action = { type: "ANY" };
    const nextState = tags(state, action);
    expect(nextState).toBe(state);
  });

  test("should manage ADVERTS_TAGS_SUCCESS action", () => {
    const state = initialState.tags;
    const tagsData = [];
    const action = { type: ADVERTS_TAGS_SUCCESS, payload: tagsData };
    const expectedState = {
      ...initialState.tags,
      loaded: true,
      data: tagsData,
    };
    const nextState = tags(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });
});

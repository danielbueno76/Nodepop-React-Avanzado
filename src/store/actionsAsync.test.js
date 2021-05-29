import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { advertsLoadAction } from "./actions";
import { ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCCESS } from "./types";

const createStore = (extraArgument) => (state) => {
  const middleware = [thunk.withExtraArgument(extraArgument)];
  const mockStore = configureStore(middleware);
  const store = mockStore({ ...state, adverts: {} });
  return store;
};

describe("advertsLoadAction", () => {
  describe("when adverts api resolves", () => {
    const query = "";
    const api = {
      adverts: { getLatestAdverts: jest.fn().mockResolvedValue() },
    };

    const store = createStore({ api })();

    test("should dispatch an ADVERTS_LOADED_SUCCESS action", async () => {
      await store.dispatch(advertsLoadAction(query));
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: ADVERTS_LOADED_REQUEST },
        { type: ADVERTS_LOADED_SUCCESS },
      ]);
      expect(api.adverts.getLatestAdverts).toBeCalledWith(query);
    });
  });
});

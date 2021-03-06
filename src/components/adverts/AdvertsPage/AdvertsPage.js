import React from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "./AdvertsList";
import AdvertsFormFilter from "./AdvertsFormFilter";
import { Switch } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getAdvertsOrder,
} from "../../../store/selectors";
import {
  advertsLoadAction,
  changePageAction,
  advertsOrderAction,
} from "../../../store/actions";
import storage from "../../../utils/storage";
import { SELL, LIMIT_NUMBER_ADS, ASC, DESC } from "../../../utils/utils";
import MessagePage from "../../message";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";

const AdvertsPage = ({ className, ...props }) => {
  const { t } = useTranslation();

  let query = `&sort=createdAt&sort=desc`;
  const adverts = useSelector((state) =>
    getAdverts(state, { limit: LIMIT_NUMBER_ADS })
  );
  const totalAdverts = useSelector((state) =>
    getAdverts(state, { limit: null })
  );
  const numberTotalAdverts = useSelector((state) =>
    getNumberTotalAdverts(state, {
      username: null,
    })
  );
  const page = useSelector(getPage);
  const order = useSelector(getAdvertsOrder);
  const dispatch = useDispatch();

  const handleSwitch = (_event, value) => {
    if (value) {
      dispatch(advertsOrderAction(ASC));
    } else {
      dispatch(advertsOrderAction(DESC));
    }
  };

  const handleChangePage = (_event, value) => {
    dispatch(changePageAction(value));
  };

  React.useEffect(() => {
    const filter = storage.get("filter");
    dispatch(advertsLoadAction(filter ? `?${filter}${query}` : `?${query}`));
  }, [dispatch, query]);

  const handleSubmit = (advertFilter) => {
    const queryArray = [];
    for (const key in advertFilter) {
      if (key === "sale") {
        queryArray.push(`${key}=${advertFilter[key] === SELL}`);
        continue;
      } else if (Array.isArray(advertFilter[key])) {
        advertFilter[key].forEach((elem) => queryArray.push(`${key}=${elem}`));
      } else if (advertFilter[key]) {
        queryArray.push(`${key}=${advertFilter[key]}`);
      }
    }

    storage.set("filter", queryArray.join("&"));
    dispatch(advertsLoadAction(`?${queryArray.join("&")}${query}`, true));
  };

  return (
    <Layout title={t("list_ads")} {...props}>
      <MessagePage />
      <div className={className}>
        <AdvertsFormFilter
          onSubmit={handleSubmit}
          prices={totalAdverts.map(({ price }) => price)}
        />
        {adverts.length ? (
          <Switch
            firstChildren={DESC}
            secondChildren={ASC}
            handleChange={handleSwitch}
            defaultValue={DESC}
            value={order}
          />
        ) : (
          <React.Fragment />
        )}
        <AdvertsList adverts={adverts} msgEmpty={t("first_ad")} />
      </div>

      {numberTotalAdverts ? (
        <Pagination
          className="pt-3"
          count={Math.ceil(numberTotalAdverts / LIMIT_NUMBER_ADS)}
          page={page}
          onChange={handleChangePage}
        />
      ) : (
        <React.Fragment />
      )}
    </Layout>
  );
};

export default AdvertsPage;

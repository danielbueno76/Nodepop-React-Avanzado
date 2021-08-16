import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import AdvertsList from "./AdvertsList";
import AdvertsFormFilter from "./AdvertsFormFilter";
import { Button, Switch } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
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

const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Be the first ad!</p>
    <Button as={Link} to="/advert/new" variant="primary">
      Create ad
    </Button>
  </div>
);

const AdvertsPage = ({ className, ...props }) => {
  let query = `&sort=createdAt&sort=desc`;
  const adverts = useSelector((state) =>
    getAdverts(state, { limit: LIMIT_NUMBER_ADS })
  );
  const totalAdverts = useSelector((state) =>
    getAdverts(state, { limit: null })
  );
  const numberTotalAdverts = useSelector(getNumberTotalAdverts);
  const page = useSelector(getPage);
  const dispatch = useDispatch();

  const handleSwitchOrder = (_event, value) => {
    if (value) {
      query = `&sort=createdAt&sort=asc`;
      dispatch(advertsOrderAction(ASC));
    } else {
      query = `&sort=createdAt&sort=desc`;
      dispatch(advertsOrderAction(DESC));
    }
    const filter = storage.get("filter");
    dispatch(
      advertsLoadAction(filter ? `?${filter}${query}` : `?${query}`, true)
    );
  };

  const handleChangePage = (_event, value) => {
    dispatch(changePageAction(value));
  };

  React.useEffect(() => {
    const filter = storage.get("filter");
    dispatch(advertsLoadAction(filter ? `?${filter}${query}` : `?${query}`));
  });

  const handleSubmit = (advertFilter) => {
    const queryArray = [];
    if (advertFilter["sale"]) {
      advertFilter["sale"] = advertFilter["sale"] === SELL; // convert to boolean
    }

    for (const key in advertFilter) {
      if (Array.isArray(advertFilter[key])) {
        advertFilter[key].forEach((elem) => queryArray.push(`${key}=${elem}`));
      } else if (advertFilter[key]) {
        queryArray.push(`${key}=${advertFilter[key]}`);
      }
    }
    query = `?${queryArray.join("&")}${query}`;
    storage.set("filter", queryArray.join("&"));
    dispatch(advertsLoadAction(`?${queryArray.join("&")}${query}`, true));
  };

  return (
    <Layout title="List of advertisements" {...props}>
      <MessagePage />
      <div className={className}>
        <AdvertsFormFilter
          onSubmit={handleSubmit}
          prices={totalAdverts.map(({ price }) => price)}
        />
        <Switch
          firstChildren={DESC}
          secondChildren={ASC}
          handleChange={handleSwitchOrder}
        />
        {adverts.length ? <AdvertsList adverts={adverts} /> : <EmptyList />}
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

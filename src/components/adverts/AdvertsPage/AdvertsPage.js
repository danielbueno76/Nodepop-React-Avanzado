import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import AdvertsList from "./AdvertsList";
import AdvertsFormFilter from "./AdvertsFormFilter";
import { Button } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
} from "../../../store/selectors";
import {
  advertsLoadAction,
  advertsNumberAction,
  changePageAction,
} from "../../../store/actions";
import storage from "../../../utils/storage";
import { SELL, LIMIT_NUMBER_ADS } from "../../../utils/utils";
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
  let query = `?limit=${LIMIT_NUMBER_ADS}&sort=createdAt&sort=desc&`;
  const adverts = useSelector(getAdverts);
  const numberTotalAdverts = useSelector(getNumberTotalAdverts);
  const page = useSelector(getPage);
  const dispatch = useDispatch();
  const handleChangePage = (event, value) => {
    dispatch(changePageAction(value));
    query += `page=${value}&`;
    dispatch(advertsLoadAction(query, true));
  };

  React.useEffect(() => {
    const filter = storage.get("filter");
    dispatch(advertsLoadAction(filter ? filter : query));
    dispatch(advertsNumberAction());
  });

  const handleSubmit = (advertFilter) => {
    const queryArray = [];

    if (advertFilter["sale"]) {
      advertFilter["sale"] = advertFilter["sale"] === SELL; // convert to boolean
    }

    for (const key in advertFilter) {
      if (Array.isArray(advertFilter[key])) {
        advertFilter[key].forEach((elem) => queryArray.push(`${key}=${elem}`));
      } else {
        queryArray.push(`${key}=${advertFilter[key]}`);
      }
    }
    query += `${queryArray.join("&")}`;
    storage.set("filter", query);
    dispatch(advertsLoadAction(query, true));
  };

  return (
    <Layout title="List of advertisements" {...props}>
      <MessagePage />
      <div className={className}>
        <AdvertsFormFilter
          onSubmit={handleSubmit}
          prices={adverts.map(({ price }) => price)}
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

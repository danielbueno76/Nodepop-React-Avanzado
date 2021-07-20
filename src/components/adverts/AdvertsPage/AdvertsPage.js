import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import AdvertsList from "./AdvertsList";
import AdvertsFormFilter from "./AdvertsFormFilter";
import { Button } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import { getAdverts } from "../../../store/selectors";
import { advertsLoadAction } from "../../../store/actions";
import storage from "../../../utils/storage";
import { SELL, LIMIT_NUMBER_ADS } from "../../../utils/utils";

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
  const dispatch = useDispatch();

  React.useEffect(() => {
    const filter = storage.get("filter");
    dispatch(advertsLoadAction(filter ? filter : query));
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
      <div className={className}>
        <AdvertsFormFilter
          onSubmit={handleSubmit}
          prices={adverts.map(({ price }) => price)}
        />
        {adverts.length ? <AdvertsList adverts={adverts} /> : <EmptyList />}
      </div>
    </Layout>
  );
};

export default AdvertsPage;

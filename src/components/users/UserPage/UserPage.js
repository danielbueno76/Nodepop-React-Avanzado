import React from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "../../adverts/AdvertsPage/AdvertsList";
import { Switch } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getUi,
} from "../../../store/selectors";
import {
  advertsLoadAction,
  changePageAction,
  advertsOrderAction,
} from "../../../store/actions";
import { LIMIT_NUMBER_ADS, ASC, DESC } from "../../../utils/utils";
import MessagePage from "../../message";
import Pagination from "@material-ui/lab/Pagination";
import { Redirect } from "react-router";

const EmptyList = () => (
  <div className="pt-3" style={{ textAlign: "center" }}>
    <p>This user does not have any ads published!</p>
  </div>
);

const UserPage = ({ match, ...props }) => {
  let query = `?sort=createdAt&sort=desc`;
  const adverts = useSelector((state) =>
    getAdverts(state, {
      limit: LIMIT_NUMBER_ADS,
      username: match.params.username,
    })
  );

  const numberTotalAdverts = useSelector((state) =>
    getNumberTotalAdverts(state, {
      username: match.params.username,
    })
  );
  const page = useSelector(getPage);
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);

  const handleSwitchOrder = (_event, value) => {
    if (value) {
      query = `?sort=createdAt&sort=asc`;
      dispatch(advertsOrderAction(ASC));
    } else {
      query = `?sort=createdAt&sort=desc`;
      dispatch(advertsOrderAction(DESC));
    }
    dispatch(advertsLoadAction(query, true));
  };

  const handleChangePage = (_event, value) => {
    dispatch(changePageAction(value));
  };

  React.useEffect(() => {
    dispatch(advertsLoadAction(query));
  });

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout
      title={`List of advertisements by ${match.params.username}`}
      {...props}
    >
      <MessagePage />
      <div>
        {adverts.length ? (
          <Switch
            firstChildren={DESC}
            secondChildren={ASC}
            handleChange={handleSwitchOrder}
          />
        ) : (
          <React.Fragment />
        )}
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

export default UserPage;

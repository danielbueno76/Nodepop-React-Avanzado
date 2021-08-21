import React from "react";
import { Redirect } from "react-router";
import Layout from "../../layout/Layout";
import AdvertsList from "../../adverts/AdvertsPage/AdvertsList";
import { Switch, EmptyList } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getUi,
  getOwnUserInfo,
} from "../../../store/selectors";
import {
  advertsOrderAction,
  advertsLoadAction,
  changePageAction,
  getUserAction,
} from "../../../store/actions";
import { LIMIT_NUMBER_ADS, ASC, DESC } from "../../../utils/utils";
import MessagePage from "../../message";
import Pagination from "@material-ui/lab/Pagination";

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
  const { username = null } = useSelector(getOwnUserInfo) || {};
  const { error } = useSelector(getUi);

  const dispatch = useDispatch();

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
    dispatch(getUserAction(match.params.username));
    dispatch(advertsLoadAction(query));
  }, [dispatch, query, match.params.username]);

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  } else if (username === match.params.username) {
    return <Redirect to="/myuser" />;
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
        {adverts.length ? (
          <AdvertsList adverts={adverts} />
        ) : (
          <EmptyList>{"This user does not have any ads published!"}</EmptyList>
        )}
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
import React from "react";
import { Redirect } from "react-router";
import Layout from "../../layout/Layout";
import AdvertsList from "../../adverts/AdvertsPage/AdvertsList";
import { Switch } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getUi,
  getOwnUserInfo,
  getAdvertsOrder,
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
import { useTranslation } from "react-i18next";

const UserPage = ({ match, ...props }) => {
  const { t } = useTranslation();
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
      title={t("list_ads_user", { username: match.params.username })}
      {...props}
    >
      <MessagePage />
      <div>
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
        <AdvertsList adverts={adverts} msgEmpty={t("empty_ads_other_user")} />
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

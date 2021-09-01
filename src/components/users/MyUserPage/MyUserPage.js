import React from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "../../adverts/AdvertsPage/AdvertsList";
import { Switch } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getOwnUserInfo,
  getAdvertsOrder,
  getAdvertsFav,
} from "../../../store/selectors";
import {
  advertsOrderAction,
  advertsLoadAction,
  changePageAction,
  updateUserAction,
} from "../../../store/actions";
import {
  LIMIT_NUMBER_ADS,
  ASC,
  DESC,
  YOUR_ADS,
  FAV_ADS,
} from "../../../utils/utils";
import MessagePage from "../../message/";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import MyUserForm from "./MyUserForm";

const MyUserPage = () => {
  const { t } = useTranslation();

  let query = `?sort=createdAt&sort=desc`;
  const [typeFilter, setTypeFilter] = React.useState(YOUR_ADS);
  const user = useSelector(getOwnUserInfo);
  const adsFav = useSelector(getAdvertsFav) || [];
  const adverts =
    useSelector(
      (state) =>
        user &&
        getAdverts(state, {
          limit: LIMIT_NUMBER_ADS,
          username: typeFilter === YOUR_ADS ? user.username : null,
        })
    ) || [];
  const numberTotalAdverts =
    useSelector(
      (state) =>
        user &&
        getNumberTotalAdverts(state, {
          username: typeFilter === YOUR_ADS ? user.username : null,
        })
    ) || 0;
  const order = useSelector(getAdvertsOrder);
  const page = useSelector(getPage);

  const dispatch = useDispatch();

  const handleSwitch = (_event, value) => {
    if (value) {
      dispatch(advertsOrderAction(ASC));
    } else {
      dispatch(advertsOrderAction(DESC));
    }
  };
  const handleFavAds = (_event, value) => {
    if (value) {
      setTypeFilter(FAV_ADS);
    } else {
      setTypeFilter(YOUR_ADS);
    }
  };
  const handleChangePage = (_event, value) => {
    dispatch(changePageAction(value));
  };
  const handleSubmitUser = (_user) => {
    dispatch(updateUserAction(_user));
  };

  React.useEffect(() => {
    dispatch(advertsLoadAction(query));
  }, [dispatch, query]);

  return (
    <Layout title={t("user_intro")}>
      <MessagePage />
      <MyUserForm onSubmit={handleSubmitUser} />
      <>
        <Switch
          firstChildren={DESC}
          secondChildren={ASC}
          defaultValue={DESC}
          handleChange={handleSwitch}
          value={order}
        />
        <Switch
          firstChildren={YOUR_ADS}
          secondChildren={FAV_ADS}
          defaultValue={YOUR_ADS}
          handleChange={handleFavAds}
          value={typeFilter}
        />
        <AdvertsList
          adverts={typeFilter === YOUR_ADS ? adverts : adsFav}
          fav={typeFilter === FAV_ADS ? true : false}
        />
      </>

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

export default MyUserPage;

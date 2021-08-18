import React from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "../../adverts/AdvertsPage/AdvertsList";
import { Switch, EmptyList } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  getNumberTotalAdverts,
  getPage,
  getUsername,
} from "../../../store/selectors";
import {
  advertsOrderAction,
  advertsLoadAction,
  changePageAction,
} from "../../../store/actions";
import { LIMIT_NUMBER_ADS, ASC, DESC } from "../../../utils/utils";
import MessagePage from "../../message";
import Pagination from "@material-ui/lab/Pagination";

const MyUserPage = () => {
  let query = `?sort=createdAt&sort=desc`;
  const username = useSelector(getUsername);
  const adverts = useSelector((state) =>
    getAdverts(state, {
      limit: LIMIT_NUMBER_ADS,
      username,
    })
  );

  const numberTotalAdverts = useSelector((state) =>
    getNumberTotalAdverts(state, {
      username,
    })
  );
  const page = useSelector(getPage);

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
    dispatch(advertsLoadAction(query));
  }, [dispatch, query, username]);

  return (
    <Layout title={`List of your advertisements`}>
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

export default MyUserPage;

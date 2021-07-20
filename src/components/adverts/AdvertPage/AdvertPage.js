import React from "react";
import Layout from "../../layout/Layout";
import { Redirect } from "react-router";
import { messageSale } from "../../../utils/utils";
import Photo from "../../shared/Photo";
import ConfirmButton from "../../shared/ConfirmButton";
import { getUi, getAdvertDetail } from "../../../store/selectors";
import {
  advertsDetailAction,
  advertsDeleteAction,
} from "../../../store/actions";
import MessagePage from "../../message";
import { useDispatch, useSelector } from "react-redux";

const AdvertPage = ({ match, ...props }) => {
  const advert = useSelector((state) =>
    getAdvertDetail(state, match.params.advertId)
  );
  const error = useSelector(getUi);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(advertsDetailAction(match.params.advertId));
  }, [dispatch, match.params.advertId]);

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }

  const handleDeleteAdvert = async () => {
    await dispatch(advertsDeleteAction(match.params.advertId));
  };

  const { name, price, sale, tags, photo, createdAt } = { ...advert };
  return (
    <Layout title="Advertisement Detail" {...props}>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>Title: {name}</p>
            <p>Price: {price}</p>
            <p>{messageSale(sale)}</p>
            <p>Tags: {tags && tags.map((tag) => tag + ", ")}</p>
            <time dateTime={createdAt}>{createdAt}</time>
          </div>
        </div>
        <Photo src={photo} alt={name} />
        <ConfirmButton
          messageConfirm={"Are you sure you want to delete the ad?"}
          handleToDo={handleDeleteAdvert}
        >
          Delete
        </ConfirmButton>
      </div>
      <MessagePage />
    </Layout>
  );
};

export default AdvertPage;

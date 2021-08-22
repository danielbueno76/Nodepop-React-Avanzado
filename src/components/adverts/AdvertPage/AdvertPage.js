import React from "react";
import Layout from "../../layout/Layout";
import { Redirect } from "react-router";
import { messageSale, messageBooked, messageSold } from "../../../utils/utils";
import Photo from "../../shared/Photo";
import { ConfirmButton, Button } from "../../shared/";
import {
  getUi,
  getAdvertDetail,
  getOwnUserInfo,
} from "../../../store/selectors";
import {
  advertsDetailAction,
  advertsDeleteAction,
  advertsUpdatedAction,
} from "../../../store/actions";
import MessagePage from "../../message";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";

const AdvertPage = ({ match, ...props }) => {
  const advert = useSelector((state) => {
    return getAdvertDetail(state, match.params.advertId);
  });
  const { error } = useSelector(getUi);
  const { username = null } = useSelector(getOwnUserInfo) || {};
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(advertsDetailAction(match.params.advertId));
  }, [dispatch, match.params.advertId]);

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }

  const handleDeleteAdvert = () => {
    dispatch(advertsDeleteAction(match.params.advertId));
  };
  const handleBooked = () => {
    dispatch(advertsUpdatedAction(match.params.advertId, { booked: !booked }));
  };
  const handleSold = () => {
    dispatch(advertsUpdatedAction(match.params.advertId, { sold: !sold }));
  };
  const handleFav = () => {};

  const {
    name,
    price,
    description,
    username: usernameAd,
    sale,
    tags,
    photo,
    createdAt,
    booked,
    sold,
  } = {
    ...advert,
  };

  return (
    <Layout title="Advertisement Detail" {...props}>
      <MessagePage />
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>Title: {name}</p>
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <p>{messageSale(sale)}</p>
            <p>{messageBooked(booked)}</p>
            <p>{messageSold(sold)}</p>
            <Link to={`/user/${usernameAd}`} className="button is-link">
              {`Owner: ${usernameAd} -> Click and visit more ads of this user!`}
            </Link>
            <p>Tags: {tags && tags.map((tag) => tag + ", ")}</p>
            <time dateTime={createdAt}>{createdAt}</time>
          </div>
        </div>
        <div className="box content">
          <TwitterShareButton
            url={window.location.href}
            title={`I have found this ${name} in `}
          >
            <TwitterIcon size={40} round className="pl-2" />
            Share on Twitter
          </TwitterShareButton>
        </div>
        <div className="box content">
          <FacebookShareButton
            url={window.location.href}
            title={`I have found this ${name} in `}
          >
            <FacebookIcon size={40} round className="pl-2" />
            Share on Facebook
          </FacebookShareButton>
        </div>
        {username === usernameAd ? (
          <div className="box content">
            <>
              <Button onClick={handleBooked}>{`Click here to ${
                booked ? "un" : ""
              }booked your ad!`}</Button>
              <Button onClick={handleSold}>{`Click here to ${
                sold ? "un" : ""
              }sold your ad!`}</Button>
            </>
          </div>
        ) : (
          <></>
        )}
        {username !== usernameAd ? (
          <div className="box content">
            <Button onClick={handleFav}>{`Click here to ${
              booked ? "un" : ""
            }fav this ad!`}</Button>
          </div>
        ) : (
          <></>
        )}
        <Photo src={photo} alt={name} />
        {username === usernameAd ? (
          <Link
            to={`/advert/${match.params.advertId}/edit#${name}`}
            className="button is-link m-2"
          >{`Click here to edit your ad`}</Link>
        ) : (
          <></>
        )}
        {username === usernameAd ? (
          <ConfirmButton
            classname="button is-danger is-rounded mt-2"
            messageConfirm={"Are you sure you want to delete the ad?"}
            handleToDo={handleDeleteAdvert}
          >
            Delete
          </ConfirmButton>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default AdvertPage;

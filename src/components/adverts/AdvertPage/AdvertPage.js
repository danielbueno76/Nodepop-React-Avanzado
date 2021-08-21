import React from "react";
import Layout from "../../layout/Layout";
import { Redirect } from "react-router";
import { messageSale } from "../../../utils/utils";
import Photo from "../../shared/Photo";
import ConfirmButton from "../../shared/ConfirmButton";
import {
  getUi,
  getAdvertDetail,
  getOwnUserInfo,
} from "../../../store/selectors";
import {
  advertsDetailAction,
  advertsDeleteAction,
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
  const {
    name,
    price,
    description,
    username: usernameAd,
    sale,
    tags,
    photo,
    createdAt,
  } = {
    ...advert,
  };

  return (
    <Layout title="Advertisement Detail" {...props}>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>Title: {name}</p>
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <p>{messageSale(sale)}</p>
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
        <Photo src={photo} alt={name} />
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
      <MessagePage />
    </Layout>
  );
};

export default AdvertPage;

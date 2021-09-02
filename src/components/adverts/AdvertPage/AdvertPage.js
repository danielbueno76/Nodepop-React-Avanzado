import React from "react";
import Layout from "../../layout/Layout";
import { Redirect } from "react-router";
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
  updateUserAction,
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useTranslation } from "react-i18next";

const AdvertPage = ({ match, ...props }) => {
  const { t } = useTranslation();

  const advert = useSelector((state) => {
    return getAdvertDetail(state, match.params.advertId);
  });
  const { error } = useSelector(getUi);
  const { username = null, adsFav = [] } = useSelector(getOwnUserInfo) || {};
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
  const handleFav = () => {
    if (adsFav.includes(match.params.advertId)) {
      const index = adsFav.indexOf(match.params.advertId);
      if (index > -1) {
        adsFav.splice(index, 1);
      }
      dispatch(
        updateUserAction({
          adsFav: [...adsFav],
        })
      );
    } else {
      dispatch(
        updateUserAction({
          adsFav: [...adsFav, match.params.advertId],
        })
      );
    }
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
    booked,
    sold,
  } = {
    ...advert,
  };

  return (
    <Layout title={t("titleAd")} {...props}>
      <MessagePage />
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>{t("name", { name })}</p>
            <p>{t("price", { price })} €</p>
            <p>{t("description", { description })}</p>
            <p>{sale ? t("sale") : t("buy")}</p>
            <p>{booked ? t("booked") : t("no_booked")}</p>
            <p>{sold ? t("sold") : t("no_sold")}</p>
            <Link to={`/user/${usernameAd}`} className="button is-link">
              {t("msgInfoUserAds", { usernameAd })}
            </Link>
            <p>{t("tags", { tags: tags && tags.map((tag) => tag + ", ") })}</p>
            <time dateTime={createdAt}>{createdAt}</time>
          </div>
        </div>
        <div className="box content">
          <TwitterShareButton
            url={window.location.href}
            title={t("msgInfoShareAds", { name })}
          >
            <TwitterIcon size={40} round className="pl-2" />
            {t("msgInfoShareIcon", { share: "Twitter" })}
          </TwitterShareButton>
        </div>
        <div className="box content">
          <FacebookShareButton
            url={window.location.href}
            title={t("msgInfoShareAds", { name })}
          >
            <FacebookIcon size={40} round className="pl-2" />
            {t("msgInfoShareIcon", { share: "Facebook" })}
          </FacebookShareButton>
        </div>
        {username === usernameAd ? (
          <div className="box content">
            <>
              <Button onClick={handleBooked}>
                {booked ? t("msgInfoUnBookedAd") : t("msgInfoBookedAd")}
              </Button>
              <Button onClick={handleSold}>
                {sold ? t("msgInfoUnSoldAd") : t("msgInfoSoldAd")}
              </Button>
            </>
          </div>
        ) : (
          <></>
        )}
        {username && username !== usernameAd ? (
          <div className="box content">
            {adsFav.includes(match.params.advertId) ? (
              <Button className="button is-focused" onClick={handleFav}>
                <FavoriteIcon fontSize={"large"} />
                {t("msgInfoUnFavoriteAd")}
              </Button>
            ) : (
              <Button className="button is-focused" onClick={handleFav}>
                <FavoriteBorderIcon fontSize={"large"} />
                {t("msgInfoFavoriteAd")}
              </Button>
            )}
          </div>
        ) : (
          <></>
        )}
        <Photo src={photo} name={name} />
        {username === usernameAd ? (
          <Link
            to={`/advert/${match.params.advertId}/edit#${name}`}
            className="button is-link m-2"
          >
            {t("msgInfoEditAd")}
          </Link>
        ) : (
          <></>
        )}
        {username === usernameAd ? (
          <ConfirmButton
            classname="button is-danger is-rounded mt-2"
            messageConfirm={t("confirmDelete")}
            handleToDo={handleDeleteAdvert}
          >
            {t("delete")}
          </ConfirmButton>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default AdvertPage;

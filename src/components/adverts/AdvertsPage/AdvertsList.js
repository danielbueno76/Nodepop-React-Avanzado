import React from "react";
import T from "prop-types";
import { Link } from "react-router-dom";
import Advert, { AdvertType } from "./Advert";
import { EmptyList } from "../../shared";
import { useTranslation } from "react-i18next";

const AdvertsList = ({ adverts, fav }) => {
  const { t } = useTranslation();

  return (
    <>
      {adverts.length ? (
        adverts.map((advert) => (
          <Link key={advert.id} to={`/advert/${advert.id}#${advert.name}`}>
            <Advert key={advert.id} {...advert} />
          </Link>
        ))
      ) : (
        <EmptyList>
          {fav ? t("empty_ads_user_fav") : t("empty_ads_user")}
        </EmptyList>
      )}
    </>
  );
};

AdvertsList.propTypes = {
  Adverts: T.arrayOf(T.shape(AdvertType)),
};

export default AdvertsList;

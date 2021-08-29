import React from "react";
import T from "prop-types";
import Photo from "../../shared/Photo";
import { useTranslation } from "react-i18next";

const styleArticle = {
  borderStyle: "solid",
  borderWidth: 10,
  marginLeft: 20,
  marginRigth: 20,
  marginTop: 20,
};

const Advert = ({ name, username, description, photo, sale, price }) => {
  const { t } = useTranslation();

  return (
    <div style={styleArticle} className="card">
      <div className="card-content">
        <div className="content">
          <p>{t("name", { name })}</p>
          <p>{t("price", { price })}</p>
          <p>{t("description", { description })}</p>
          <p>{sale ? t("sale") : t("buy")}</p>
          <p>{t("owner", { username })}</p>
        </div>
      </div>
      <Photo src={photo} name={name} />
    </div>
  );
};

export const AdvertType = {
  createdAt: T.string.isRequired,
  name: T.string.isRequired,
  sale: T.bool.isRequired,
  price: T.number.isRequired,
  tags: T.array.isRequired,
};

Advert.propTypes = AdvertType;

export default Advert;

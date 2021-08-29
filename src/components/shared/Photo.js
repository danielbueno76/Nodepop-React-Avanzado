import React from "react";
import { useTranslation } from "react-i18next";

const Photo = ({ src, name, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className="card-image">
      <figure className="image is-4by3">
        <img
          alt={t(name)}
          src={src && process.env.REACT_APP_API_BASE_URL + src}
          {...props}
        />
      </figure>
    </div>
  );
};

export default Photo;

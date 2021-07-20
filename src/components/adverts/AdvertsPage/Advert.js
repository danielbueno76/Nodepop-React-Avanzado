import React from "react";
import T from "prop-types";
import { messageSale } from "../../../utils/utils";
import Photo from "../../shared/Photo";

const styleArticle = {
  borderStyle: "solid",
  borderWidth: 10,
  marginLeft: 20,
  marginRigth: 20,
  marginTop: 20,
};

const Advert = ({ name, username, description, photo, sale, price }) => {
  return (
    <div style={styleArticle} className="card">
      <div className="card-content">
        <div className="content">
          <p>Title: {name}</p>
          <p>Price: {price}</p>
          <p>Description: {description}</p>
          <p>{messageSale(sale)}</p>
          <p>Owner: {username}</p>
        </div>
      </div>
      <Photo src={photo} alt={name} />
    </div>
  );
};

export const AdvertType = {
  id: T.string.isRequired,
  createdAt: T.string.isRequired,
  name: T.string.isRequired,
  sale: T.bool.isRequired,
  price: T.number.isRequired,
  tags: T.array.isRequired,
};

Advert.propTypes = AdvertType;

Advert.defaultProps = {
  content: "Nothing here!",
};

export default Advert;

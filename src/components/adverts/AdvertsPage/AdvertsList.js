import React from "react";
import T from "prop-types";
import { Link } from "react-router-dom";
import Advert, { AdvertType } from "./Advert";

const AdvertsList = ({ adverts }) => {
  return (
    <>
      {adverts.map((advert) => (
        <Link key={advert.id} to={`/advert/${advert.id}`}>
          <Advert {...advert} />
        </Link>
      ))}
    </>
  );
};

AdvertsList.propTypes = {
  Adverts: T.arrayOf(T.shape(AdvertType)),
};

export default AdvertsList;

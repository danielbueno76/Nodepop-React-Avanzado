import React from "react";
import T from "prop-types";
import { Link } from "react-router-dom";
import Advert, { AdvertType } from "./Advert";
import { EmptyList } from "../../shared";

const AdvertsList = ({ adverts, msgEmpty }) => {
  return (
    <>
      {adverts.length ? (
        adverts.map((advert) => (
          <Link key={advert.id} to={`/advert/${advert.id}#${advert.name}`}>
            <Advert key={advert.id} {...advert} />
          </Link>
        ))
      ) : (
        <EmptyList>{msgEmpty}</EmptyList>
      )}
    </>
  );
};

AdvertsList.propTypes = {
  Adverts: T.arrayOf(T.shape(AdvertType)),
};

export default AdvertsList;

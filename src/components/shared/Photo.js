import React from "react";

const Photo = ({ src, ...props }) => (
  <div className="card-image">
    <figure className="image is-4by3">
      <img alt="" src={process.env.REACT_APP_API_BASE_URL + src} {...props} />
    </figure>
  </div>
);

export default Photo;

import React from "react";
import Layout from "../../layout/Layout";
import { getAdvertDetail, deleteAdvert } from "../../../api/adverts";
import { Redirect } from "react-router";
import { messageSale } from "../../../utils/utils";
import Photo from "../../shared/Photo";
import ConfirmButton from "../../shared/ConfirmButton";

const AdvertPage = ({ match, ...props }) => {
  const [advert, setAdverts] = React.useState({});
  const [error, setError] = React.useState(null);
  const [adHasBeenDeleted, setAdHasBeenDeleted] = React.useState(false);

  React.useEffect(() => {
    getAdvertDetail(match.params.advertId).then(setAdverts).catch(setError);
  }, [match.params.advertId]);

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }

  const handleDeleteAdvert = () => {
    deleteAdvert(match.params.advertId)
      .then(setAdHasBeenDeleted(true))
      .catch(setError);
  };

  if (adHasBeenDeleted) {
    return <Redirect to="/adverts" />;
  }

  const { name, price, sale, tags, photo, createdAt } = advert;
  return (
    <Layout title="Advertisement Detail" {...props}>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>Title: {name}</p>
            <p>Price: {price}</p>
            <p>{messageSale(sale)}</p>
            <p>Tags: {tags && tags.map((tag) => tag + ", ")}</p>
            <time dateTime={createdAt}>{createdAt}</time>
          </div>
        </div>
        <Photo src={photo} alt={name} />
        <ConfirmButton
          messageConfirm={"Are you sure you want to delete the ad?"}
          handleToDo={handleDeleteAdvert}
        >
          Delete
        </ConfirmButton>
      </div>
    </Layout>
  );
};

export default AdvertPage;

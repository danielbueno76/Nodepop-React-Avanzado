import React from "react";
import Layout from "../../layout/Layout";
import NewAdvertForm from "./NewAdvertForm";
import { createAdvert } from "../../../api/adverts";
import { Redirect } from "react-router";

const NewAdvertPage = (props) => {
  const [error, setError] = React.useState(null);
  const [createdAdvert, setCreatedAdvert] = React.useState(null);

  const handleSubmit = async (newAdvert) => {
    try {
      const formDataAdvert = new FormData();
      for (var key in newAdvert) {
        formDataAdvert.append(key, newAdvert[key]);
      }
      const advert = await createAdvert(formDataAdvert);
      setCreatedAdvert(advert);
    } catch (newError) {
      setError(newError);
    }
  };

  if (error && error.status === 401) {
    return <Redirect to="/login" />;
  }

  if (createdAdvert) {
    return <Redirect to={`/advert/${createdAdvert.id}`} />;
  }

  return (
    <Layout title="What do you want to sell?" {...props}>
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <NewAdvertForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;

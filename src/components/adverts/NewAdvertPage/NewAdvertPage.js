import React from "react";
import Layout from "../../layout/Layout";
import NewAdvertForm from "./NewAdvertForm";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { advertsCreateAction } from "../../../store/actions.js";
import { getUi } from "../../../store/selectors";
import ErrorPage from "../../error";
import { SELL } from "../../../utils/utils";

const NewAdvertPage = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);
  const handleSubmit = async (newAdvert) => {
    const formDataAdvert = new FormData();
    for (var key in newAdvert) {
      if (key === "sale") {
        newAdvert[key] = newAdvert[key] === SELL;
      }
      formDataAdvert.append(key, newAdvert[key]);
    }
    return await dispatch(advertsCreateAction(formDataAdvert));
  };

  if (error && error.status === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout title="What do you want to bur or sell?" {...props}>
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <NewAdvertForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <ErrorPage />
    </Layout>
  );
};

export default NewAdvertPage;

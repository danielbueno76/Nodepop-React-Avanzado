import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout";
import { FormField, Form, FormButton, Radio } from "../../shared";
import {
  advertsDetailAction,
  advertsUpdatedAction,
} from "../../../store/actions";
import {
  getAdvertDetail,
  getUi,
  getOwnUserInfo,
} from "../../../store/selectors";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { BUY, SELL } from "../../../utils/utils";
import SelectTags from "../SelectTags";

const AdvertEditPage = ({ match, ...props }) => {
  const [disabledName, setDisabledName] = useState(true);
  const [disabledPrice, setDisabledPrice] = useState(true);
  const [disabledDescription, setDisabledDescription] = useState(true);
  const [disabledSale, setDisabledSale] = useState(true);
  const [disabledTags, setDisabledTags] = useState(true);

  const advert = useSelector((state) => {
    return getAdvertDetail(state, match.params.advertId);
  });
  const dispatch = useDispatch();
  const { username = null } = useSelector(getOwnUserInfo) || {};
  const { error } = useSelector(getUi);

  React.useEffect(() => {
    dispatch(advertsDetailAction(match.params.advertId));
  }, [dispatch, match.params.advertId]);

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }
  const {
    name,
    price,
    description,
    username: usernameAd,
    sale,
    tags,
  } = {
    ...advert,
  };

  if (username && usernameAd && usernameAd !== username) {
    return <Redirect to={`/advert/${match.params.advertId}`} />;
  }

  const handleEditAd = (ad) => {
    ad.sale = ad.sale === SELL ? true : false;
    dispatch(advertsUpdatedAction(match.params.advertId, ad));
  };
  return advert ? (
    <Layout title="Advertisement Detail" {...props}>
      <div className="box">
        <Form
          initialValue={{
            name,
            price,
            description,
            sale: sale ? SELL : BUY,
            tags,
          }}
          onSubmit={handleEditAd}
        >
          <FormField
            type="text"
            name="name"
            autofocus
            disabled={disabledName}
          />
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={() => setDisabledName(false)}
          >
            <EditIcon />
          </Fab>
          <br />
          <FormField type="number" name="price" disabled={disabledPrice} />
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={() => setDisabledPrice(false)}
          >
            <EditIcon />
          </Fab>
          <br />
          <FormField
            type="textarea"
            name="description"
            disabled={disabledDescription}
          />
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={() => setDisabledDescription(false)}
          >
            <EditIcon />
          </Fab>
          <br />
          <Radio
            name="sale"
            disabled={disabledSale}
            arrayValues={[BUY, SELL]}
          />
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={() => setDisabledSale(false)}
          >
            <EditIcon />
          </Fab>
          <br />
          <SelectTags disabled={disabledTags} />
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={() => setDisabledTags(false)}
          >
            <EditIcon />
          </Fab>
          <br />
          <FormField type="file" name="photo" accept="image/*" />
          <FormButton type="submit" variant="primary" notDisabled>
            Save changes
          </FormButton>
        </Form>
      </div>
    </Layout>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AdvertEditPage;

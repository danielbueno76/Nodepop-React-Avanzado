import { Select } from "../../shared";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { advertsTagsAction } from "../../../store/actions";
import { getTags } from "../../../store/selectors";

const SelectTags = () => {
  const dispatch = useDispatch();

  const allTags = useSelector(getTags);
  React.useEffect(() => {
    dispatch(advertsTagsAction());
  }, [dispatch]);

  return <Select name="tags" allTags={allTags} />;
};

export default SelectTags;

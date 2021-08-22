import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch as CoreSwitch } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const MySwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(CoreSwitch);

const Switch = ({
  firstChildren,
  secondChildren,
  handleChange,
  defaultValue,
  value,
}) => {
  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{firstChildren}</Grid>
        <Grid item>
          <MySwitch
            checked={value !== defaultValue}
            onChange={handleChange}
            name="checked"
          />
        </Grid>
        <Grid item>{secondChildren}</Grid>
      </Grid>
    </Typography>
  );
};

export default Switch;

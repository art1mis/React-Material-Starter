import * as React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";

export default function OutlinedIconButton(props) {
  const { sx, size, ...other } = props;
  return (
    <IconButton
      disableTouchRipple
      sx={{
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "primaryDark.600" : "grey.200",
        borderRadius: 1,
        color: (theme) =>
          theme.palette.mode === "dark" ? "#FFF" : theme.palette.primary[500],
        background: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.primaryDark[800]
            : "#FFF",
        p: "6.5px",
        "& svg": {
          fontSize: size
        },
        ...sx
      }}
      {...other}
    />
  );
}

OutlinedIconButton.defaultProps = {
  size: 18
};
OutlinedIconButton.propTypes = {
  size: PropTypes.number
};

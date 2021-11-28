import * as React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

const Center = ({ disableX = false, disableY = false, sx = {}, ...other }) => (
  <Box
    sx={{
      position: "absolute",
      top: disableY ? "auto" : "50%",
      left: disableX ? "auto" : "50%",
      transform: `translate(${disableX ? "auto" : "-50%"}, ${
        disableY ? "auto" : "-50%"
      })`,
      ...sx
    }}
    {...other}
  />
);

Center.propTypes = {
  disableX: PropTypes.bool,
  disableY: PropTypes.bool
};

export default Center;

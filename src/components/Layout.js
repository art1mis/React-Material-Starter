import * as React from "react";
import PropTypes from "prop-types";

import { styled } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import OutlinedIconButton from "components/OutlinedIconButton";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (props) => props !== "hideAppBarStyles"
})(({ hideAppBarStyles, theme }) => {
  return {
    transition: theme.transitions.create("width"),
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[500]
        : theme.palette.grey[800],
    ...(hideAppBarStyles
      ? {
          boxShadow: "none",
          background: "transparent"
        }
      : {
          boxShadow: `inset 0px -1px 1px ${
            theme.palette.mode === "dark"
              ? theme.palette.primaryDark[700]
              : theme.palette.grey[100]
          }`,
          background:
            theme.palette.mode === "dark"
              ? theme.palette.primaryDark[900]
              : "#FFF"
        })
  };
});

function Layout(props) {
  const {
    window,
    toolbar,
    drawer,
    title,
    hideDrawer,
    hideAppBarStyles,
    ...others
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    if (!hideDrawer) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const bigScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar
        position="fixed"
        sx={{
          width: hideDrawer ? "100%" : { sm: `calc(100% - ${drawerWidth}px)` },
          ml: hideDrawer ? 0 : { sm: `${drawerWidth}px` }
        }}
        hideAppBarStyles={hideAppBarStyles}
      >
        <Toolbar>
          <OutlinedIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: hideDrawer ? "none" : { sm: "none" } }}
          >
            <MenuIcon />
          </OutlinedIconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {React.Children.only(toolbar)}
        </Toolbar>
      </StyledAppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: hideDrawer ? 0 : drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={bigScreen ? "permanent" : "temporary"}
          open={hideDrawer ? false : bigScreen ? true : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: hideDrawer ? 0 : drawerWidth
            }
          }}
        >
          {React.Children.only(drawer)}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          position: "absolute",
          width: hideDrawer
            ? "100%"
            : {
                sm: `calc(100% - ${drawerWidth}px)`,
                xs: "100%"
              },
          ml: hideDrawer ? 0 : { sm: `${drawerWidth}px` },
          top: 0,
          bottom: 0,
          "@media (min-width: 0px) and (orientation: landscape)": {
            mt: 6.4
          },
          mt: {
            xs: 5.6,
            sm: 6.4
          }
        }}
        {...others}
      />
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  toolbar: PropTypes.element,
  drawer: PropTypes.element.isRequired,
  title: PropTypes.string,
  hideAppBarStyles: PropTypes.bool,
  hideDrawer: PropTypes.bool
};

Layout.defaultProps = {
  toolbar: <></>,
  drawer: <></>,
  hideAppBarStyles: false,
  hideDrawer: false
};

export default Layout;

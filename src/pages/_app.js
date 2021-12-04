import * as React from "react";
import { BrowserRouter, useHistory, Switch, Route } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircularProgress from "@mui/material/CircularProgress";

import { ThemeModeToggle, ThemeProvider } from "components/Theme";
import Layout from "components/Layout";
import Center from "components/Center";

import NoMatch from "pages/_404";
import ErrorBoundary from "pages/_error";
import { SnackBar } from "pages/_alert";
import { routes } from "pages/_routes";

// This sections Handle routing using _routes.js
export const Dynamic = React.memo(({ path }) => {
  const Comp = React.lazy(() => import("." + path));
  return <Comp />;
});

const RoutingCore = () => {
  return (
    <React.Suspense
      fallback={
        <Center>
          <CircularProgress />
        </Center>
      }
    >
      <Switch>
        {routes.map(([name, path] = []) => (
          <Route key={name} path={path} exact>
            <Dynamic path={path} />
          </Route>
        ))}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </React.Suspense>
  );
};

// This section adds the pages links to the drawer
const DrawerItems = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar />
      <Divider sx={{ my: "-1px" }} />
      <List>
        {routes.map(([name, path, Icon] = []) => {
          return (
            <ListItem button key={name} onClick={() => history.push(path)}>
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText primary={name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

// This section handles changing the AppBar Title
const AppBarTitleContext = React.createContext(null);
export const useChangeAppBarTitle = () => React.useContext(AppBarTitleContext);

// This section provide all the provider needed by the app at root level
// as we won't be making any changes in the src/index.js
export default function App() {
  const [title, setTitle] = React.useState("Welcome!");
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <SnackBar>
            <AppBarTitleContext.Provider value={setTitle}>
              <Layout
                title={title}
                drawer={<DrawerItems />}
                toolbar={<ThemeModeToggle />}
              >
                <RoutingCore />
              </Layout>
            </AppBarTitleContext.Provider>
          </SnackBar>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

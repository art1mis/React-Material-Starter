import * as React from "react";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

import OutlinedIconButton from "components/OutlinedIconButton";

import { getDesignTokens, darkScrollbar } from "util/branding";
import { getCookie } from "util/storage";

export const DispatchContext = React.createContext(() => {
  throw new Error("Forgot to wrap component in `ThemeProvider`");
});

export const usePrefersMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const preferredMode = prefersDarkMode ? "dark" : "light";
  return preferredMode;
};
export const ThemeProvider = (props) => {
  const preferredMode = usePrefersMode();
  const [mode, setMode] = React.useState("light");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const nextPaletteMode = getCookie("paletteMode") || preferredMode;
      setMode(nextPaletteMode);
    }
  }, [preferredMode]);

  const theme = React.useMemo(() => {
    const brandingDesignTokens = getDesignTokens(mode);
    const theme_base = createTheme(
      {
        ...brandingDesignTokens,
        palette: {
          ...brandingDesignTokens.palette,
          mode
        }
      },
      null,
      {
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: mode === "dark" ? darkScrollbar() : null
            }
          }
        }
      }
    );
    return theme_base;
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={setMode} {...props} />
    </MuiThemeProvider>
  );
};

export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(
    (value) => {
      if (value === "light" || value === "dark") {
        dispatch(value);
      } else {
        console.error('changeTheme accepts only values "light" and "dark"');
      }
    },
    [dispatch]
  );
}

export const ThemeModeToggle = (props) => {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(null);
  const preferredMode = usePrefersMode();

  React.useEffect(() => {
    setMode(getCookie("paletteMode") || "system");
  }, [setMode]);

  const handleChangeThemeMode = (checked) => {
    let paletteMode = "system";
    paletteMode = checked ? "dark" : "light";
    if (paletteMode === null) {
      return;
    }
    setMode(paletteMode);
    if (paletteMode === "system") {
      document.cookie = `paletteMode=;path=/;max-age=31536000`;
      changeTheme(preferredMode);
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
      changeTheme(paletteMode);
    }
  };
  const checked =
    mode === "system" ? preferredMode === "dark" : mode === "dark";

  return (
    <Tooltip title={checked ? "Turn on the light" : "Turn off the light"}>
      <span>
        <OutlinedIconButton
          disableTouchRipple
          onClick={() => handleChangeThemeMode(!checked)}
        >
          {checked ? (
            <LightModeOutlined fontSize="small" />
          ) : (
            <DarkModeOutlined fontSize="small" />
          )}
        </OutlinedIconButton>
      </span>
    </Tooltip>
  );
};

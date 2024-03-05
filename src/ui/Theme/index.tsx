import { FC, ReactNode } from "react";
import { ThemeProvider, useMediaQuery } from "@mui/material";

import config from "./config";

type Props = {
  children: ReactNode;
};

const Theme: FC<Props> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeConfig = config({ theme: prefersDarkMode ? "dark" : "light" });

  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
};

export default Theme;

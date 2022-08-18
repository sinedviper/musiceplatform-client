import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "../node_modules/@mui/material/index";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Player from "../components/Player";
import Head from "../node_modules/next/head";

const theme = createTheme({
  palette: {
    primary: {
      light: "#338e67",
      main: "#007242",
      dark: "##004f2e",
      contrastText: "#fff",
    },
  },
});

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title || "Musice"}</title>
        <meta
          name="description"
          content={
            `Musice platfrom where youa re can find need musice` + description
          }
        />
        <meta name="keywords" content={keywords || "Musice, track, artist"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{ margin: "90 0" }}>{children}</Container>
      <Player />
    </ThemeProvider>
  );
};

export default MainLayout;

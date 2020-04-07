import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css"

import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { SnackbarProvider } from 'notistack';
import Container from "@material-ui/core/Container";

import { Step } from "state/app";
import { About } from "components/About";
import { NavBar } from "components/NavBar";
import { Imprint } from "./components/Imprint";
import { CovMap } from "./components/CovMap";
import { Welcome } from "./components/Welcome";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";

export const App = () => {
  const activeStep = useSelector((state: State) => state.app.activeStep);

  function renderContent() {
    switch (activeStep) {
      case Step.Welcome:
        return <Welcome />;
      case Step.Map:
        return <CovMap />;
      case Step.Imprint:
        return <Imprint />
      case Step.About:
        return <About />;
      default:
        return <div>Page not found {Step[activeStep]}</div>;
    }
  }

  return <>
    <SnackbarProvider maxSnack={3}>
      <>
        <NavBar />
        <Container style={{height: 'calc(100% - 60px)', paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          {renderContent()}
        </Container>
        <IntermediateProgress />
      </>
    </SnackbarProvider>
  </>
};

// TODO: Hot only in dev?
export default hot(module)(App);
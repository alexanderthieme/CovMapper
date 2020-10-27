import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { StepConfig, welcomeStepsConfig } from "./welcomeStepsConfig";
import { MobileDotsStepper } from "./MobileDotsStepper";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

function getStepConfig(stepName?: string): StepConfig | undefined {
  return welcomeStepsConfig.find(({ name }) => name === stepName);
}

export const WelcomeStepsModal: React.FC<{ subPage?: string }> = (props) => {
  const classes = useCommonWelcomeModalStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  const currentStepConfig = getStepConfig(props.subPage);

  if (currentStepConfig === undefined) {
    return null;
  }

  const renderNextButton = () =>
    currentStepConfig.next ? (
      <Button
        className={`${classes.primaryButton} ${classes.largeText}`}
        variant="contained"
        color="primary"
        component={Link}
        to={currentStepConfig.next}
      >
        Weiter
      </Button>
    ) : null;

  const renderSkipButton = () =>
    currentStepConfig.skip ? (
      <Button
        className={`${classes.secondaryButton} ${classes.largeText}`}
        variant="contained"
        component={Link}
        to={currentStepConfig.skip}
      >
        Überspringen
      </Button>
    ) : null;

  const onClose = () => {
    if (currentStepConfig.closeable) {
      history.goBack();
    }
  };

  return (
    <div>
      <Dialog open={true} fullScreen={fullScreen} onClose={onClose}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>
          <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
            <currentStepConfig.Component />
          </div>
          <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
            {renderNextButton()}
            {renderSkipButton()}
            <MobileDotsStepper currentStepConfig={currentStepConfig} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

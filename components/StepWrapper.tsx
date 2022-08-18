import React from "react";
import { Container, Stepper, Step, StepLabel, Grid, Card } from "@mui/material";

interface SteWrapperProps {
  activeStep: number;
}

const steps = ["Info aboute track", "Download image", "Download track"];

const StepWrapper: React.FC<SteWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={index} completed={activeStep > index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", minHeight: 50 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;

import React, { useState } from "react";
import styles from "./Form.module.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Grid, Typography } from "@mui/material";
import { config } from "../../config";

function calculateInterest(loanAmount: number, durationYears: number): number {
  const interestRate = config.interest_rate || 0.099;
  const durationMonths = durationYears * 12;
  const monthlyInterestRate = interestRate / 12;
  const numerator =
    loanAmount *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, durationMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, durationMonths) - 1;
  const interest = numerator / denominator;
  return Math.round(interest);
}

const Form = () => {
  const [loanAmount, setLoanAmount] = useState(110000);
  const [durationYears, setDurationYears] = useState(6);
  const totalInterest = calculateInterest(loanAmount, durationYears);

  const handleLoanAmountChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setLoanAmount(newValue as number);
  };

  const handleDurationYearsChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setDurationYears(newValue as number);
  };

  return (
    <div className={styles.Form}>
      <div className={styles.Form__topContainer}>
        <h1 className={styles.Form__header}>Lånekalkyl</h1>
        <div className={styles.Form__speech}>
          Exempel på månadskostnad {totalInterest} SEK / månad
        </div>
      </div>

      <Box className={styles.Form__box}>
        <Typography className={styles.Form__typo} variant="h5">
          Lånebelopp
        </Typography>
        <Slider
          className={styles.Form__slider}
          min={20000}
          max={200000}
          step={1000}
          value={loanAmount}
          onChange={handleLoanAmountChange}
          aria-label="small"
          valueLabelDisplay="on"
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography className={styles.Form__typoLeft} variant="h6">
              20,000 kr
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={styles.Form__typoRight} variant="h6">
              200,000 kr
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.Form__box}>
        <Typography className={styles.Form__typo} variant="h5">
          Lånetid
        </Typography>
        <Slider
          className={styles.Form__slider}
          min={2}
          max={10}
          value={durationYears}
          onChange={handleDurationYearsChange}
          aria-label="Default"
          valueLabelDisplay="on"
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography className={styles.Form__typoLeft} variant="h6">
              2 år
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={styles.Form__typoRight} variant="h6">
              10 år
            </Typography>
          </Grid>
        </Grid>
        <Grid className={styles.Form__buttonForm} container rowSpacing={1}>
          <Button
            className={styles.Form__button}
            variant="contained"
            onClick={() => {
              console.log(
                `/loan-application/?amount=${loanAmount}&months=${
                  durationYears * 12
                }`
              );
            }}
          >
            Till ansökan
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default Form;

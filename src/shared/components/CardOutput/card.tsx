/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { DisplayValue } from './display';

type CardProps = {
  data: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      // eslint-disable-next-line no-magic-numbers
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper2: {
      // eslint-disable-next-line no-magic-numbers
      padding: theme.spacing(2),
      textAlign: 'center',
      borderStyle: 'solid',
    },
  })
);

const Card: FunctionComponent<CardProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {data ? (
        <div className={classes.root}>
          <Grid container xs={12}>
            {data.map((country: any) => (
              <Paper className={classes.paper2}>
                <Grid container spacing={2} xs={12}>
                  <DisplayValue variable={country} />
                </Grid>
              </Paper>
            ))}
          </Grid>
        </div>
      ) : (
        <span>Nodata present</span>
      )}
    </>
  );
};
export { Card };

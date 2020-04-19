/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

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
  })
);

const Card: FunctionComponent<CardProps> = ({ data }) => {
  // eslint-disable-next-line react/jsx-key
  // <Grid container spacing={2}>
  //   <DisplayValue variable={variable} />
  // </Grid>
  const classes = useStyles();
  return (
    // TODO change to card
    <>
      {data ? (
        <div className={classes.root}>
          {data.map(() => (
            <>
              <Grid container spacing={3} xs={12}>
                <Grid item xs>
                  <Paper className={classes.paper}>1</Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>1</Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>1</Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>2</Paper>
                </Grid>
              </Grid>
            </>
          ))}
        </div>
      ) : (
        <span>Nodata present</span>
      )}
    </>
  );
};
export { Card };

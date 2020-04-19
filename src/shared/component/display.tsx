/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { trimAndCapitalise } from '../../util/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // eslint-disable-next-line no-magic-numbers
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

type DisplayLoopProps = {
  objectOrArray: any;
};

const DisplayLoop: FunctionComponent<DisplayLoopProps> = ({
  objectOrArray,
}) => {
  const jsx = [];
  for (const varibleName in objectOrArray) {
    if (!varibleName.startsWith('_')) {
      // eslint-disable-next-line no-prototype-builtins
      if (objectOrArray.hasOwnProperty(varibleName)) {
        jsx.push(
          <DisplayValue
            variableName={varibleName}
            variable={objectOrArray[varibleName]}
          />
        );
      }
    }
  }
  // TODO change from div
  return <div> {jsx.map((value: any) => value)} </div>;
};

type DisplayValueProps = {
  variableName?: string;
  variable: any;
};

const DisplayValue: FunctionComponent<DisplayValueProps> = ({
  variableName = '',
  variable,
}) => {
  const classes = useStyles();
  console.log('variable');
  console.log(variable);
  // TODO Bold name. Format Variable + Name.
  // TODO Column Sizes in grid format
  if (typeof variable === 'string' || variable instanceof String) {
    // TODO: Fix toString()
    return (
      <Grid item xs>
        <Paper className={classes.paper}>
          {trimAndCapitalise(variableName)}:
          {trimAndCapitalise(variable.toString())}
        </Paper>
      </Grid>
    );
  }
  if (typeof variable === 'number' || variable instanceof Number) {
    return (
      <Grid item xs>
        <Paper className={classes.paper}>
          {trimAndCapitalise(variableName)}: {variable}
        </Paper>
      </Grid>
    );
  }

  if (
    Array.isArray(variable) ||
    (!!variable && variable.constructor === Object)
  )
    // TODO show variable Name
    return <DisplayLoop objectOrArray={variable} />;

  return <div>Nodata </div>;
};

export { DisplayLoop, DisplayValue };

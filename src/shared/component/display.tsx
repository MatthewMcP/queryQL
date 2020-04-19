/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { trimAndCapitalise } from '../../util/index';

const Generator2 = (variableName22: any): string => {
  console.log('Generator2');
  console.log(variableName22);

  if (variableName22 === 'object') return '';
  return variableName22;
};
type DisplayLoopProps = {
  objectOrArray: any;
  objectName?: string;
};

const DisplayLoop: FunctionComponent<DisplayLoopProps> = ({
  objectOrArray,
  objectName = '',
}) => {
  const jsx = [];
  const ifNotFalse = (): string => {
    console.log('Object');

    if (objectName === 'temporary') return '';
    return objectOrArray['__typename'];
  };
  for (const variableName in objectOrArray) {
    if (!variableName.startsWith('_')) {
      // eslint-disable-next-line no-prototype-builtins
      if (objectOrArray.hasOwnProperty(variableName)) {
        jsx.push(
          <>
            <DisplayValue
              variableName={variableName}
              variable={objectOrArray[variableName]}
            />
          </>
        );
      }
    }
  }
  console.log('Object');
  console.log(objectOrArray);
  console.log(objectOrArray['__typename']);
  // TODO change from div
  return (
    <Grid container xs>
      {trimAndCapitalise(ifNotFalse())}
      {': '}
      {jsx.map((value: any) => value)}
    </Grid>
  );
};

const DisplayArray: FunctionComponent<DisplayLoopProps> = ({
  objectOrArray,
  objectName,
}) => {
  const jsx = [];
  console.log('Array ' + objectOrArray['__typename']);
  console.log(objectOrArray);
  console.log(objectName);
  for (const variableName in objectOrArray) {
    if (!variableName.startsWith('_')) {
      console.log('variableName: array ' + variableName);

      // eslint-disable-next-line no-prototype-builtins
      if (objectOrArray.hasOwnProperty(variableName)) {
        jsx.push(
          <>
            <DisplayValue
              variableName={'temporary'}
              variable={objectOrArray[variableName]}
            />
          </>
        );
      }
    }
  }
  // TODO change from div
  return (
    <Grid container xs>
      {trimAndCapitalise(Generator2(objectName))}
      {'sdfdsf : '}
      {jsx.map((value: any) => value)}
    </Grid>
  );
};

type DisplayValueProps = {
  variableName?: string;
  variable: any;
};

const DisplayValue: FunctionComponent<DisplayValueProps> = ({
  variableName = '',
  variable,
}) => {
  // TODO Bold name. Format Variable + Name.
  // TODO Column Sizes in grid format
  if (typeof variable === 'string' || variable instanceof String) {
    // TODO: Fix toString()
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}:{' '}
        {trimAndCapitalise(variable.toString())}
      </Grid>
    );
  }
  if (typeof variable === 'number' || variable instanceof Number) {
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}: {variable}
      </Grid>
    );
  }
  console.log('variable');
  console.log(variable);
  console.log(variableName);

  if (Array.isArray(variable))
    return (
      <DisplayArray
        objectName={Generator2(variableName)}
        objectOrArray={variable}
      />
    );

  if (!!variable && variable.constructor === Object)
    return <DisplayLoop objectName={variableName} objectOrArray={variable} />;

  return <div>Nodata </div>;
};

export { DisplayLoop, DisplayValue };

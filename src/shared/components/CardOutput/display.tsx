/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { trimAndCapitalise } from '../../../util/index';

const variableNameIfNotObject = (variable: any): string => {
  if (variable === 'object') return '';
  return variable;
};

type DisplayLoopProps = {
  objectOrArray: any;
  objectName?: string;
};

type DisplayValueProps = {
  variableName?: string;
  variable: any;
};

const DisplayArray: FunctionComponent<DisplayLoopProps> = ({
  objectOrArray,
  objectName,
}) => {
  const jsx = [];
  for (const variableName in objectOrArray) {
    if (!variableName.startsWith('_')) {
      // eslint-disable-next-line no-prototype-builtins
      if (objectOrArray.hasOwnProperty(variableName)) {
        jsx.push(
          <>
            <DisplayValue
              variableName={'EmptyDisplay'}
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
      {trimAndCapitalise(variableNameIfNotObject(objectName))}
      {jsx.map((value: any) => value)}
    </Grid>
  );
};

const DisplayObject: FunctionComponent<DisplayLoopProps> = ({
  objectOrArray,
  objectName = '',
}) => {
  const TypeNameOrEmpty = (): string => {
    if (objectName === 'EmptyDisplay') return '';
    return objectOrArray['__typename'];
  };

  const jsx = [];
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
  return (
    <Grid container xs>
      {trimAndCapitalise(TypeNameOrEmpty())}
      {': '}
      {jsx.map((value: any) => value)}
    </Grid>
  );
};

const DisplayValue: FunctionComponent<DisplayValueProps> = ({
  variableName = '',
  variable,
}) => {
  if (typeof variable === 'string' || variable instanceof String) {
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}
        {': '}
        {trimAndCapitalise(variable.toString())}
      </Grid>
    );
  }
  if (typeof variable === 'number' || variable instanceof Number) {
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}
        {': '}
        {variable}
      </Grid>
    );
  }

  if (Array.isArray(variable)) {
    return (
      <DisplayArray
        objectName={variableNameIfNotObject(variableName)}
        objectOrArray={variable}
      />
    );
  }

  if (!!variable && variable.constructor === Object)
    return <DisplayObject objectName={variableName} objectOrArray={variable} />;

  return (
    <Grid item xs>
      Empty/Unkown
    </Grid>
  );
};

export { DisplayValue };

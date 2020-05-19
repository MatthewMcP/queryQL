/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { trimAndCapitalise } from '../../../util/index';

// TODO: Rename and tidy
// TODO: Remove handling of arrays + Objects. Get design right then add in
// TODO: Sort first Object being shown
// TODO: Sort variableNameIfNotObject = 'Object' nonsense

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
  variableValue: any;
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
              variableName="EmptyDisplay"
              variableValue={objectOrArray[variableName]}
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
    // eslint-disable-next-line dot-notation
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
              variableValue={objectOrArray[variableName]}
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
  variableValue,
}) => {
  if (typeof variableValue === 'string' || variableValue instanceof String) {
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}
        {': '}
        {trimAndCapitalise(variableValue.toString())}
      </Grid>
    );
  }
  if (typeof variableValue === 'number' || variableValue instanceof Number) {
    return (
      <Grid item xs>
        {trimAndCapitalise(variableName)}
        {': '}
        {variableValue}
      </Grid>
    );
  }

  if (Array.isArray(variableValue)) {
    return (
      <DisplayArray
        objectName={variableNameIfNotObject(variableName)}
        objectOrArray={variableValue}
      />
    );
  }

  if (!!variableValue && variableValue.constructor === Object) {
    return (
      <DisplayObject objectName={variableName} objectOrArray={variableValue} />
    );
  }

  return (
    <Grid item xs>
      Empty/Unkown
    </Grid>
  );
};

export { DisplayValue };

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
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
    <span className="col-auto">
      {trimAndCapitalise(variableNameIfNotObject(objectName))}
      {jsx.map((value: any) => value)}
    </span>
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
    <div className="col-auto grid grid-cols-2">
      {trimAndCapitalise(TypeNameOrEmpty())}
      {': '}
      {jsx.map((value: any) => value)}
    </div>
  );
};

const DisplayValue: FunctionComponent<DisplayValueProps> = ({
  variableName = '',
  variableValue,
}) => {
  if (typeof variableValue === 'string' || variableValue instanceof String) {
    return (
      <span className="col-auto">
        {trimAndCapitalise(variableName)}
        {': '}
        {trimAndCapitalise(variableValue.toString())}
      </span>
    );
  }
  if (typeof variableValue === 'number' || variableValue instanceof Number) {
    return (
      <span className="col-auto">
        {trimAndCapitalise(variableName)}
        {': '}
        {variableValue}
      </span>
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

  return <span className="col-auto">Empty/Unkown</span>;
};

export { DisplayValue };

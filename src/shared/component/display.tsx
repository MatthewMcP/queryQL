/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';

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
  // TODO Bold name. Format Variable + Name.
  // TODO Column Sizes in grid format
  if (typeof variable === 'string' || variable instanceof String) {
    return (
      <span>
        {variableName}: {variable}
      </span>
    );
  }
  if (typeof variable === 'number' || variable instanceof Number) {
    return (
      <span>
        {variableName}: {variable}
      </span>
    );
  }

  if (
    Array.isArray(variable) ||
    (!!variable && variable.constructor === Object)
  )
    // TODO show variable Name
    return <DisplayLoop objectOrArray={variable} />;

  return <div>Nodata</div>;
};

export { DisplayLoop, DisplayValue };

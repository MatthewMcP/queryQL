import React, { FunctionComponent } from 'react';
import { trimAndCapitalise } from '../../../util/index';

type DisplayObjectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any;
};

const DisplayObject: FunctionComponent<DisplayObjectProps> = ({ object }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jsx = Object.keys(object)
    .filter(key => !key.startsWith('_'))
    .map(key => {
      return (
        <DisplayValue
          key={key + object[key]}
          propertyName={key}
          propertyValue={object[key]}
        />
      );
    });

  return <>{jsx}</>;
};

type DisplayValueProps = {
  propertyName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
};
const DisplayValue: FunctionComponent<DisplayValueProps> = ({
  propertyName = '',
  propertyValue,
}) => {
  if (typeof propertyValue === 'string' || propertyValue instanceof String) {
    return (
      <span className="col-auto m-0 sm:m-2">
        {trimAndCapitalise(propertyName)}
        {': '}
        {trimAndCapitalise(propertyValue.toString())}
      </span>
    );
  }
  if (typeof propertyValue === 'number' || propertyValue instanceof Number) {
    return (
      <span className="col-auto m-0 sm:m-2">
        {trimAndCapitalise(propertyName)}
        {propertyValue}
      </span>
    );
  }

  if (!!propertyValue && propertyValue.constructor === Object) {
    return <DisplayObject object={propertyValue} />;
  }

  if (Array.isArray(propertyValue)) {
    return (
      <span className="col-auto m-0 sm:m-2">
        {trimAndCapitalise(propertyName)}
        {': '}
        {propertyValue.length}
      </span>
    );
  }
  return (
    <span className="col-auto m-0 sm:m-2">
      {trimAndCapitalise(propertyName)}
      {': '}
      Unknown Type
    </span>
  );
};

export { DisplayValue };

// const TypeNameOrEmpty = (): string => {
//   if (objectName === 'EmptyDisplay') return '';
//   // eslint-disable-next-line dot-notation
//   return object['__typename'];
// };

// if (Array.isArray(variableValue)) {
//   return (
//     <DisplayArray
//       objectName={variableNameIfNotObject(variableName)}
//       objectOrArray={variableValue}
//     />
//   );
// }

// const variableNameIfNotObject = (variable: any): string => {
//   if (variable === 'object') return '';
//   return variable;
// };

// const DisplayArray: FunctionComponent<DisplayLoopProps> = ({
//   objectOrArray,
//   objectName,
// }) => {
//   const jsx = [];
//   for (const variableName in objectOrArray) {
//     if (!variableName.startsWith('_')) {
//       // eslint-disable-next-line no-prototype-builtins
//       if (objectOrArray.hasOwnProperty(variableName)) {
//         jsx.push(
//           <>
//             <DisplayValue
//               variableName="EmptyDisplay"
//               variableValue={objectOrArray[variableName]}
//             />
//           </>
//         );
//       }
//     }
//   }
//   // TODO change from div
//   return (
//     <span className="col-auto">
//       {trimAndCapitalise(variableNameIfNotObject(objectName))}
//       {jsx.map((value: any) => value)}
//     </span>
//   );
// };

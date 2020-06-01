import React, { FunctionComponent } from 'react';
import { trimAndCapitalise } from '../../../util/index';

type DisplayObjectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any;
};

const DisplayObject: FunctionComponent<DisplayObjectProps> = ({ object }) => {
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
  if (!!propertyValue && propertyValue.constructor === Object) {
    return <DisplayObject object={propertyValue} />;
  }
  let propertyValueText = '';

  if (typeof propertyValue === 'string' || propertyValue instanceof String) {
    propertyValueText = trimAndCapitalise(propertyValue.toString());
  } else if (
    typeof propertyValue === 'number' ||
    propertyValue instanceof Number
  ) {
    propertyValueText = propertyValue.toString();
  } else if (Array.isArray(propertyValue)) {
    propertyValueText = propertyValue.length.toString();
  } else {
    propertyValueText = 'Cannot Process';
  }

  return (
    <span className="w-auto m-2">
      {trimAndCapitalise(propertyName)}
      {': '}
      {propertyValueText}
    </span>
  );
};

export { DisplayObject, DisplayValue };

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

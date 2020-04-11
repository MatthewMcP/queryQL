import React, { FunctionComponent } from 'react';
import { Country } from './Types';

type CountriesCardProps = {
  countries: Country[][];
};

const CountriesCard: FunctionComponent<CountriesCardProps> = ({
  countries,
}) => {
  const loopObjectOrArray = (objectOrArray: any) => {
    console.log('loopObjectOrArray objectOrArray: ' + objectOrArray);
    let jsx = [];
    for (let varible in objectOrArray) {
      if (!varible.startsWith('_')) {
        if (objectOrArray.hasOwnProperty(varible)) {
          console.log(varible + ' -> ' + objectOrArray[varible]);
          const processedValue = processValue(varible, objectOrArray[varible]);
          console.log('processedValue');
          console.log(processedValue);
          jsx.push(processedValue);
        }
      }
    }
    return <div> {jsx.map((value: any) => value)} </div>;
  };

  const processValue = (variableName: string, variable: any) => {
    if (typeof variable === 'string' || variable instanceof String) {
      return (
        <span>
          {variableName}: {variable}{' '}
        </span>
      );
    }
    if (typeof variable === 'number' || variable instanceof Number) {
      return (
        <span>
          {variableName}: {variable}{' '}
        </span>
      );
    }

    if (
      Array.isArray(variable) ||
      (!!variable && variable.constructor === Object)
    ) {
      return loopObjectOrArray(variable);
    }
  };

  if (countries && countries[0]) {
    const listItems = countries[0].map((country: any) => {
      //debugger;
      console.log('country: ');
      console.log(country);
      return loopObjectOrArray(country);
    });

    console.log('listItems: ');
    console.log(listItems);
    console.log(listItems[0]);
    return <div>{listItems}</div>;
  }
  return <div>Nodata</div>;
};
export { CountriesCard };

import React, { FunctionComponent } from 'react';
import { DisplayValue } from './display';

type CardProps = {
  data: any;
};

const Card: FunctionComponent<CardProps> = ({ data }) => {
  return (
    <div className="container mx-auto">
      {data ? (
        <>
          {data.map((country: any) => (
            <div
              key={country.toString()}
              // eslint-disable-next-line max-len
              className="container mx-auto text-white border-2 border-white m-4 rounded grid grid-cols-1 grid-flow-col-dense sm:grid-flow-col gap-2 row-auto"
              // eslint-disable-next-line prettier/prettier
            >
              <DisplayValue propertyValue={country} />
            </div>
          ))}
        </>
      ) : (
        <span>Nodata present</span>
      )}
    </div>
  );
};
export { Card };

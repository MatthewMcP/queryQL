/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
            <div className="container mx-auto text-white border-2 border-white m-4 rounded grid grid-cols-6 gap-4">
              <DisplayValue variableValue={country} />
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

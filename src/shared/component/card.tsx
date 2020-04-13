import React, { FunctionComponent } from 'react';
import { DisplayValue } from './display';

type CardProps = {
  data: any;
};

const Card: FunctionComponent<CardProps> = ({ data }) => {
  if (data) {
    return (
      // TODO change to card
      <div>
        {data.map((variable: any) => (
          // eslint-disable-next-line react/jsx-key
          <DisplayValue variable={variable} />
        ))}
      </div>
    );
  }

  // TODO Change to inline if
  return <div>Nodata present</div>;
};
export { Card };

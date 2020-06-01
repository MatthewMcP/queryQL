import React, { FunctionComponent } from 'react';
import { DisplayObject } from './PropertyDisplay';

type CardDisplayProps = {
  data: unknown[];
};

const CardDisplay: FunctionComponent<CardDisplayProps> = ({ data }) => {
  return (
    <div className="container mx-auto">
      {data ? (
        <>
          {data.map((singleData: unknown, index: number) => {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="container mx-auto text-white border-2 border-white m-2 rounded flex flex-wrap"
              >
                <DisplayObject object={singleData} />
              </div>
            );
          })}
        </>
      ) : (
        <span>Nodata present</span>
      )}
    </div>
  );
};
export { CardDisplay };

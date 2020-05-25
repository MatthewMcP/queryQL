/* eslint-disable react/jsx-key */
import React, { FunctionComponent } from 'react';

type TableDisplayProps = {
  data: any;
};

const TableDisplay: FunctionComponent<TableDisplayProps> = ({ data }) => {
  const temp = <th key={1}>fname</th>;
  const temp2 = <th key={2}>fname2</th>;
  let jsx: JSX.Element[] = [temp, temp2];
  if (data && data[0]) {
    jsx = Object.keys(data[0])
      .filter(key => !key.startsWith('_'))
      .map(key => {
        return <th key={key + data[key]}>{key}</th>;
      });
  }

  return (
    <div className="container mx-auto">
      {data ? (
        <>
          <table>
            <thead>
              <tr>{jsx}</tr>
            </thead>
            {data.map((country: any, index: number) => {
              const jsxTheSecond = Object.keys(country)
                .filter(key => !key.startsWith('_'))
                .map(key => {
                  let returnVal = country[key];
                  if (!returnVal) {
                    returnVal = 'No Data';
                  }

                  if (!!returnVal && returnVal.constructor === Object) {
                    returnVal = 'No Data';
                  }
                  if (Array.isArray(returnVal)) {
                    returnVal = 'No Data';
                  }
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={index + key}>{returnVal}</td>
                  );
                });
              return (
                <tbody>
                  <tr key={1}>{jsxTheSecond}</tr>
                </tbody>
              );
            })}
          </table>
        </>
      ) : (
        <span>Nodata present</span>
      )}
    </div>
  );
};
export { TableDisplay };

/* eslint-disable react/jsx-key */
import React, { FunctionComponent } from 'react';
import { trimAndCapitalise } from '../../../util/index';

type TableDisplayProps = {
  data: any;
};

const TableDisplay: FunctionComponent<TableDisplayProps> = ({ data }) => {
  let jsx: JSX.Element[] = [];
  if (data && data[0]) {
    jsx = Object.keys(data[0])
      .filter(key => !key.startsWith('_'))
      .map(key => {
        return <th key={key + data[key]}>{trimAndCapitalise(key)}</th>;
      });
  }

  return (
    <div className="container mx-auto">
      {data ? (
        <>
          <table className="table-auto box-border border-4 border-gray-400 rounded">
            <thead>
              <tr className="table-auto box-border border-4 rounded">{jsx}</tr>
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
                    <td key={index + key}>{trimAndCapitalise(returnVal)}</td>
                  );
                });
              return (
                <tbody className="text-center">
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

import React, { FunctionComponent } from 'react';
import { trimAndCapitalise } from '../../../util/index';

type TableDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const TableDisplay: FunctionComponent<TableDisplayProps> = ({ data }) => {
  let jsxTableHeader: JSX.Element[] = [];
  if (data && data[0]) {
    jsxTableHeader = Object.keys(data[0])
      .filter(key => !key.startsWith('_'))
      .map(key => {
        return (
          <th key={key + data[key]} className="box-border border-2 px-2">
            {trimAndCapitalise(key)}
          </th>
        );
      });
  }

  return (
    <div className="">
      {data ? (
        <>
          <table className="table-fixed overflow-x-auto">
            <thead>
              <tr>{jsxTableHeader}</tr>
            </thead>
            <tbody className="text-center">
              {// eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.map((singleData: any, index: number) => {
                const jsxTableCells = Object.keys(singleData)
                  .filter(key => !key.startsWith('_'))
                  .map(key => {
                    let returnVal = singleData[key];
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
                      <td
                        // eslint-disable-next-line react/no-array-index-key
                        key={index + key}
                        className="box-border border-2 sm:px-2 break-all"
                        // eslint-disable-next-line prettier/prettier
                      >
                        {trimAndCapitalise(returnVal)}
                      </td>
                    );
                  });
                // eslint-disable-next-line react/no-array-index-key
                return <tr key={index}>{jsxTableCells}</tr>;
              })
              // eslint-disable-next-line prettier/prettier
              }
            </tbody>
          </table>
        </>
      ) : (
        <span>Nodata present</span>
      )}
    </div>
  );
};
export { TableDisplay };

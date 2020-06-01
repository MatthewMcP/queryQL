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
    <div>
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
                    let cellText = singleData[key];
                    if (!cellText) {
                      cellText = 'No Data';
                    }
                    if (cellText.constructor === Object) {
                      cellText = 'Object Data';
                    }
                    if (Array.isArray(cellText)) {
                      cellText = cellText.length;
                    }
                    return (
                      <td
                        // eslint-disable-next-line react/no-array-index-key
                        key={index + key}
                        className="box-border border-2 sm:px-2 break-all"
                      >
                        {trimAndCapitalise(cellText)}
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

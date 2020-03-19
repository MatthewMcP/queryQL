/* eslint-disable no-magic-numbers */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Row } from './types/Row';

const EXCHANGE_RATES = gql`
  {
    country(code: "BR") {
      name
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
const ScoreLanding = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  console.log('data: ');
  console.log(data);

  // return queryState handler or
  return (
    <div>
      <div>ScoreLanding</div>
    </div>
  );
};
export default ScoreLanding;

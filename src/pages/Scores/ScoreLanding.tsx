import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Row } from "./types/Row";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createSingleRow(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Row {
  const myRow: Row = { name, calories, fat, carbs, smarts: protein };
  return myRow;
}

const rows: Array<Row> = [
  createSingleRow("Frozen yoghurt", 1529, 226.0, 24, 4.0),
  createSingleRow("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createSingleRow("Eclair", 262, 16.0, 24, 6.0),
  createSingleRow("Cupcake", 305, 3.7, 67, 4.3),
  createSingleRow("Gingerbread", 356, 16.0, 49, 3.9)
];

const ScoreLanding = (): React.ReactNode => {
  const classes = useStyles();

  return (
    <div>
      <div>ScoreLanding</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.smarts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ScoreLanding;

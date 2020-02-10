import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import React from "react";
import { IStandardProps } from "../standardProps";

export interface ISimpleTableProps extends IStandardProps {
  head?: React.ReactNode;
  body: React.ReactNode[] | null;
}

const SimpleTable: React.FC<ISimpleTableProps> = ({
  head,
  body,
  testId
}): JSX.Element => {
  return (
    <TableContainer component={Paper} data-test-id={testId}>
      <Table>
        <TableHead>{head}</TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;

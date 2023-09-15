import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./ListData.css";
const ListData = (props) => {
  let dataListArray =
    props.data &&
    props.data.length > 0 &&
    props.data.map((dataObj, index) => {
      return (
        <TableRow
          key={dataObj.reference + dataObj.accountNumber + index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          className={'table-row'}
        >
          <TableCell component="th" scope="row">
            {dataObj.reference}
          </TableCell>
          <TableCell align="left">{dataObj.accountNumber}</TableCell>
          <TableCell align="left">{dataObj.description}</TableCell>
          <TableCell align="left">{dataObj.message}</TableCell>
        </TableRow>
      );
    });

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  className="table-header">
            <TableCell>Reference No</TableCell>
            <TableCell align="left">Account No</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Error description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataListArray}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListData;

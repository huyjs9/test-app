import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(index, des, type, phyadd, adstt, opstt, speed) {
  return { index, des, type, phyadd, adstt, opstt, speed };
}




const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
}));

export default function Orders() {
  const classes = useStyles();
  let data3 = JSON.parse(localStorage.getItem('itemdata'));
  // let aa=JSON.stringify(data3.result[0].description);
  // let ab=JSON.stringify(data3.result[0].type);
  // let ac=JSON.stringify(data3.result[0].description);
  // let ad=JSON.stringify(data3.result[0].description);
  // let ae=JSON.stringify(data3.result[0].description);
  // let af=JSON.stringify(data3.result[0].description);

  const rows = [
    createData(1, 'a', 'eth('+')', '0019.5B7D.0EAA', 'up(1)', 'up(1)', 10000),
    createData(2, 'Discription', 'eth(0)', '0019.5B7D.0EAA', 'up(1)', 'up', 10000),
  ];
  return (
    <React.Fragment >
      <Table size="small" className={classes.seeMore}>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>PhysicalAddress</TableCell>
            <TableCell>AdminStatus</TableCell>
            <TableCell>OperationStatus</TableCell>
            <TableCell align="right">Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.index}</TableCell>
              <TableCell>{row.des}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.phyadd}</TableCell>
              <TableCell>{row.adstt}</TableCell>
              <TableCell>{row.opstt}</TableCell>
              <TableCell align="right">{row.speed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
          </div> */}
    </React.Fragment>
  );
}
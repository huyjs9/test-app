import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import Title from "./Title";

// Generate Order Data
function createData(index, des, stt, bitr, bits, speed) {
	return { index, des, stt, bitr, bits, speed };
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(1),
	},
}));

export default function Orders() {
	const classes = useStyles();
	let data3 = JSON.parse(localStorage.getItem("itemdata"));
	// let aa=JSON.stringify(data3.result[0].description);
	// let ab=JSON.stringify(data3.result[0].type);
	// let ac=JSON.stringify(data3.result[0].description);
	// let ad=JSON.stringify(data3.result[0].description);
	// let ae=JSON.stringify(data3.result[0].description);
	// let af=JSON.stringify(data3.result[0].description);

	const rows = [
		createData(1, "Interface f0/0", "up(1)", "1", "1", 10000),
		createData(2, "Interface f1/0", "up(1)", "1", "1", 10000),
	];
	return (
		<React.Fragment>
			<Table size="small" className={classes.seeMore}>
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Bits Recieved</TableCell>
						<TableCell>Bits Sent</TableCell>
						<TableCell align="right">Speed</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.index}</TableCell>
							<TableCell>{row.des}</TableCell>
							<TableCell>{row.stt}</TableCell>
							<TableCell>{row.bitr}</TableCell>
							<TableCell>{row.bits}</TableCell>
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

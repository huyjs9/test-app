import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import Title from "./Title";
import { Update } from "@material-ui/icons";

// Generate Order Data
// function createData(index, des, stt, bitr, bits, speed) {
// 	return { index, des, stt, bitr, bits, speed };
// }

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(1),
	},
}));

export default function TableDevice(props) {
	const classes = useStyles();
	const { itemdata } = props;
	const [currentindex, setCurrentindex] = useState(null);
	const Data = itemdata;
	console.log(Data);
	let data3 = JSON.parse(localStorage.getItem("itemdata"));
	// let aa=JSON.stringify(data3.result[0].description);
	// let ab=JSON.stringify(data3.result[0].type);
	// let ac=JSON.stringify(data3.result[0].description);
	// let ad=JSON.stringify(data3.result[0].description);
	// let ae=JSON.stringify(data3.result[0].description);
	// let af=JSON.stringify(data3.result[0].description);

	// const rows = [
	// 	createData(1, "Interface f0/0", "up(1)", "1", "1", 10000),
	// 	createData(2, "Interface f1/0", "up(1)", "1", "1", 10000),
	// ];
	return (
		<React.Fragment>
			<Table size="small" className={classes.seeMore}>
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Bits Recieved (bps)</TableCell>
						<TableCell>Bits Sent (bps)</TableCell>
						<TableCell align="right">Speed</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Data.filter((item) => item.name.includes("Interface")).map(
						(item, index) => (
							<TableRow key={item.itemid}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>
									{
										item.name
										// .replace(": Bits sent", "")
										// .replace(": Bits received", "")}
									}
								</TableCell>
								<TableCell></TableCell>
								{/* <TableCell>{index + 1 && "up(1)"}</TableCell> */}
								<TableCell>{item.lastvalue}</TableCell>
								<TableCell>{item.lastvalue}</TableCell>
								<TableCell align="right">10000</TableCell>
							</TableRow>
						)
					)}
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

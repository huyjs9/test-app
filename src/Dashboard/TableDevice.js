import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";

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
	let interfacebits = Data.filter((number) =>
		number.name.includes("Interface" && "Bits sent")
	);
	let interfacebitr = Data.filter((number) =>
		number.name.includes("Interface" && "Bits received")
	);
	let operation = Data.filter((number1) =>
		number1.name.includes("Operational")
	);
	let array = [];
	for (let i = 0; i < interfacebits.length; i++) {
		let arraybit = [];
		arraybit.push(interfacebitr[i].name.replace(": Bits received", ""));
		arraybit.push(operation[i].lastvalue);
		arraybit.push(interfacebitr[i].lastvalue);
		arraybit.push(interfacebits[i].lastvalue);
		let obj = { ...arraybit };
		array.push(obj);
	}
	console.log("mang", array);
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
						<TableCell align="right">Speed (Mbps)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{array.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{item[0]}</TableCell>
							<TableCell>
								{(item[1] = 1 ? "up(1)" : "down(0)")}
							</TableCell>
							<TableCell>{item[2]}</TableCell>
							<TableCell>{item[3]}</TableCell>
							<TableCell align="right">1000</TableCell>
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

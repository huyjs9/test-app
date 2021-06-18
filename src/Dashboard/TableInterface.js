import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Box,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(1),
	},
}));

export default function TableInterface(props) {
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
		let object = {};
		object["description"] = interfacebitr[i].name.replace(
			": Bits received",
			""
		);
		object["status"] = operation[i].lastvalue;
		object["bitrecieved"] = interfacebitr[i].lastvalue;
		object["bitsent"] = interfacebits[i].lastvalue;
		array.push(object);

		// let arraybit = [];
		// arraybit.push(interfacebitr[i].name.replace(": Bits received", ""));
		// arraybit.push(operation[i].lastvalue);
		// arraybit.push(interfacebitr[i].lastvalue);
		// arraybit.push(interfacebits[i].lastvalue);
		// let obj = { ...arraybit };
		// array.push(obj);
	}

	// console.log("mang", array);
	return (
		<React.Fragment>
			<Table size="small" className={classes.seeMore}>
				<TableHead>
					<TableRow>
						<TableCell width="5%">Index</TableCell>
						<TableCell width="30%">Description</TableCell>
						<TableCell width="15%">Status</TableCell>
						<TableCell width="10%">Bits Recieved (bps)</TableCell>
						<TableCell width="10%">Bits Sent (bps)</TableCell>
						<TableCell align="right">Speed (Mbps)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{array.map((item, index) => (
						<TableRow key={index}>
							<TableCell width="2%">{index + 1}</TableCell>
							<TableCell width="40%">
								{item.description}
							</TableCell>
							<TableCell width="10%">
								{item.status <= 1 ? (
									<Box
										color="success.main"
										fontWeight="fontWeightMedium"
									>
										up
										<ArrowDropUpIcon />
									</Box>
								) : (
									<Box
										color="error.main"
										fontWeight="fontWeightMedium"
									>
										down <ArrowDropDownIcon />
									</Box>
								)}
							</TableCell>
							<TableCell width="20%">
								{item.bitrecieved}
							</TableCell>
							<TableCell width="20%">{item.bitsent}</TableCell>
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

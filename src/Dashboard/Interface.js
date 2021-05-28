import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theaters } from "@material-ui/icons";
import internalIp from "internal-ip";

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
});
export default function Interface(props) {
	const classes = useStyles;
	const [theArray, setTheArray] = useState([]);
	const { itemdata } = props;

	const Data = itemdata;
	let interfacestt = Data.filter((number) =>
		number.name.includes("Interface" && "Bits")
	);
	let operation = Data.filter((number1) =>
		number1.name.includes("Operational")
	);
	let a = interfacestt.length;
	console.log("độ dài", a);
	console.log("Interface", interfacestt);
	console.log("Status", operation);
	let array = [];
	if (a > 0) {
		array.push(interfacestt[0].name.replace(": Bits received", ""));
	}
	for (let i = 0; i < operation.length; i++) {
		array.push(operation[i].lastvalue);
	}
	for (let i = 0; i < interfacestt.length; i++) {
		array.push(interfacestt[i].lastvalue);
	}
	console.log("mang", array);

	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.depositContext}>
				<Box>Name:</Box>
				<Box>Status: </Box>

				{/* <Box>
					{Data.filter((item) =>
						item.name.includes("Interface" && "Bits")
					).map((item, index) => (
						<Box key={item.itemid}>
							<Box display="inline-block" width="2%">
								{index + 1}.
							</Box>
							<Box display="inline-block">
								{item.name
									.replace(": Bits sent", "")
									.replace(": Bits received", "")}
							</Box>
							<Box>
								{item.name.slice(18)}: {item.lastvalue}
								{item.units}
							</Box>
						</Box>
					))}
				</Box> */}
				{/* <Box>
					{Data[26].name}
					{Data[26].lastvalue}
				</Box> */}
			</Typography>
		</React.Fragment>
	);
}

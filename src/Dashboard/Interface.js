import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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
		number.name.includes("Interface" && "Bits sent")
	);
	let interfacename = Data.filter((number) =>
		number.name.includes("Interface" && "Bits received")
	);
	let operation = Data.filter((number1) =>
		number1.name.includes("Operational")
	);
	let a = interfacestt.length;
	console.log("độ dài", a);
	console.log("Interface", interfacestt);
	console.log("Status", operation);
	let arrayname = [];
	let arraystt = [];
    let array=[]
	for (let i = 0; i < interfacestt.length; i++) {
		let arraybit = [];
		arraybit.push(interfacename[i].name.replace(": Bits received", ""));
		arraybit.push(operation[i].lastvalue);
		arraybit.push(interfacename[i].lastvalue);
		arraybit.push(interfacestt[i].lastvalue);
		let obj = { ...arraybit };
		arraystt.push(obj);
	}

	// for (let i = 0; i < interfacename.length; i++) {
	// 	if (a > 0) {
	// 		arrayname.push(
	// 			interfacename[i].name.replace(": Bits received", "")
	// 		);
	// 	}
	// }
	// for (let i = 0; i < operation.length; i++) {
	// 	arraystt.push(operation[i].lastvalue);
	// }
	// for (let i = 0; i < interfacestt.length; i++) {
	// 	arraybit.push(interfacestt[i].lastvalue);
	// }
	console.log("mang", array);

	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.depositContext}>
				<Box>
					{arrayname.map((name) => (
						<Box>Name:{name}</Box>
					))}
					{arraystt.map((stt) => (
						<Box>Status: {(stt = 1 ? "up" : "down")}</Box>
					))}
					{/* 
					{b.map((bit, index) => (
						<Box>
							<Box>Bit Received: {bit[0]}bps </Box>
							<Box>Bit Sent: {bit[1]}bps</Box>
						</Box>
					))} */}
				</Box>
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

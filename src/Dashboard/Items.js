/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
	head: {
		background: theme.palette.action.disabledBackground,
		color: theme.palette.common.black,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
});

export default function Items(props) {
	const classes = useStyles();
	const { itemdata, ipUrl, hostid, setItemdata } = props;
	const fakeData = itemdata; //Nhận dữ liệu mảng Item đã lưu để mapping
	// console.log('itemdata device', itemdata);

	// useEffect(async () => {
	// 	console.log("hostid", JSON.stringify(hostid));
	// 	console.log("IP", ipUrl);
	// 	if (hostid) {
	// 		const itemData = await axios.post(
	// 			`http://${ipUrl}/zabbix/api_jsonrpc.php`,
	// 			{
	// 				jsonrpc: "2.0",
	// 				method: "item.get",
	// 				params: {
	// 					output: [
	// 						"itemid",
	// 						"name",
	// 						"description",
	// 						"lastvalue",
	// 						"units",
	// 					],
	// 					hostids: hostid,
	// 					search: {
	// 						name: "",
	// 					},
	// 					sortfield: "name",
	// 				},
	// 				auth: JSON.parse(localStorage.getItem("token")),
	// 				id: 1,
	// 			}
	// 		);
	// 		setItemdata(itemData.data.result); //Lưu dữ liệu mảng Item
	// 		console.log("123", itemData.data.result);
	// 	} else {
	// 		setItemdata([]);
	// 	}
	// }, [hostid]);

	// useEffect(()=>{
	// 	// console.log();
	// 	console.log('itemdata device', itemdata);
	// 	if(itemdata.length > 0){
	// 		setTestData([...itemdata]);
	// 	}
	// },[itemdata])
	return (
		<React.Fragment>
			<Table size="small" className={classes.seeMore}>
				<TableHead>
					<TableRow>
						<StyledTableCell width="15%">
							Item Index
						</StyledTableCell>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell align="right">Current</StyledTableCell>
						{/* <TableCell width="15%">Item Index</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right">Current</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{fakeData
						.filter((item) => item.lastvalue >= 0)
						.map((item, index) => (
							<StyledTableRow key={item.itemid}>
								<StyledTableCell width="15%">
									{item.itemid}
								</StyledTableCell>
								<StyledTableCell>{item.name}</StyledTableCell>
								<StyledTableCell align="right">
									{" "}
									{item.lastvalue}
									{item.units}
								</StyledTableCell>
							</StyledTableRow>
							// <TableRow key={item.itemid}>
							// 	<TableCell>{item.itemid} </TableCell>
							// 	<TableCell>{item.name} </TableCell>
							// 	<TableCell align="right">
							// 		{item.lastvalue}
							// 		{item.units}
							// 	</TableCell>
							// </TableRow>
							// <Box  key={item.itemid} style={{ marginTop: 16 }}>
							// 	{" "}
							// 	<Box
							// 		fontWeight="fontWeightBold"
							// 		display="inline-block"
							// 		width="15%"
							// 	>
							// 		{/* <Link
							// 			onClick={() => {
							// 				alert(item.itemid);
							// 			}}
							// 		> */}
							// 		Itemid: {item.itemid}
							// 	</Box>
							// 	<Box
							// 		fontWeight="fontWeightLight"
							// 		display="inline-block"
							// 		width="50%"
							// 	>
							// 		Name: {item.name}
							// 	</Box>
							// 	<Box
							// 		fontWeight="fontWeightLight"
							// 		display="inline-block"
							// 	>
							// 		Lastvalue: {item.lastvalue}
							// 	</Box>
							// 	<Box
							// 		fontWeight="fontWeightLight"
							// 		display="inline-block"
							// 	>
							// 		{item.units}
							// 	</Box>
							// </Box>
						))}
				</TableBody>
			</Table>
			<Typography color="textPrimary" className={classes.depositContext}>
				<Box></Box>
			</Typography>
		</React.Fragment>
	);
}

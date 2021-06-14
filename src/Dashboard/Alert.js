/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import axios from "axios";
import { setIn } from "formik";

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
});

export default function Alert(props) {
	const classes = useStyles();
	const { alertdata, ipUrl, setAlertdata, host } = props;
	const fakeData = alertdata; //Nhận dữ liệu mảng Item đã lưu để mapping
	const test = alertdata;
	const data = host;
	let hostgroup = [];
	for (let i = 0; i < data.length; i++) {
		hostgroup.push(data[i].hostid);
		// let obj = [...arrayhostbit];
		// arrayhost.push(obj);
	}
	console.log("abc", hostgroup);
	useEffect(async () => {
		if (hostgroup) {
			const alertData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "alert.get",
					params: {
						output: "extend",
						hostids: hostgroup,
					},
					auth: JSON.parse(localStorage.getItem("token")),
					id: 1,
				}
			);
			setAlertdata(alertData.data.result); //Lưu dữ liệu mảng Item
			// console.log("alertdata", alertData.data.result);
		} else {
			setAlertdata([]);
		}
	}, [host]);

	console.log("data", test);
	let sixnews = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 6; i--) {
			sixnews.push(test[i].message);
		}

		console.log("lon hon 6");
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			sixnews.push(test[i].message);
		}
		console.log("nho hon 6");
	}
	console.log("test", sixnews);

	// for (let i = 0; i < 6; i++) {
	// 	let y = alertdata.length - i;
	// 	sixnews.push(alertdata[0].subject);
	// }
	// console.log("a", sixnews);
	return (
		<React.Fragment>
			<Table size="small" className={classes.seeMore}>
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell align="right">Problems</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sixnews.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell align="right">{item}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

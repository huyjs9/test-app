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
	const { alertdata, ipUrl, hostid, setAlertdata } = props;
	const fakeData = alertdata; //Nhận dữ liệu mảng Item đã lưu để mapping

	useEffect(async () => {
		if (hostid) {
			const alertData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "alert.get",
					params: {
						output: ["subject"],
						hostids: hostid,
					},
					auth: JSON.parse(localStorage.getItem("token")),
					id: 1,
				}
			);
			setAlertdata(alertData.data.result); //Lưu dữ liệu mảng Item
			console.log("456", alertData.data.result);
		} else {
			setAlertdata([]);
		}
	}, [hostid]);
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
					{fakeData.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell align="right">{item.subject}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

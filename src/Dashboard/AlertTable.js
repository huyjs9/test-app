/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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

export default function AlertTable(props) {
	// const classes = useStyles();
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
	// console.log("abc", hostgroup);

	//Đây là bản test
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

	//Đây là bản Chính thức
	// useEffect(() => {
	// 	async function AutoAlert() {
	// 		if (hostgroup) {
	// 			const alertData = await axios.post(
	// 				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
	// 				{
	// 					jsonrpc: "2.0",
	// 					method: "alert.get",
	// 					params: {
	// 						output: "extend",
	// 						hostids: hostgroup,
	// 					},
	// 					auth: JSON.parse(localStorage.getItem("token")),
	// 					id: 1,
	// 				}
	// 			);
	// 			setAlertdata(alertData.data.result); //Lưu dữ liệu mảng Item
	// 			// console.log("alertdata", alertData.data.result);
	// 		} else {
	// 			setAlertdata([]);
	// 		}
	// 	}
	// 	AutoAlert();
	// 	const timeInterval = setInterval(AutoAlert, 5000);
	// 	return () => {
	// 		clearInterval(timeInterval);
	// 	};
	// }, [host]);

	// console.log("data", test);
	let sixmessages = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 6; i--) {
			let obj = {};
			let a = test[i].message.split("|");
			obj["name"] = a[0];
			obj["time"] = a[1];
			obj["status"] = a[2];
			obj["severity"] = a[3];
			obj["graphic"] = a[4];
			sixmessages.push(obj);
		}
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			let obj = {};
			let a = test[i].message.split("|");
			obj["name"] = a[0];
			obj["time"] = a[1];
			obj["status"] = a[2];
			obj["severity"] = a[3];
			obj["graphic"] = a[4];
			sixmessages.push(obj);
		}
	}

	//--------//

	// for (let i = 0; i < 6; i++) {
	// 	let y = alertdata.length - i;
	// 	sixmessages.push(alertdata[0].subject);
	// }
	// console.log("a", sixmessages);
	return (
		<React.Fragment>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell>Trigger name</TableCell>
						<TableCell>Time</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Severity</TableCell>
						<TableCell align="right">Item Graphic</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sixmessages.length > 0 &&
						sixmessages.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.time}</TableCell>
								<TableCell>
									{item.status.replace("Status:", "")}
								</TableCell>
								<TableCell>
									{item.severity.replace("Severity:", "")}
								</TableCell>
								<TableCell align="right">
									{item.graphic.replace("Item Graphic:", "")}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

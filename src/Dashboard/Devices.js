/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
});

export default function Devices(props) {
	const classes = useStyles();
	const { itemdata, ipUrl, hostid, setItemdata } = props;
	const fakeData = itemdata; //Nhận dữ liệu mảng Item đã lưu để mapping

	useEffect(async () => {
		console.log("hostid", JSON.stringify(hostid));
		console.log("IP", ipUrl);
		if (hostid) {
			const itemData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "item.get",
					params: {
						output: [
							"itemid",
							"name",
							"description",
							"lastvalue",
							"units",
						],
						hostids: hostid,
						search: {
							name: "",
						},
						sortfield: "name",
					},
					auth: JSON.parse(localStorage.getItem("token")),
					id: 1,
				}
			);
			setItemdata(itemData.data.result); //Lưu dữ liệu mảng Item
			console.log("123", itemData.data.result);
		} else {
			setItemdata([]);
		}
	}, [hostid]);
	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.depositContext}>
				<Box>
					{fakeData
						.filter((item) => item.lastvalue >= 0)
						.map((item, index) => (
							<Box key={item.itemid} style={{ marginTop: 16 }}>
								{" "}
								<Box
									fontWeight="fontWeightBold"
									display="inline-block"
									width="15%"
								>
									{/* <Link
										onClick={() => {
											alert(item.itemid);
										}}
									> */}
									{index}
									Itemid: {item.itemid}
								</Box>
								<Box
									fontWeight="fontWeightLight"
									display="inline-block"
									width="50%"
								>
									Name: {item.name}
								</Box>
								<Box
									fontWeight="fontWeightLight"
									display="inline-block"
								>
									Lastvalue: {item.lastvalue}
								</Box>
								<Box
									fontWeight="fontWeightLight"
									display="inline-block"
								>
									{item.units}
								</Box>
							</Box>
						))}
				</Box>
			</Typography>
		</React.Fragment>
	);
}

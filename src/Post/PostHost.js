import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostHost(props) {
    const { ipUrl, currentHostIndex, setPushit, setHost, setItemdata } = props;
    const handleClick = async () => {
		try {
			const tokenData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "user.login",
					params: {
						user: "Admin",
						password: "zabbix",
					},
					id: 1,
					auth: null,
				}
			);
			localStorage.setItem(
				"token",
				JSON.stringify(tokenData.data.result)
			);
			const hostData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "host.get",
					params: {
						filter: {
							host: [],
						},
					},
					auth: JSON.parse(localStorage.getItem("token")),
					id: 1,
				}
			);
			setHost(hostData.data.result);
			localStorage.setItem(
				"hostdata",
				JSON.stringify(hostData.data.result)
			);

			const itemData = await axios.post(
				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
				{
					jsonrpc: "2.0",
					method: "item.get",
					params: {
						output: [
							"itemid",
							"name",
							"key_",
							"description",
							"lastvalue",
							"units",
						],
						hostids: "10084",
						search: {
							key_: "system",
						},
						sortfield: "name",
					},
					auth: JSON.parse(localStorage.getItem("token")),
					id: 1,
				}
			);
			// localStorage.setItem(
			// 	"itemdata",
			// 	JSON.stringify(itemData.data.result)
			// );
			setItemdata(itemData.data.result);
			console.log(itemData.data.result);
		} catch (error) {
			console.error(error);
		}
	};
}
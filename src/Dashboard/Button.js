import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
	},
}));

export default function IconLabelButtons(props) {
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
				JSON.stringify(hostData.data.result[currentHostIndex].hostid1)
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
			setPushit();
			console.log(itemData.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	//   useEffect(() => {
	//     let API_URL = "192.168.0.5";
	//     axios.post(`http://${API_URL}/zabbix/api_jsonrpc.php`, {
	//         jsonrpc: "2.0",
	//         method: "user.login",
	//         params: {
	//             user: "Admin",
	//             password: "zabbix"
	//         },
	//         id: 1,
	//         auth: null
	//     })
	//         .then(res =>  localStorage.setItem('token', JSON.stringify(res.data.result)));
	//     axios.post(`http://${API_URL}/zabbix/api_jsonrpc.php`, {
	//         jsonrpc: "2.0",
	//         method: "host.get",
	//         params: {
	//             filter: {
	//                 host: [
	//                     "Zabbix server",
	//                     "Linux server"
	//                 ]
	//             }
	//         },
	//         auth: JSON.parse(localStorage.getItem('token')),
	//         id: 1
	//     })
	//         .then(res =>  localStorage.setItem('hostdata', JSON.stringify(res.data)));
	//         axios.post(`http://${API_URL}/zabbix/api_jsonrpc.php`, {
	//           jsonrpc: "2.0",
	//           method: "item.get",
	//           params: {
	//               output: ["itemid", "name", "key_", "description", "lastvalue", "unit"],
	//               hostids: "10084",
	//               search: {
	//                   key_: "system"
	//               },
	//               sortfield: "name"
	//           },
	//           auth: JSON.parse(localStorage.getItem('token')),
	//           id: 1
	//       })
	//           .then(res =>  localStorage.setItem('itemdata', JSON.stringify(res.data)));
	// }, []);

	const classes = useStyles();
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}
				className={classes.button}
				endIcon={<SearchIcon></SearchIcon>}
			>
				GET INFORMATION
			</Button>
		</div>
	);
}

/*async function getinf() {
  try {
    await firebase.get()
    props.history.replace('/display')
  } catch (error) {
    alert(error.message)
  }
}*/

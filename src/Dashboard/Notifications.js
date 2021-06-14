/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Badge, IconButton, Button } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { StyledNotifyButtonContainer } from "../styles/Dashboard.styled";

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
		// width: "300px",
		// height: "100px",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:focus": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function Notifications(props) {
	const { alertdata, ipUrl, hostid, setAlertdata, host } = props;
	const [num, setNum] = useState(0);
	const [anchorEl, setAnchorEl] = React.useState(null);
	// const [options, setOptions] = useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const fakeData = alertdata; //Nhận dữ liệu mảng Item đã lưu để mapping
	console.log("IP", ipUrl);
	const data = host;
	let hostgroup = [];
	for (let i = 0; i < data.length; i++) {
		hostgroup.push(data[i].hostid);
		// let obj = [...arrayhostbit];
		// arrayhost.push(obj);
	}
	// useEffect(async () => {
	// 	if (ipUrl) {
	// 		const alertData = await axios.post(
	// 			`http://${ipUrl}/zabbix/api_jsonrpc.php`,
	// 			{
	// 				jsonrpc: "2.0",
	// 				method: "alert.get",
	// 				params: {
	// 					output: ["subject"],
	// 					hostids: hostgroup,
	// 				},
	// 				auth: JSON.parse(localStorage.getItem("token")),
	// 				id: 1,
	// 			}
	// 		);
	// 		setAlertdata(alertData.data.result); //Lưu dữ liệu mảng Item
	// 		// console.log("456", alertData.data.result);
	// 	} else {
	// 		setAlertdata([]);
	// 	}
	// }, [ipUrl]);

	const options = [
		<Alert severity="error">This is an error alert — check it out!</Alert>,
		<Alert severity="warning">
			This is a warning alert — check it out!
		</Alert>,
		<Alert severity="info">This is an info alert — check it out!</Alert>,
		<Alert severity="success">
			This is a success alert — check it out!
		</Alert>,
	];

	useEffect(() => {
		setNum(alertdata.length);
	}, [alertdata]);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// const handleMenuItemClick = (event, index) => {
	// 	setSelectedIndex(index);
	// 	setAnchorEl(null);
	// };

	const handleClose = () => {
		setAnchorEl(null);
		setNum(0);
	};

	// const handleClick = () => {
	// 	setNum(options.length);
	// };

	console.log(num);
	return (
		<StyledNotifyButtonContainer>
			<IconButton color="inherit" onClick={handleClickListItem}>
				<Badge badgeContent={num} color="secondary">
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<StyledMenu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{alertdata.map((item, index) => (
					<MenuItem
						key={index}
						// disabled={index === 0}
						// selected={index === selectedIndex}
						// onClick={() => setNum(index + 1)}
						// onClick={(event) => handleMenuItemClick(event, index)}
					>
						{item.subject}
					</MenuItem>
				))}
			</StyledMenu>
		</StyledNotifyButtonContainer>
	);
}

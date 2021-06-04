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

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
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

const options = [
	<Alert severity="error">This is an error alert — check it out!</Alert>,
	<Alert severity="warning">This is a warning alert — check it out!</Alert>,
	<Alert severity="info">This is an info alert — check it out!</Alert>,
	<Alert severity="success">This is a success alert — check it out!</Alert>,
];

export default function Notifications(props) {
	const { alertdata, ipUrl, hostid, setAlertdata } = props;
	const [num, setNum] = useState(0);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const fakeData = alertdata; //Nhận dữ liệu mảng Item đã lưu để mapping

	// useEffect(async () => {
	// 	if (hostid) {
	// 		const alertData = await axios.post(
	// 			`http://${ipUrl}/zabbix/api_jsonrpc.php`,
	// 			{
	// 				jsonrpc: "2.0",
	// 				method: "alert.get",
	// 				params: {
	// 					output: ["subject"],
	// 					hostids: hostid,
	// 				},
	// 				auth: JSON.parse(localStorage.getItem("token")),
	// 				id: 1,
	// 			}
	// 		);
	// 		setAlertdata(alertData.data.result); //Lưu dữ liệu mảng Item
	// 		console.log("456", alertData.data.result);
	// 	} else {
	// 		setAlertdata([]);
	// 	}
	// }, [hostid]);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickAway = () => {
		setNum(0);
	};

	const handleClick = () => {
		setNum(num + 1);
	};
	if (num === 9) {
		setNum(0);
	}
	console.log(num);
	return (
		<div>
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
				{options.map((option, index) => (
					<MenuItem
						key={option}
						// disabled={index === 0}
						// selected={index === selectedIndex}
						onClick={() => setNum(index + 1)}
						// onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option}
					</MenuItem>
				))}
			</StyledMenu>
		</div>
	);
}

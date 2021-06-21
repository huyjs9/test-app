/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
	Badge,
	Box,
	IconButton,
	Divider,
	Button,
	Link,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Menu,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	AppBar,
	Toolbar,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import AlertTable from "./AlertTable";
import axios from "axios";
import { StyledNotifyButtonContainer } from "../styles/Dashboard.styled";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
		// maxWidth: "400px",
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

export default function Notifications(props) {
	const classes = useStyles();
	const { alertdata, ipUrl, hostid, setAlertdata, host } = props;
	const [num, setNum] = useState(0); //Setup for Badge
	const [anchorEl, setAnchorEl] = React.useState(null); //Setup for Alert material
	// const [options, setOptions] = useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const [currentindex, setCurrentIndex] = useState(null); //Lấy index của mảng in
	const [open, setOpen] = React.useState(false);
	const [openfscreen, setOpenFscreen] = React.useState(false);
	const fakeData = alertdata; //Nhận dữ liệu mảng Item đã lưu để mapping

	/*Xử lý phần subject*/
	const test = alertdata;
	const data = host;
	let hostgroup = [];
	for (let i = 0; i < data.length; i++) {
		hostgroup.push(data[i].hostid);
		// let obj = [...arrayhostbit];
		// arrayhost.push(obj);
	}

	//--------------------------------------//
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

	//--------------------------------//

	//Xử lý subject hiển thị lên chuông
	let sixnews = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 6; i--) {
			sixnews.push(test[i].subject);
		}
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			sixnews.push(test[i].subject);
		}
	}

	//Handle cho phần message
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

			// sixmessages.push(test[i].message.split("|"));
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

	//Phần này test cho phần hiển thị history trước mắt 10 cái
	let allhistory = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 10; i--) {
			let obj = {};
			let a = test[i].message.split("|");
			obj["name"] = a[0];
			obj["time"] = a[1];
			obj["status"] = a[2];
			obj["severity"] = a[3];
			obj["graphic"] = a[4];
			allhistory.push(obj);

			// sixmessages.push(test[i].message.split("|"));
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
			allhistory.push(obj);
		}
	}

	//Handle sắp xếp lại message

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

	/*Handle bật mở Dialog */
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
		setCurrentIndex(null);
	};

	/*Handle bật Dialog Full-screen */
	const handleClickOpenFullScreen = () => {
		setOpenFscreen(true);
	};

	const handleCloseFullScreen = () => {
		setOpenFscreen(false);
	};
	console.log(currentindex);
	return (
		<div>
			<StyledNotifyButtonContainer>
				<IconButton color="inherit" onClick={handleClickListItem}>
					<Badge badgeContent={num} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				{sixnews.length > 0 ? (
					<StyledMenu
						id="lock-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{sixnews.map((item, index) => (
							<MenuItem
								key={index}
								// disabled={index === 0}
								// selected={index === selectedIndex}
								onClick={() => {
									setCurrentIndex(index);
									handleClickOpen();
									handleClose();
								}}
								// onClick={(event) => handleMenuItemClick(event, index)}
							>
								<div
									style={{ width: 500, whiteSpace: "nowrap" }}
								>
									<Box
										component="div"
										textOverflow="ellipsis"
										overflow="hidden"
									>
										{item}
									</Box>
								</div>
							</MenuItem>
						))}
						<Divider />
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="center"
							style={{ paddingTop: "8px" }}
							color="primary.main"
							fontWeight="fontWeightMedium"
							fontSize={14}
							letterSpacing={1}
						>
							<Link
								onClick={() => {
									handleClickOpenFullScreen();
									handleClose();
								}}
							>
								View All history!
							</Link>
						</Box>
					</StyledMenu>
				) : (
					<StyledMenu
						id="lock-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="center"
							style={{ padding: "8px" }}
							fontSize={14}
							letterSpacing={1}
						>
							There is no notifications!
						</Box>
					</StyledMenu>
				)}
			</StyledNotifyButtonContainer>

			{/*Dialog*/}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					handleClickClose();
				}}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{currentindex != null && sixmessages.length > 0 && (
					<DialogTitle id="alert-dialog-slide-title">
						{sixmessages[currentindex].status.includes(
							"PROBLEM"
						) === true ? (
							<Alert variant="outlined" severity="error">
								<AlertTitle style={{ padding: "none" }}>
									<Box fontSize={20}>Problem Detail</Box>
								</AlertTitle>
							</Alert>
						) : (
							<Alert variant="outlined" severity="success">
								<AlertTitle style={{ padding: "none" }}>
									<Box fontSize={20}>Problem Detail</Box>
								</AlertTitle>
							</Alert>
						)}
					</DialogTitle>
				)}
				{/* <DialogTitle id="alert-dialog-slide-title">
					{"Problem Detail"}
				</DialogTitle> */}
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{currentindex != null && sixmessages.length > 0 && (
							<Box>
								<Box>{sixmessages[currentindex].name}</Box>
								<Box>{sixmessages[currentindex].time}</Box>
								<Box>
									<Box
										display="inline-block"
										fontWeight="fontWeightMedium"
									>
										Status:
									</Box>
									<Box display="inline-block">
										{sixmessages[
											currentindex
										].status.replace("Status:", "")}
									</Box>
								</Box>
								<Box>
									<Box
										display="inline-block"
										fontWeight="fontWeightMedium"
									>
										Severity:
									</Box>
									<Box display="inline-block">
										{sixmessages[
											currentindex
										].severity.replace("Severity:", "")}
									</Box>
								</Box>

								<Box>{sixmessages[currentindex].graphic}</Box>
							</Box>
						)}

						{/* {sixmessages.length > 0 &&
							sixmessages.map((item, index) => (
								<Box key={index}>
									<Box>{sixmessages[0].time}</Box>
								</Box>
							))} */}

						{/* {arr.map((item, index) => (
							<Box>
								<Box>{item[currentindex]}</Box>
							</Box>
						))} */}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							handleClickClose();
						}}
						color="primary"
						style={{ outline: "none" }}
					>
						AGREE
					</Button>
				</DialogActions>
			</Dialog>

			{/*Full-screen */}
			<Dialog
				fullScreen
				open={openfscreen}
				onClose={handleCloseFullScreen}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleCloseFullScreen}
							aria-label="close"
							style={{ outline: "none" }}
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							History
						</Typography>
					</Toolbar>
				</AppBar>
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
						{allhistory.length > 0 &&
							allhistory.map((item, index) => (
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
										{item.graphic.replace(
											"Item Graphic:",
											""
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Dialog>
		</div>
	);
}

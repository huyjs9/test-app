/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TimelineIcon from "@material-ui/icons/Timeline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Router, Link } from "@reach/router";
import {
	Button,
	Dialog,
	ListItemText,
	ListItem,
	ListItemIcon,
	List,
	Divider,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
} from "@material-ui/core";
import axios from "axios";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="right" ref={ref} {...props} />;
});

export default function MainListItems(props) {
	const classes = useStyles();
	const [chartx, setChartx] = useState([]);
	const [ops, setOps] = useState();
	const { openacc, setSelect, select, hostid, ipUrl, host } = props;
	const [open, setOpen] = React.useState(false);
	const [used, setUsed] = useState(null);
	const [free, setFree] = useState(null);
	const [total, setTotal] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const data = host;
	let hostgroup = [];
	for (let i = 0; i < data.length; i++) {
		hostgroup.push(data[i].hostid);
	}
	console.log("host", host);
	useEffect(async () => {
		const chartData = await axios.post(
			`http://${ipUrl}/zabbix/api_jsonrpc.php`,
			{
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: [
						"itemid",
						"hostid",
						"name",
						"description",
						"lastvalue",
						"units",
					],
					hostids: hostgroup,
					search: {
						name: "memory",
					},
					sortfield: "name",
				},
				auth: JSON.parse(localStorage.getItem("token")),
				id: 1,
			}
		);
		setChartx(chartData.data.result); //Lưu dữ liệu mảng Chart
	}, []);
	console.log("chart", chartx);

	let arrtest = [];
	for (let i = 0; i < data.length; i++) {
		for (let y = 0; y < chartx.length; y++) {
			let objtest = {};
			if (
				chartx[y].hostid.includes(data[i].hostid) &&
				chartx[y].name.includes("Available memory in %")
			) {
				objtest["name"] = data[i].name;
				objtest["lable"] = chartx[y].name;
				objtest["value"] = chartx[y].lastvalue;
				objtest["units"] = chartx[y].units;
				arrtest.push(objtest);
			}
			if (
				chartx[y].hostid.includes(data[i].hostid) &&
				chartx[y].name.includes("Free memory")
			) {
				objtest["name"] = data[i].name;
				objtest["lable"] = chartx[y].name;
				objtest["value"] = chartx[y].lastvalue;
				objtest["units"] = chartx[y].units;
				arrtest.push(objtest);
			}
			if (
				chartx[y].hostid.includes(data[i].hostid) &&
				chartx[y].name.includes("Total memory")
			) {
				objtest["name"] = data[i].name;
				objtest["lable"] = chartx[y].name;
				objtest["value"] = chartx[y].lastvalue;
				objtest["units"] = chartx[y].units;
				arrtest.push(objtest);
			}
			if (
				chartx[y].hostid.includes(data[i].hostid) &&
				chartx[y].name.includes("Used memory")
			) {
				objtest["name"] = data[i].name;
				objtest["lable"] = chartx[y].name;
				objtest["value"] = chartx[y].lastvalue;
				objtest["units"] = chartx[y].units;
				arrtest.push(objtest);
			}
		}
	}
	console.log("dung me no roi", arrtest);
	let arr = [];

	for (let i = 0; i < chartx.length; i++) {
		let obj = {};
		if (
			chartx[i].name.includes("Physical") &&
			chartx[i].name.includes("Used memory")
		) {
			obj["value"] = chartx[i].lastvalue;
			obj["lable"] = "Used memory";
			arr.push(obj);
		}
		if (
			chartx[i].name.includes("Physical") &&
			chartx[i].name.includes("Total memory")
		) {
			obj["value"] = chartx[i].lastvalue;
			obj["lable"] = "Total memory";
			arr.push(obj);
		}
	}
	console.log("nhieu", arr);

	let series = [];
	if (chartx.length > 0) {
		console.log("co");
		series.push(
			parseInt(parseFloat((arr[1].value / arr[0].value) * 100).toFixed(1))
		);
		series.push(
			parseInt(
				parseFloat(
					((arr[0].value - arr[1].value) / arr[0].value) * 100
				).toFixed(1)
			)
		);
	} else {
		series = [];
		console.log("khong");
	}
	console.log("du lieu ne", series);

	return (
		<div className={classes.root}>
			<Link
				to="dashboard"
				style={{ textDecoration: "none", color: "#000" }}
				// onClick={handleClick}
			>
				<ListItem button component="nav">
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>
			{/* <Link
				to="graph"
				style={{ textDecoration: "none", color: "#000" }}
				onClick={handleClick2}
			> */}
			{!openacc && (
				<ListItem button component="nav" onClick={handleClickOpen}>
					<ListItemIcon>
						<TimelineIcon />
					</ListItemIcon>
					<ListItemText primary="Graph" />
				</ListItem>
			)}
			{/* </Link> */}
			{/* <Link
				to="account"
				style={{ textDecoration: "none", color: "#000" }}
			>
				<ListItem button component="nav">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Account" />
				</ListItem>
			</Link> */}
			{openacc && (
				<Link to="/" style={{ textDecoration: "none", color: "#000" }}>
					<ListItem button component="nav">
						<ListItemIcon>
							<LockOpenIcon />
						</ListItemIcon>
						<ListItemText primary="Login/Register" />
					</ListItem>
				</Link>
			)}
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ outline: "none" }}
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Graph
						</Typography>
					</Toolbar>
				</AppBar>
				<Chart series={series} />
				{/* <List>
					<ListItem button>
						<ListItemText
							primary="Phone ringtone"
							secondary="Titania"
						/>
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText
							primary="Default notification ringtone"
							secondary="Tethys"
						/>
					</ListItem>
				</List> */}
			</Dialog>
		</div>
	);
}

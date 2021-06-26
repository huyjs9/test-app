/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
	CssBaseline,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Container,
	Grid,
	Box,
	ListItem,
	ListItemIcon,
	Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuAccount from "./MenuAccount";
import MainListItems from "./MainListItems";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Display from "./Display";
import Protected from "./Protected";
import Chart from "./Chart";
import Notifications from "./Notifications";
import { Router } from "@reach/router";
import firebase from "../firebase";
import { StyledNotifyButtonContainer } from "../styles/Dashboard.styled";
import { Link, navigate } from "@reach/router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		// height: "120vh",
		// overflow: "auto",
	},
	container: {
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},

	fixedHeight: {
		height: 240,
	},

	chartHeight: {
		height: 300,
		padding: theme.spacing(1),
		paddingBottom: theme.spacing(9),
	},
}));

export default function Dashboard() {
	const classes = useStyles();
	const [alertdata, setAlertdata] = useState([]); //Truyền Alert để lưu dữ liệu Alert
	const [ipUrl, setIpUrl] = useState(""); //ipUrl truyền cho TextFeild rồi truyền cho Button để post
	const [hostid, setHostid] = useState(null); //State để lưu hostid
	const [host, setHost] = useState([]); //Truyền cho Button để lưu dữ liệu Host
	const [open, setOpen] = useState(true);
	const [openacc, setOpenacc] = useState(true);
	const [select, setSelect] = useState(0);

	const handleExit = () => {
		navigate("/", { replace: true });
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const fixedHeightPaper = clsx(classes.container, classes.appBarSpacer);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
						style={{ outline: "none" }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Dashboard
					</Typography>
					<Notifications
						alertdata={alertdata}
						setAlertdata={setAlertdata}
						ipUrl={ipUrl}
						hostid={hostid}
						host={host}
					/>
					<MenuAccount openacc={openacc} setOpenacc={setOpenacc} />
					{/* <IconButton
						color="inherit"
						type="submit"
						variant="contained"
						onClick={() => {
							logout();
							setTimeout(() => {
								handleExit();
							}, 1000);
						}}
						style={{ outline: "none" }}
					>
						<ExitToAppIcon />
					</IconButton> */}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton
						onClick={handleDrawerClose}
						style={{ outline: "none" }}
					>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<MainListItems
						openacc={openacc}
						select={select}
						setSelect={setSelect}
						hostid={hostid}
						ipUrl={ipUrl}
						host={host}
					/>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div />
				<Container maxWidth="lg" className={classes.container}>
					<Grid
						container
						spacing={1}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{!openacc ? (
							<Router style={{ width: "100%" }}>
								<Display
									alertdata={alertdata}
									setAlertdata={setAlertdata}
									ipUrl={ipUrl}
									setIpUrl={setIpUrl}
									hostid={hostid}
									setHostid={setHostid}
									host={host}
									setHost={setHost}
									path="dashboard"
								/>
							</Router>
						) : (
							<Router>
								<Protected path="dashboard" />
							</Router>
						)}
						{/* {!openacc ? (
							<Router
								style={{
									width: "100%",
									paddingTop: "100px",
								}}
							>
								<Chart
									hostid={hostid}
									ipUrl={ipUrl}
									select={select}
									path="graph"
								/>
							</Router>
						) : (
							<Router>
								<Protected path="graph" />
							</Router>
						)} */}

						<Router style={{ width: "100%", paddingTop: "50px" }}>
							<Register path="register" />
							<Login path="/" setOpenacc={setOpenacc} />
							{/* <Account path="account" /> */}
						</Router>
					</Grid>
				</Container>
				<div />
				<Container maxWidth="lg" className={classes.container}>
					<Grid
						container
						spacing={1}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					></Grid>
				</Container>
				{/* <Container maxWidth="lg" className={fixedHeightPaper}>
					<Grid
						container
						spacing={1}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Router>
							<Login path="/" />
							<Account path="account" />
						</Router>
					</Grid>
				</Container> */}
			</main>
		</div>
	);
}

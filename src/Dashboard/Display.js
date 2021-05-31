import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import {
	MDBCard,
	MDBCardBody,
	MDBIcon,
	MDBRow,
	MDBCol,
	MDBCardText,
} from "mdbreact";
import "../styles/cardsession.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useState } from "react";
import Button from "./Button";
import Deposits from "./Deposits";
import Devices from "./Devices";
import Interface from "./Interface";
import TableDevice from "./TableDevice";
import TextField from "./TextField";
import Alert from "./Alert";
import CardSession from "./CardSession";
import { maxHeight } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		paddingTop: theme.spacing(1),
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
	},
	cardHeaderRoot: {
		backgroundColor: theme.palette.warning.light,
	},
	cardHeaderRootDevice: {
		backgroundColor: theme.palette.success.light,
	},
	cardHeaderRootItem: {
		backgroundColor: theme.palette.error.light,
	},

	textColor: {
		color: "primary",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		maxWidth: "100%",
		maxHeight: "300px",
		flexDirection: "column",
	},
	paperdevice: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		overflow: "auto",
	},
	fixedHeightDevices: {
		height: 300,
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 150,
	},
}));

export default function Display() {
	const classes = useStyles();
	const [ipUrl, setIpUrl] = useState(""); //ipUrl truyền cho TextFeild rồi truyền cho Button để post
	const [publicValue, setPublicValue] = useState(null); //Truyền cho Select
	const [Pushit, setPushit] = useState(true); //Thay đổi việc nhấn nút Button
	const [host, setHost] = useState([]); //Truyền cho Button để lưu dữ liệu Host
	const [itemdata, setItemdata] = useState([]); //Truyền Button để lưu dữ liệu Item
	const [alertdata, setAlertdata] = useState([]); //Truyền Alert để lưu dữ liệu Alert
	const [currentHostIndex, setCurrentHostIndex] = useState(null); //Truyền cho Deposits để map id trong mảng của Host
	const [hostid, setHostid] = useState(null); //State để lưu hostid
	const [Pushit1, setPushit1] = useState(true); //Thay đổi việc nhấn nút Button

	const handlePush = () => {
		setPushit(!Pushit); //Truyền cho Button để thực hiện nhấn nút
		console.log(Pushit);
	};
	const handlePush1 = () => {
		setPushit1(!Pushit1); //Truyền cho Button để thực hiện nhấn nút
		console.log(Pushit1);
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={2}>
						{/* Get Information */}
						<Grid item xs={12} md={4} lg={4}>
							<MDBCard
								className="cascading-admin-card"
								style={{ height: "230px" }}
							>
								<div className="admin-up">
									<MDBIcon
										icon="info"
										className="primary-color"
									/>
									<div className="data">
										<h5>
											<strong>INPUT INFORMATION</strong>
										</h5>
									</div>
								</div>
								<MDBCardBody>
									<TextField
										ipUrl={ipUrl}
										setIpUrl={setIpUrl}
									/>
									<Button
										setPushit={handlePush}
										ipUrl={ipUrl}
										currentHostIndex={currentHostIndex}
										setHost={setHost}
									/>
								</MDBCardBody>
							</MDBCard>
							{/* <Paper className={fixedHeightPaper}>
								<TextField ipUrl={ipUrl} setIpUrl={setIpUrl} />

								<Button
									setPushit={handlePush}
									ipUrl={ipUrl}
									currentHostIndex={currentHostIndex}
									setHost={setHost}
								/>
							</Paper> */}
						</Grid>
						{/* Display */}
						<Grid item xs={12} md={4} lg={8}>
							<MDBCard
								className="cascading-admin-card"
								style={{ height: "230px" }}
							>
								<div className="admin-up">
									<MDBIcon
										icon="database"
										className="warning-color"
									/>
									<div className="data">
										<h5>
											<strong>DEVICES INFORMATION</strong>
										</h5>
									</div>
								</div>
								<MDBCardBody>
									{/* Nho sua lai */}
									{Pushit === false && (
										<Deposits
											host={host}
											hostid={hostid}
											setHostid={setHostid}
											ipUrl={ipUrl}
											setCurrentHostIndex={
												setCurrentHostIndex
											}
											currentHostIndex={currentHostIndex}
											setItemdata={setItemdata}
										/>
									)}
								</MDBCardBody>
							</MDBCard>
						</Grid>
						<Grid item xs={12}>
							<MDBCard
								className="cascading-admin-card"
								style={{ height: "320px", paddingTop: "10px" }}
							>
								<div className="admin-up">
									<div className="data">
										<h5>
											<strong>ITEM LIST</strong>
										</h5>
									</div>
								</div>
								<MDBCardBody style={{ overflow: "auto" }}>
									{hostid && ipUrl && (
										<Devices
											itemdata={itemdata}
											ipUrl={ipUrl}
											hostid={hostid}
											setItemdata={setItemdata}
										/>
									)}
								</MDBCardBody>
							</MDBCard>
							{/* <Paper className={classes.paper}>
								{hostid && ipUrl && (
									<Devices
										itemdata={itemdata}
										ipUrl={ipUrl}
										hostid={hostid}
										setItemdata={setItemdata}
									/>
								)}
							</Paper> */}
						</Grid>
						{/* Devices */}
						<Grid item xs={6}>
							<Card>
								<TableDevice itemdata={itemdata} />
							</Card>
						</Grid>
						<Grid item xs={6}>
							<Card>
								<Card>
									<Alert
										alertdata={alertdata}
										ipUrl={ipUrl}
										hostid={hostid}
										setAlertdata={setAlertdata}
									/>
								</Card>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}

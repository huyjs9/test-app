import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Paper,
	Typography,
	IconButton,
	Divider,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {
	MDBCard,
	MDBCardBody,
	MDBIcon,
	MDBRow,
	MDBCol,
	MDBCardText,
} from "mdbreact";
import "../styles/cardsession.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useState } from "react";
import Button from "./Button";
import Deposits from "./Deposits";
import Devices from "./Devices";
import TableDevice from "./TableDevice";
import TextField from "./TextField";
import Alert from "./Alert";
import Search from "./Search";

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
	divider: {
		// Theme Color, or use css color in quote
		background: theme.palette.text.primary,
	},
}));
const StyledBox = withStyles({
	root: {
		background: "linear-gradient(45deg, #FE88A2 30%, #FFA475 90%)",
		// borderRadius: 3,
		border: 0,
		color: "white",
		// height: 48,
		// padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
	},
	label: {
		textTransform: "capitalize",
	},
})(Box);
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
	const [searched, setSearched] = useState(""); //Truyền cho Search để search table
	const [rows, setRows] = useState(itemdata);

	const handlePush = () => {
		setPushit(false); //Truyền cho Button để thực hiện nhấn nút
		console.log(Pushit);
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
									<div
										className="data"
										style={{ paddingTop: "10px" }}
									>
										<h5>
											<strong>INPUT INFORMATION</strong>
										</h5>
										<Divider
											variant="inset"
											classes={{ root: classes.divider }}
										/>
									</div>
								</div>

								<MDBCardBody>
									<Box>
										<Box
											justifyContent="center"
											display="flex"
										>
											<TextField
												ipUrl={ipUrl}
												setIpUrl={setIpUrl}
											/>
										</Box>
										<Box
											justifyContent="center"
											display="flex"
										>
											<Button
												setPushit={handlePush}
												ipUrl={ipUrl}
												currentHostIndex={
													currentHostIndex
												}
												setHost={setHost}
											/>
										</Box>
									</Box>
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
									<div
										className="data"
										style={{ paddingTop: "10px" }}
									>
										<h5>
											<strong>DEVICES INFORMATION</strong>
										</h5>
										<Divider
											variant="inset"
											classes={{ root: classes.divider }}
										/>
									</div>
								</div>
								<MDBCardBody>
									{/* Nho sua lai */}
									{Pushit === false && ipUrl && (
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
								style={{ height: "420px" }}
							>
								<StyledBox bgcolor="text.secondary">
									{" "}
									<div className="admin-up">
										<div className="data">
											<Box>
												<h5>
													<strong
														style={{
															color: "white",
														}}
													>
														ITEM LIST
													</strong>
												</h5>
											</Box>
										</div>
									</div>
								</StyledBox>
								<StyledBox>
									{" "}
									<Box
										style={{
											paddingLeft: "20px",
											paddingBottom: "10px",
										}}
										display="inline-block"
									>
										<Search
											itemdata={itemdata}
											searched={searched}
											setSearched={setSearched}
											setRows={setRows}
										/>
									</Box>
									<Box display="inline-block">
										<IconButton
											aria-label="delete"
											component="span"
											// onClick={() => (
											// 	<Devices
											// 		itemdata={itemdata}
											// 		ipUrl={ipUrl}
											// 		hostid={hostid}
											// 		setItemdata={setItemdata}
											// 	/>
											// )}
										>
											<RefreshIcon fontSize="large" />
										</IconButton>
									</Box>
								</StyledBox>

								<MDBCardBody style={{ overflow: "auto" }}>
									<Devices
										itemdata={rows}
										ipUrl={ipUrl}
										hostid={hostid}
										setItemdata={setItemdata}
									/>
									{/* {hostid && ipUrl && (
										<Devices
											itemdata={itemdata}
											ipUrl={ipUrl}
											hostid={hostid}
											setItemdata={setItemdata}
										/>
									)} */}
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

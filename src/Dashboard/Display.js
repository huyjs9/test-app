/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import "../styles/hidescroll.css";
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
	Hidden,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import "../styles/cardsession.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Hosts from "./Hosts";
import Items from "./Items";
import TableInterface from "./TableInterface";
import TextField from "./TextField";
import AlertTable from "./AlertTable";
import Search from "./Search";
import axios from "axios";

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
		maxHeight: "420px",
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
		height: 420,
	},
	divider: {
		// Theme Color, or use css color in quote
		background: theme.palette.text.primary,
	},
}));
const StyledBox = withStyles({
	root: {
		// background: "linear-gradient(45deg, #FE88A2 30%, #FFA475 90%)",
		// borderRadius: 3,
		border: 0,
		color: "black",
		// height: 48,
		// padding: "0 30px",
	},
	label: {
		textTransform: "capitalize",
	},
})(Box);
export default function Display(props) {
	const classes = useStyles();
	const {
		alertdata,
		setAlertdata,
		ipUrl,
		setIpUrl,
		hostid,
		setHostid,
		host,
		setHost,
	} = props;
	// const [ipUrl, setIpUrl] = useState(""); //ipUrl truyền cho TextFeild rồi truyền cho Button để post
	const [publicValue, setPublicValue] = useState(null); //Truyền cho Select
	const [Pushit, setPushit] = useState(true); //Thay đổi việc nhấn nút Button
	// const [host, setHost] = useState([]); //Truyền cho Button để lưu dữ liệu Host
	const [itemdata, setItemdata] = useState([]); //Truyền Button để lưu dữ liệu Item
	// const [alertdata, setAlertdata] = useState([]); //Truyền Alert để lưu dữ liệu Alert
	const [currentHostIndex, setCurrentHostIndex] = useState(null); //Truyền cho Host để map id trong mảng của Host
	// const [hostid, setHostid] = useState(null); //State để lưu hostid
	const [Pushit1, setPushit1] = useState(true); //Thay đổi việc nhấn nút Button
	const [searched, setSearched] = useState(""); //Truyền cho Search để search table
	const [rows, setRows] = useState(itemdata);
	const [prevHost, setprevHost] = useState([]);
	const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	const handlePush = () => {
		setPushit(false); //Truyền cho Button để thực hiện nhấn nút
		console.log(Pushit);
	};

	//Đây là bản test
	useEffect(async () => {
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
			setRows(itemData.data.result);
			console.log("123", itemData.data.result);
		} else {
			setItemdata([]);
		}
	}, [hostid]);

	//Đây là bản Chính thức
	// useEffect(() => {
	// 	async function AutoItem() {
	// 		if (hostid) {
	// 			const itemData = await axios.post(
	// 				`http://${ipUrl}/zabbix/api_jsonrpc.php`,
	// 				{
	// 					jsonrpc: "2.0",
	// 					method: "item.get",
	// 					params: {
	// 						output: [
	// 							"itemid",
	// 							"name",
	// 							"description",
	// 							"lastvalue",
	// 							"units",
	// 						],
	// 						hostids: hostid,
	// 						search: {
	// 							name: "",
	// 						},
	// 						sortfield: "name",
	// 					},
	// 					auth: JSON.parse(localStorage.getItem("token")),
	// 					id: 1,
	// 				}
	// 			);
	// 			setItemdata(itemData.data.result); //Lưu dữ liệu mảng Item
	// 			setRows(itemData.data.result);
	// 			console.log("123", itemData.data.result);
	// 		} else {
	// 			setItemdata([]);
	// 		}
	// 	}
	// 	AutoItem();
	// 	const timeInterval = setInterval(AutoItem, 30000);
	// 	return () => {
	// 		clearInterval(timeInterval);
	// 	};
	// }, [hostid]);

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={1} className="example">
						{/* Get Information */}

						<Grid item xs={12} md={4} lg={4}>
							{" "}
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
											classes={{
												root: classes.divider,
											}}
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
											classes={{
												root: classes.divider,
											}}
										/>
									</div>
								</div>
								<MDBCardBody style={{ overflow: "auto" }}>
									{/* Thay Pushit bằng host */}
									{host && ipUrl && (
										<Hosts
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
							{/* <MDBCard className="cascading-admin-card">
								<Box
									style={{
										paddingTop: "20px",
										paddingBottom: "20px",
									}}
									display="flex"
								>
									<Box
										style={{
											paddingLeft: "20px",
										}}
										display="inline-block"
										flexWrap="wrap"
										flexGrow={1}
									>
										<Search
											itemdata={itemdata}
											searched={searched}
											setSearched={setSearched}
											setRows={setRows}
										/>
									</Box>
									<Box
										style={{ paddingRight: "20px" }}
										display="inline-block"
										flexWrap="wrap"
										fontSize="h6.fontSize"
										fontWeight="fontWeightBold"
									>
										ITEM LIST
									</Box>
								</Box>
							</MDBCard> */}

							<Box
								style={{
									paddingTop: "10px",
									paddingBottom: "10px",
								}}
								display="flex"
							>
								<Box display="inline-block" flexGrow={1}>
									<Search
										itemdata={itemdata}
										searched={searched}
										setSearched={setSearched}
										setRows={setRows}
									/>
								</Box>
								<Box
									style={{ paddingRight: "20px" }}
									display="inline-block"
									flexWrap="wrap"
									fontSize="h6.fontSize"
									fontWeight="fontWeightBold"
								>
									ITEMS LIST
								</Box>
							</Box>

							<MDBCard className={classes.paper}>
								<Items
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
							</MDBCard>
						</Grid>

						{/* Devices */}
						<Grid item xs={12}>
							{" "}
							<Box
								style={{
									paddingTop: "10px",
									paddingBottom: "10px",
									paddingRight: "20px",
								}}
								display="flex"
								flexWrap="wrap"
								fontSize="h6.fontSize"
								fontWeight="fontWeightBold"
								justifyContent="flex-end"
							>
								INTERFACES LIST
							</Box>
							<MDBCard className={classes.paper}>
								<TableInterface itemdata={itemdata} />
							</MDBCard>
						</Grid>
						{/* <Grid item xs={12}>
							<Card>
								<Card>
									<AlertTable
										host={host}
										alertdata={alertdata}
										ipUrl={ipUrl}
										hostid={hostid}
										setAlertdata={setAlertdata}
									/>
								</Card>
							</Card>
						</Grid> */}
					</Grid>
				</Container>
			</main>
		</div>
	);
}

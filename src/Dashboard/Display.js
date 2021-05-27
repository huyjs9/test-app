import React, { useEffect, useState } from "react";
import Table from "./Table";
import TextField from "./TextField";
import Select from "./Select";
import Button from "./Button";
import Deposits from "./Deposits";
import Devices from "./Devices";
import clsx from "clsx";
import { Grid, Paper, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeightDevices: {
		height: 300,
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function Display() {
	const classes = useStyles();
	const [ipUrl, setIpUrl] = useState(""); //ipUrl truyền cho TextFeild rồi truyền cho Button để post
	const [publicValue, setPublicValue] = useState(null); //Truyền cho Select
	const [Pushit, setPushit] = useState(true); //Thay đổi việc nhấn nút Button
	const [host, setHost] = useState([]); //Truyền cho Button để lưu dữ liệu Host
	const [itemdata, setItemdata] = useState([]); //Truyền Button để lưu dữ liệu Item
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
	const fixedHeightBelow = clsx(classes.paper, classes.fixedHeightDevices);

	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="100%" className={classes.container}>
					<Grid container spacing={1}>
						{/* Get Information */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<TextField ipUrl={ipUrl} setIpUrl={setIpUrl} />
								<Select
									value={publicValue}
									setValue={setPublicValue}
									host={host}
								/>
								<Button
									setPushit={handlePush}
									ipUrl={ipUrl}
									currentHostIndex={currentHostIndex}
									setHost={setHost}
								/>
							</Paper>
						</Grid>
						{/* Display */}
						<Grid item xs={12} md={4} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Typography
									component="h2"
									variant="h6"
									color="primary"
									gutterBottom
								>
									{" "}
									Device Information
								</Typography>
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
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								{hostid && ipUrl && (
									<Devices
										itemdata={itemdata}
										ipUrl={ipUrl}
										hostid={hostid}
										setItemdata={setItemdata}
									/>
								)}
							</Paper>
						</Grid>
						{/* Devices */}
						<Grid item xs={12}>
							<Paper className={fixedHeightBelow}>
								<Table />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}

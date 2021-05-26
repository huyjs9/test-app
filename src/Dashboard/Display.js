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
	const [ipUrl, setIpUrl] = useState("");
	const [publicValue, setPublicValue] = useState(null);
	const [Pushit, setPushit] = useState(true);
	const [host, setHost] = useState([]);
	const [itemdata, setItemdata] = useState([]);
	const [currentHostIndex, setCurrentHostIndex] = useState(null);
	const [iid, setIid] = useState([]);

	const handlePush = () => {
		setPushit(!Pushit);
		console.log(Pushit);
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
									setItemdata={setItemdata}
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
										currentHostIndex={currentHostIndex}
										setCurrentHostIndex={
											setCurrentHostIndex
										}
									/>
								)}
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								{Pushit === false && (
									<Devices
										itemdata={itemdata}
										iid={iid}
										setIid={setIid}
										ipUrl={ipUrl}
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

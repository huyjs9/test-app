import "./App.css";
import "./styles.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Post from "./Post";
import Dashboard from "./Dashboard/Dashboard";
import localIpUrl from "local-ip-url";
import TextField from "./Dashboard/TextField";
import Button from "./Dashboard/Button";
import Deposits from "./Dashboard/Deposits";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Account from "./Page/Account";
import MainListItems from "./Dashboard/MainListItems";
import { Drawer, Divider, List, CircularProgress } from "@material-ui/core";
import { Router, Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Display from "./Dashboard/Display";
import { textAlign } from "@material-ui/system";
import Graph from "./Dashboard/Graph";

const useStyles = makeStyles((theme) => ({
	paper: {
		height: 10,
		marginTop: theme.spacing(15),
		paddingLeft: theme.spacing(20),
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(20),
	},
}));
function App() {
	const classes = useStyles();
	const [display, setDisplay] = useState(true);
	const [firebaseInitialized, setFirebaseInitialized] = useState(false);
	const [value, setValue] = useState();
	const handleDisplay = () => {
		setDisplay(!display);
	};
	useEffect(() => {
		firebase.isInitialized().then((val) => {
			setFirebaseInitialized(val);
		});
	});

	return firebaseInitialized !== false ? (
		<div>
			<Dashboard></Dashboard>
			<Display></Display>
			<p className="App">
				{/* <TextField></TextField>
				<Button data={handleDisplay} ip={aa}></Button>
				<Deposits></Deposits> */}
				{/* {display === false && <p className="App">url: {data}</p>} */}
			</p>
		</div>
	) : (
		<div id="loader">
			<CircularProgress />
		</div>
	);
}

export default App;

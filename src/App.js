import "./App.css";
import React, { useState } from "react";
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
import { Drawer, Divider, List } from "@material-ui/core";
import { Router, Link } from "@reach/router";
import Display from "./Dashboard/Display";

function App() {
	const [display, setDisplay] = useState(true);
	const [value, setValue] = useState();
	const handleDisplay = () => {
		setDisplay(!display);
	};

	return (
		<div>
			<Dashboard></Dashboard>
			<p className="App">
				{/* <TextField></TextField>
				<Button data={handleDisplay} ip={aa}></Button>
				<Deposits></Deposits> */}
				{/* {display === false && <p className="App">url: {data}</p>} */}
				IP: {localIpUrl("public", "ipv4")}
			</p>
		</div>
	);
}

export default App;

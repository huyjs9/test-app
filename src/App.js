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
import MainListItems from "./Dashboard/MainListItems";
import { Drawer, Divider, List } from "@material-ui/core";
import { Router, Link } from "@reach/router";

function App() {
	let data = localStorage.getItem("urlhost");
	const [display, setDisplay] = useState(true);
	const [value, setValue] = useState();
	const handleDisplay = () => {
		setDisplay(!display);
	};
	const aa = JSON.stringify(localStorage.getItem("urlhost"));

	return (
		<div>
			<p className="App">
				<MainListItems></MainListItems>
				<Router>
					<Deposits path="/" />
					<Login path="graph" />
				</Router>
				{/* <TextField></TextField>
				<Button data={handleDisplay} ip={aa}></Button>
				<Deposits></Deposits> */}
				{display === false && <p className="App">url: {data}</p>}
				IP: {localIpUrl("public", "ipv4")}
			</p>
		</div>
	);
}

export default App;

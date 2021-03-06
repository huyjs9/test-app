import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(0.5),
			width: 280,
		},
	},
}));

export default function FormPropsTextFields(props) {
	const classes = useStyles();
	const { ipUrl, setIpUrl } = props;
	const { currentHostIndex, setPushit, setHost, setItemdata } = props;
	// const [name, setName] = useState(``);

	const handleChange = (event) => {
		// setName(event.target.value);
		setIpUrl(event.target.value);
	};
	const handleSubmit = (event) => {
		// alert('"' + name + '"');
		// localStorage.setItem("urlhost", name);
		event.preventDefault();
	};

	return (
		<div className={classes.root}>
			<TextField
				className={classes.root}
				required
				id="standard-required"
				label="IP Address"
				variant="outlined"
				value={ipUrl}
				onChange={handleChange}
				noValidate
				// onChange={handleChange}
			/>
		</div>
	);
}

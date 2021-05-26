import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(0.5),
			width: 200,
		},
	},
}));

export default function FormPropsTextFields(props) {
	const classes = useStyles();
	const { ipUrl, setIpUrl } = props;
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
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<div>
				<TextField
					required
					id="standard-required"
					label="IP Address"
					variant="outlined"
					value={ipUrl}
					onChange={handleChange}
					// onChange={handleChange}
				/>
			</div>
			{/* <div>Ip is: {name}</div> */}
		</form>
	);
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0.5),
		minWidth: 200,
		marginTop: theme.spacing(2),
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
	},
}));

export default function SimpleSelect(props) {
	const classes = useStyles();
	// const [a, setValue] = React.useState('');
	const { value, setValue, host } = props;
	const fakeData1 = host;

	const handleChange = (event) => {
		setValue(event.target.value);
		// props.changed(event.target.value);
	};

	return (
		<div>
			{/* {fakeData1.map((host) => (
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">
						Read Community
					</InputLabel>
					<Select
						key={host.hostid}
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={value}
						onChange={handleChange}
						label="Read Community"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={0}>{host.hostid}</MenuItem>
					</Select>
				</FormControl>
			))} */}

			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					Read Community
				</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={value}
					onChange={handleChange}
					label="Read Community"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={1}>Public</MenuItem>
					<MenuItem value={0}>Private</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

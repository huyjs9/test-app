import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		padding: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
const SettingsPassword = (props) => {
	const [values, setValues] = useState({
		password: "",
		confirm: "",
	});
	const classes = useStyles();
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form {...props}>
			<Card className={classes.paper}>
				<CardHeader
					subheader="Update password"
					title="Password"
					minWidth="xs"
				/>
				<Divider />
				<CardContent>
					<TextField
						fullWidth
						label="Password"
						margin="normal"
						name="password"
						onChange={handleChange}
						type="password"
						value={values.password}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Confirm password"
						margin="normal"
						name="confirm"
						onChange={handleChange}
						type="password"
						value={values.confirm}
						variant="outlined"
					/>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						p: 2,
					}}
				>
					<Button color="primary" variant="contained">
						Update
					</Button>
				</Box>
			</Card>
		</form>
	);
};

export default SettingsPassword;

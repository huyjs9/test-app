import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import {
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
	Grid,
	Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
		marginTop: theme.spacing(1),
		padding: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const ValidatedLoginForm = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="xs" component="main">
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					let errors = {};
					if (!values.email) {
						errors.email = "Email is required.";
					} else if (!EmailValidator.validate(values.email)) {
						errors.email = "Invalid email address.";
					}

					if (!values.password) {
						errors.password = "Password is equired.";
					} else if (values.password.length < 6) {
						errors.password = "Password must be 6 characters long.";
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert("Logging in", values);
						setSubmitting(false);
					}, 500);
				}}
			>
				{({
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => (
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Box sx={{ mb: 3 }}>
							<Typography color="textPrimary" variant="h3">
								Sign in
							</Typography>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"
							></Typography>
						</Box>
						<form onSubmit={handleSubmit} className={classes.form}>
							<TextField
								error={Boolean(touched.email && errors.email)}
								fullWidth
								helperText={touched.email && errors.email}
								label="Email Address"
								margin="normal"
								name="email"
								onBlur={handleBlur}
								onChange={handleChange}
								type="email"
								value={values.email}
								variant="outlined"
								className={
									errors.email && touched.email && "error"
								}
							/>

							<TextField
								error={Boolean(
									touched.password && errors.password
								)}
								fullWidth
								helperText={touched.password && errors.password}
								label="Password"
								margin="normal"
								name="password"
								onBlur={handleBlur}
								onChange={handleChange}
								type="password"
								value={values.password}
								variant="outlined"
								className={
									errors.password &&
									touched.password &&
									"error"
								}
							/>
							<Box sx={{ py: 2 }}>
								<Button
									color="primary"
									disabled={isSubmitting}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									className={classes.submit}
								>
									Sign in now
								</Button>
							</Box>
							<Grid container justify="flex-end">
								<Grid item>
									<Typography
										color="textSecondary"
										variant="body1"
									>
										Don't have an account?{" "}
										<Link
											// component={RouterLink}
											to="/register"
											variant="body6"
										>
											Sign up
										</Link>
									</Typography>
								</Grid>
							</Grid>
						</form>
					</div>
				)}
			</Formik>
		</Container>
	);
};

export default ValidatedLoginForm;

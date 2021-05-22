import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Grid,
	Avatar,
	Card,
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(2),
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

const ValidatedRegisterForm = () => {
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email("Email is invalid.")
						.required("Email is required."),
					password: Yup.string()
						.min(6, "Password must be at least 6 characters.")
						.required("Password is required."),
					confirmPassword: Yup.string()
						.oneOf(
							[Yup.ref("password"), null],
							"Passwords must match."
						)
						.required("Confirm Password is required."),
				})}
				onSubmit={(fields) => {
					alert("SUCCESS!!");
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
					<Card className={classes.paper}>
						<Avatar className={classes.avatar}>
							<PersonAddOutlinedIcon />
						</Avatar>
						<Box sx={{ mb: 3 }}>
							<Typography color="textPrimary" variant="h3">
								Sign up
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
									"form-control" +
									(errors.email && touched.email
										? " is-invalid"
										: "")
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
									"form-control" +
									(errors.password && touched.password
										? " is-invalid"
										: "")
								}
							/>
							<TextField
								error={Boolean(
									touched.confirmPassword &&
										errors.confirmPassword
								)}
								fullWidth
								helperText={
									touched.confirmPassword &&
									errors.confirmPassword
								}
								label="Confirm Password"
								margin="normal"
								name="confirmPassword"
								onBlur={handleBlur}
								onChange={handleChange}
								type="password"
								value={values.confirmPassword}
								variant="outlined"
								className={
									"form-control" +
									(errors.confirmPassword &&
									touched.confirmPassword
										? " is-invalid"
										: "")
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
									Sign up
								</Button>
							</Box>
							<Grid container justify="flex-end">
								<Grid item>
									<Typography
										color="textSecondary"
										variant="body1"
									>
										Already have an account?{" "}
										<Link
											// component={RouterLink}
											to="/login"
											variant="body6"
										>
											Sign in
										</Link>
									</Typography>
								</Grid>
							</Grid>
						</form>
					</Card>
				)}
			</Formik>
		</Container>
	);
};

export default ValidatedRegisterForm;

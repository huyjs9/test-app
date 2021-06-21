import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TimelineIcon from "@material-ui/icons/Timeline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import { Router, Link } from "@reach/router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));
export default function MainListItems(props) {
	const classes = useStyles();
	const { openacc } = props;

	return (
		<div className={classes.root}>
			<Link
				to="dashboard"
				style={{ textDecoration: "none", color: "#000" }}
			>
				<ListItem button component="nav">
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>
			<Link to="graph" style={{ textDecoration: "none", color: "#000" }}>
				<ListItem button component="nav">
					<ListItemIcon>
						<TimelineIcon />
					</ListItemIcon>
					<ListItemText primary="Graph" />
				</ListItem>
			</Link>
			{/* <Link
				to="account"
				style={{ textDecoration: "none", color: "#000" }}
			>
				<ListItem button component="nav">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Account" />
				</ListItem>
			</Link> */}
			{openacc && (
				<Link to="/" style={{ textDecoration: "none", color: "#000" }}>
					<ListItem button component="nav">
						<ListItemIcon>
							<LockOpenIcon />
						</ListItemIcon>
						<ListItemText primary="Login/Register" />
					</ListItem>
				</Link>
			)}
		</div>
	);
}

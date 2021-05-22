import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import TimelineIcon from "@material-ui/icons/Timeline";
import { makeStyles } from "@material-ui/core/styles";
import { Router, Link } from "@reach/router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));
export default function MainListItems() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Link to="/">
				<ListItem button component="nav">
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>
			<Link to="graph">
				<ListItem button component="nav" to="graph">
					<ListItemIcon>
						<Link to="graph">
							<TimelineIcon />
						</Link>
					</ListItemIcon>
					<ListItemText primary="Graph" />
					<Link to="graph"></Link>
				</ListItem>
			</Link>
			<ListItem button component="nav">
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
				<ListItemText primary="Setting" />
			</ListItem>
			<ListItem button component="nav">
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Account" />
			</ListItem>
		</div>
	);
}

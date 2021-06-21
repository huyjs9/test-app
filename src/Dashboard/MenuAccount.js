import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Menu, MenuItem, Box } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { navigate } from "@reach/router";
import firebase from "../firebase";

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { openacc, setOpenacc } = props;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<IconButton
				color="inherit"
				style={{ outline: "none" }}
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<AccountCircleIcon />
			</IconButton>
			{openacc === false && (
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} disabled>
						{firebase.getCurrentUsername()}
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose();
							logout();
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			)}
		</div>
	);
	async function logout() {
		await firebase.logout();
		navigate("/", { replace: true });
		setOpenacc(true);
	}
}

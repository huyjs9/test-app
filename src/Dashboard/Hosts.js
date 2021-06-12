import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link, Popover } from "@material-ui/core";
import axios from "axios";
// import { Link } from "@reach/router";

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	hostContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
	popover: {
		pointerEvents: "none",
	},
	paper: {
		padding: theme.spacing(1),
	},
}));

// Sau này thay cái fakeData này bằng cái host là props truyền dô á

export default function Hosts(props) {
	const classes = useStyles();
	const { host, currentHostIndex, setCurrentHostIndex, hostid, setHostid } =
		props;
	const fakeDataHost = host; //Nhận dữ liệu mảng host đã lưu để mapping
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	// console.log(fakeDataHost);
	// console.log(fakeData);
	let data = JSON.parse(localStorage.getItem("token"));

	// console.log(host);
	// console.log(data3.result);
	// console.log(JSON.stringify(currentHostIndex));

	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.hostContext}>
				{/* <Box fontWeight="fontWeightMedium" className={classes.forHost}>
					Returned Authentication: {data}
				</Box> */}
				<Box>
					{fakeDataHost.map((host, index) => (
						<Box key={host.hostid} style={{ marginTop: 16 }}>
							{" "}
							<Box
								fontWeight="fontWeightBold"
								display="inline-block"
								width="25%"
								aria-owns={
									open ? "mouse-over-popover" : undefined
								}
								aria-haspopup="true"
								onMouseEnter={handlePopoverOpen}
								onMouseLeave={handlePopoverClose}
							>
								<Link
									onClick={() => {
										// alert(fakeDataHost[index].hostid);
										setCurrentHostIndex(index);
										setHostid(host.hostid);
									}}
								>
									Hostid: {host.hostid}
								</Link>
								<Popover
									id="mouse-over-popover"
									className={classes.popover}
									classes={{
										paper: classes.paper,
									}}
									open={open}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									onClose={handlePopoverClose}
									disableRestoreFocus
								>
									<Typography>
										Click here for view detail!
									</Typography>
								</Popover>
							</Box>
							<Box
								fontWeight="fontWeightBold"
								display="inline-block"
							>
								Name: {host.host}
							</Box>
						</Box>
					))}
				</Box>
			</Typography>
		</React.Fragment>
	);
}

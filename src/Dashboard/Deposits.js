import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";

// import { Link } from "@reach/router";

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
});

// Sau này thay cái fakeData này bằng cái host là props truyền dô á

export default function Deposits(props) {
	const classes = useStyles();
	const { host, currentHostIndex, setCurrentHostIndex } = props;

	const fakeDataHost = host;
	console.log(fakeDataHost);
	// console.log(fakeData);
	let data = JSON.parse(localStorage.getItem("token"));
	// let data2 = JSON.parse(localStorage.getItem("hostdata"));
	// let data3 = JSON.parse(localStorage.getItem("itemdata"));
	// console.log(host);
	// console.log(data3.result);
	console.log(JSON.stringify(currentHostIndex));

	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.depositContext}>
				{/* <Box fontWeight="fontWeightMedium" className={classes.forHost}>
					Returned Authentication: {data}
				</Box>
				<Box
					fontWeight="fontWeightMedium"
					width="25%"
					display="inline-block"
				>
					"host": {data2.result[0].host}
				</Box>
				<Box fontWeight="fontWeightMedium" display="inline-block">
					"hostid": {data2.result[0].hostid}
				</Box>
				<p></p>
				<Box>
					<Box fontWeight="fontWeightLight">
						Divice: {data3.result[0].name}
					</Box>
					<Box fontWeight="fontWeightLight">
						Description: {data3.result[0].description}
					</Box>
					<Box fontWeight="fontWeightLight">
						Value: {data3.result[0].lastvalue}
					</Box>
				</Box>
				<p></p>
				<Box>
					<Box fontWeight="fontWeightLight">
						Divice: {data3.result[1].name}
					</Box>
					<Box fontWeight="fontWeightLight">
						Description: {data3.result[1].description}
					</Box>
					<Box fontWeight="fontWeightLight">
						Value: {data3.result[1].lastvalue}
					</Box>
				</Box>
				<p></p>
				<Box>
					<Box fontWeight="fontWeightLight">
						Divice: {data3.result[2].name}
					</Box>
					<Box fontWeight="fontWeightLight">
						Description: {data3.result[2].description}
					</Box>
					<Box fontWeight="fontWeightLight">
						Value: {data3.result[2].lastvalue}
					</Box>
				</Box>
				<p></p>
				<Box>
					<Box fontWeight="fontWeightLight">
						Divice: {data3.result[3].name}
					</Box>
					<Box fontWeight="fontWeightLight">
						Description: {data3.result[3].description}
					</Box>
					<Box fontWeight="fontWeightLight">
						Value: {data3.result[3].lastvalue}
					</Box>
				</Box>
				<p></p> */}
				<Box fontWeight="fontWeightMedium" className={classes.forHost}>
					Returned Authentication: {data}
				</Box>
				<Box>
					{fakeDataHost.map((host, index) => (
						<Box key={host.hostid} style={{ marginTop: 16 }}>
							{" "}
							<Box
								fontWeight="fontWeightBold"
								display="inline-block"
								width="25%"
							>
								<Link
									onClick={() => {
										alert(fakeDataHost[index].hostid);
										setCurrentHostIndex(index);
									}}
								>
									Hostid: {host.hostid}
								</Link>
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

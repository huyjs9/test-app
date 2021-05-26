import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	forHost: {
		spacing: 1,
	},
});

export default function Deposits(props) {
	const classes = useStyles();
	const { itemdata, iid, setIid } = props;
	const fakeData = itemdata;
	console.log(iid);

	return (
		<React.Fragment>
			<Typography color="textPrimary" className={classes.depositContext}>
				<Box>
					{fakeData.map((item) => (
						<Box key={item.itemid} style={{ marginTop: 16 }}>
							{" "}
							<Box
								fontWeight="fontWeightBold"
								display="inline-block"
								width="25%"
							>
								<Link onClick={() => setIid(item.itemid)}>
									Itemid: {item.itemid}
								</Link>
							</Box>
							<Box
								fontWeight="fontWeightLight"
								display="inline-block"
								width="50%"
							>
								Name: {item.name}
							</Box>
							<Box
								fontWeight="fontWeightLight"
								display="inline-block"
							>
								Lastvalue: {item.lastvalue}
							</Box>
							<Box
								fontWeight="fontWeightLight"
								display="inline-block"
							>
								{item.units}
							</Box>
						</Box>
					))}
				</Box>
			</Typography>
		</React.Fragment>
	);
}

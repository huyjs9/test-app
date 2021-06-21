import React, { useState, useEffect } from "react";
import { Box, Zoom, Slide } from "@material-ui/core";

export default function Protected() {
	const [checked, setChecked] = useState(false);
	useEffect(() => {
		setChecked(true);
	});
	return (
		<div>
			<Slide direction="down" in={checked}>
				<Box
					display="flex"
					justifyContent="center"
					style={{ paddingTop: "100px" }}
					fontWeight="fontWeightBold"
					fontSize="h4.fontSize"
				>
					Please Login first before start!
				</Box>
			</Slide>
		</div>
	);
}

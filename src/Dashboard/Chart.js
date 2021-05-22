import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
	return { time, amount };
}

const data = [
	createData("00:00", 0),
	createData("03:00", 0),
	createData("06:00", 0),
	createData("09:00", 0),
	createData("12:00", 0),
	createData("15:00", 0),
	createData("18:00", 0),
	createData("21:00", 0),
	createData("", undefined),
];

export default function Chart() {
	const theme = useTheme();

	return (
		<React.Fragment>
			<Title>Flow Chart</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 10,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis dataKey="time" stroke={theme.palette.text.secondary}>
						<Label
							angle={0}
							position="insideBottom"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
							}}
						>
							Time (s)
						</Label>
					</XAxis>
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
							}}
						>
							Mbps
						</Label>
					</YAxis>
					<Line
						type="monotone"
						dataKey="amount"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}

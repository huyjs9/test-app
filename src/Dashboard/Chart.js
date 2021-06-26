/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import axios from "axios";
import Chart from "react-apexcharts";
const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(1),
		maxWidth: 300,
		maxHeight: 300,
	},
}));
export default function PieChart(props) {
	const { series } = props;
	const options = {
		series: [35, 65],
		options: {
			chart: {
				width: 380,
				type: "pie",
			},
			labels: ["Used Memory", "Free Memory"],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
			colors: ["#4caf50", "#F44336"],
		},
	};
	return (
		<div className="app">
			<div className="row">
				<div className="mixed-chart">
					<Chart
						options={options.options}
						series={options.series}
						type="pie"
						width="500"
					/>
				</div>
			</div>
		</div>
	);
}

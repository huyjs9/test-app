/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import axios from "axios";
import Chart from "react-apexcharts";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		paddingTop: theme.spacing(1),
	},
}));
export default function PieChart(props) {
	const classes = useStyles();
	const { series, title, subtitle } = props;

	const options = {
		series: series,
		options: {
			chart: {
				width: 380,
				type: "pie",
			},
			labels: ["Used Memory", "Free Memory"],
			title: {
				text: title,
				align: "left",
			},
			subtitle: {
				text: subtitle,
				align: "left",
				margin: 10,
				offsetX: 5,
				offsetY: 20,
				floating: false,
				style: {
					fontSize: "12px",
					fontWeight: "normal",
					fontFamily: undefined,
					color: "#9699a2",
				},
			},
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
		<div className={classes.root}>
			<div className="mixed-chart">
				<Chart
					options={options.options}
					series={options.series}
					type="pie"
					width="400"
				/>
			</div>
		</div>
	);
}

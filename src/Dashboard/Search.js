/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
}));

export default function Search(props) {
	const classes = useStyles();
	const { itemdata, searched, setSearched, setRows } = props;

	// useEffect(()=> {
	// 	setRows([...itemdata]);
	// }, []);
	const requestSearch = (searchedVal) => {
		const filteredRows = itemdata.filter((row) => {
			return row.name.toLowerCase().includes(searchedVal.toLowerCase());
		});
		setRows(filteredRows);

		//  else {
		// 	setRows(itemdata);
		// }
	};

	const cancelSearch = () => {
		setSearched("");
		requestSearch(searched);
	};

	return (
		<div className={classes.root}>
			<Box boxShadow={3}>
				<SearchBar
					placeholder="Search for..."
					style={{ width: "auto", height: "35px" }}
					value={searched}
					onChange={(searchVal) => requestSearch(searchVal)}
					onRequestSearch={(searchVal) => requestSearch(searchVal)}
					onCancelSearch={() => cancelSearch()}
					variant="outline"
					// onChange={handleChange}
				></SearchBar>
			</Box>
		</div>
	);
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		width: 290,
	},
}));

export default function Search(props) {
	const classes = useStyles();
	const { itemdata, searched, setSearched, setRows } = props;

	const requestSearch = (searchedVal) => {
		const filteredRows = itemdata.filter((row) => {
			return row.name.toLowerCase().includes(searchedVal.toLowerCase());
		});
		setRows(filteredRows);
	};
	// function find(rows) {
	// 	return rows.filter(
	// 		(row) =>
	// 			row.itemid.indexOf(searched) > -1 ||
	// 			row.name.toLowerCase().indexOf(searched) > -1
	// 	);
	// }
	const cancelSearch = () => {
		setSearched("");
		requestSearch(searched);
	};

	return (
		<div className={classes.root}>
			<SearchBar
				placeholder="Search for..."
				style={{ margin: 6, width: "300px" }}
				value={searched}
				onChange={(searchVal) => requestSearch(searchVal)}
				onRequestSearch={(searchVal) => requestSearch(searchVal)}
				onCancelSearch={() => cancelSearch()}

				// onChange={handleChange}
			></SearchBar>
		</div>
	);
}

import React, { useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
	},
}));

export default function IconLabelButtons(props) {
	// let aa = JSON.stringify(localStorage.getItem('urlhost'));
	// const handleSubmit = (event) => {
	//   alert('hello');
	//   event.preventDefault();
	// }
	const classes = useStyles();
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={props.data}
				className={classes.button}
				endIcon={<SearchIcon></SearchIcon>}
			>
				GET INFORMATION
			</Button>
		</div>
	);
}

/*async function getinf() {
  try {
    await firebase.get()
    props.history.replace('/display')
  } catch (error) {
    alert(error.message)
  }
}*/

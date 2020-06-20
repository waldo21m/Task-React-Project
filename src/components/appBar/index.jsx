/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

import styleCSS from "./style";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import DvrIcon from "@material-ui/icons/Dvr";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function AppBarComponent() {
	const classes = styleCSS();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const user = JSON.parse(localStorage.getItem("user"));
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.clear();
		history.push("/login");
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={logout}>Cerrar sesión</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.root}>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<DvrIcon />
					<Typography variant='h3' className={classes.title}>
						Tareas
					</Typography>
					<Button color='inherit' onClick={handleProfileMenuOpen} endIcon={<ArrowDropDownIcon />}>
						{user ? user.firstName + " " + user.lastName : "User"}
					</Button>
				</Toolbar>
			</AppBar>
			{user ? renderMenu : null}
		</div>
	);
}

export default AppBarComponent;

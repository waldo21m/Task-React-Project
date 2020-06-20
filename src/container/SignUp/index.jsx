/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import AuthenticatorUIForm from "../../components/forms/authenticatorUIForm";
import SnackbarComponent from "../../components/snackbar";

function SignUp() {
	const classes = styleCSS();
	let history = useHistory();
	const { register, handleSubmit, errors } = useForm();
	const [openBackDrop] = React.useState(false);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [errorSnackbar] = React.useState(false);
	const [msgSnackbar] = React.useState(null);

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};

	const initComponent = {
		titleMsg: "¡Empezar!",
		title: "Crear una cuenta",
		subtitle: "Iniciar sesión",
		question: "¿Ya tienes cuenta?",
		login: false,
	};

	const secondaryAction = () => {
		history.push("/login");
	};

	const onSubmit = (data) => {};

	return (
		<Container className={classes.root} maxWidth='xl' disableGutters>
			<Grid className={classes.main} container direction='row' justify='center' alignItems='center'>
				<Grid item md={3}>
					<AuthenticatorUIForm
						initComponent={initComponent}
						secondaryAction={secondaryAction}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						errors={errors}
					/>
				</Grid>
			</Grid>
			<Backdrop className={classes.backdrop} open={openBackDrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<SnackbarComponent
				openSnackbar={openSnackbar}
				handleCloseSnackbar={handleCloseSnackbar}
				msgSnackbar={msgSnackbar}
				errorSnackbar={errorSnackbar}
			/>
		</Container>
	);
}

export default SignUp;

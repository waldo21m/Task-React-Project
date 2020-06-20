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

import { loginAPI } from "../../API/auth";

function Login() {
	const classes = styleCSS();
	let history = useHistory();
	const { register, handleSubmit, setError, errors } = useForm();
	const [openBackDrop, setOpenBackDrop] = React.useState(false);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [errorSnackbar, setErrorSnackbar] = React.useState(false);
	const [msgSnackbar, setMsgSnackbar] = React.useState(null);

	const handleCloseBackDrop = () => {
		setOpenBackDrop((openBackDrop) => (openBackDrop = false));
	};

	const handleOpenBackDrop = () => {
		setOpenBackDrop((openBackDrop) => (openBackDrop = true));
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};

	const initComponent = {
		titleMsg: "Hola, ¡bienvenido de nuevo!",
		title: "Iniciar sesión",
		subtitle: "Crear una cuenta",
		question: "¿Ya tienes cuenta?",
		login: true,
	};

	const secondaryAction = () => {
		history.push("/signup");
	};

	const onSubmit = (data) => {
		handleOpenBackDrop();
		const query = {
			email: data.email,
			password: data.password,
		};
		login(query);
	};

	async function login(query) {
		try {
			const response = await loginAPI(query);
			handleCloseBackDrop();
			if (response.token) {
				localStorage.setItem("token", response.token);
				localStorage.setItem("user", JSON.stringify(response.user));
				response ? history.push("/") : history.push("/user");
			} else {
				if (response === "No Authorized") {
					setError("server", "notConnect", "Acceso no autorizado");
					setMsgSnackbar("Acceso no autorizado");
					setErrorSnackbar(true);
					setOpenSnackbar(true);
				} else {
					setError("server", "notConnect", "Error en el server");
					setMsgSnackbar("Error en el server");
					setErrorSnackbar(true);
					setOpenSnackbar(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

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

export default Login;

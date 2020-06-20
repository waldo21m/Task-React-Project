/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import AppBarComponent from "../../components/appBar";
import TableAdmin from "../../components/tableAdmin";
import SnackbarComponent from "../../components/snackbar";
import DialogComponent from "../../components/dialog";
import FormDialog from "../../components/forms/dialog";

import { userListWithoutAdmins } from "../../API/user";
import { taskList, taskCreate, taskUpdate, taskIsCompleted, taskDelete } from "../../API/task";

function createData(id, homework_title, created_at, assigned_to, status, description, userEmail) {
	return { id, homework_title, created_at, assigned_to, status, description, userEmail };
}

function AdminHome() {
	const classes = styleCSS();
	const { register, handleSubmit, errors, setValue } = useForm({
		defaultValues: {
			homework_title: null,
			description: null,
			assigned_to: null,
		},
	});

	const [users, setUsers] = React.useState(false);
	const [tasks, setTasks] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: "Título de la tarea", field: "homework_title" },
			{ title: "Fecha de creación", field: "created_at", type: "date" },
			{ title: "Asignada a", field: "assigned_to" },
			{ title: "Estatus", field: "status" },
		],
		data: [],
	});
	const [editTask, setEditTask] = React.useState(false);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [errorSnackbar, setErrorSnackbar] = React.useState(false);
	const [msgSnackbar, setMsgSnackbar] = React.useState(null);
	const [openDialogShowTask, setOpenDialogShowTask] = React.useState(false);
	const [openFormDialog, setOpenFormDialog] = React.useState(false);
	const [dataShow, setDataShow] = React.useState(false);
	const [openBackDrop, setOpenBackDrop] = React.useState(false);

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

	const usersList = [];

	const data = [];

	const propsForm = { register, handleSubmit, errors, setValue };

	const actions = [
		(rowData) => ({
			icon: () => <VisibilityIcon color='primary' />,
			tooltip: "Ver tarea",
			onClick: (event, rowData) => {
				setOpenDialogShowTask(true);
				setDataShow(rowData);
			},
		}),
		(rowData) => ({
			icon: () => <CreateIcon color='primary' />,
			tooltip: "Editar tarea",
			onClick: (event, rowData) => {
				setValue("homework_title", rowData.homework_title);
				setValue("description", rowData.description);
				setValue("assigned_to", rowData.userEmail);
				setValue("status", rowData.status);
				setOpenFormDialog(true);
				setDataShow(rowData);
				setEditTask(true);
			},
		}),
		(rowData) => ({
			disabled: rowData.status === "Completada" ? true : false,
			icon: () =>
				rowData.status === "Completada" ? (
					<DoneAllIcon color='primary' />
				) : (
					<AssignmentTurnedInIcon color='primary' />
				),
			tooltip: rowData.status === "Completada" ? "Tarea completada" : "Marcar como completada",
			onClick: (event, rowData) => {
				handleOpenBackDrop();
				updateIsCompletedTasks(rowData.id, rowData);
			},
		}),
		(rowData) => ({
			icon: () => <DeleteIcon color='secondary' />,
			tooltip: "Eliminar tarea",
			onClick: (event, rowData) => {
				handleOpenBackDrop();
				deleteTask(rowData.id, rowData);
			},
		}),
	];

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		const getAllTasks = async () => {
			const response = await taskList(token);

			if (response.tasksList) {
				response.tasksList.items.map((item) =>
					data.push(
						createData(
							item.id,
							item.name,
							item.createdAt,
							item.users.firstName + " " + item.users.lastName,
							item.isCompleted ? "Completada" : "No completada",
							item.description,
							item.users.email,
						),
					),
				);
				setState({ ...state, data });
				setTasks(true);
			} else {
				setMsgSnackbar(
					"Error #02: Se ha producido un error al cargar los datos, intente más tarde",
				);
				setErrorSnackbar(true);
				setOpenSnackbar(true);
			}
		};

		if (!tasks) getAllTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks]);

	React.useEffect(() => {
		const getAllUsersWithoutAdmin = async () => {
			const token = localStorage.getItem("token");

			const response = await userListWithoutAdmins(token);
			if (response.usersList) {
				response.usersList.items.map((item) => usersList.push(item));
				setUsers(usersList);
			} else {
				setMsgSnackbar(
					"Error #01: Se ha producido un error al cargar los datos, intente más tarde",
				);
				setErrorSnackbar(true);
				setOpenSnackbar(true);
			}
		};

		if (!users) getAllUsersWithoutAdmin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users]);

	const onSubmit = (data) => {
		handleOpenBackDrop();
		if (editTask) {
			const descriptionToSave = data.description._immutable
				? draftToHtml(convertToRaw(data.description.getCurrentContent()))
				: data.description;
			const query = {
				name: data.homework_title,
				description: descriptionToSave,
				isCompleted: data.status === "Completada" ? true : false,
				userEmail: data.assigned_to,
			};
			updateTask(dataShow.id, query, dataShow);
		} else {
			const query = {
				name: data.homework_title,
				description: data.description,
				isCompleted: false,
				userEmail: data.assigned_to,
			};
			createTask(query);
		}
	};

	const createTask = async (query) => {
		const token = localStorage.getItem("token");
		const response = await taskCreate(token, query);
		handleCloseBackDrop();
		if (response.taskCreate) {
			const newData = createData(
				response.taskCreate.id,
				response.taskCreate.name,
				response.taskCreate.createdAt,
				response.taskCreate.users.firstName + " " + response.taskCreate.users.lastName,
				response.taskCreate.isCompleted ? "Completada" : "No completada",
				response.taskCreate.description,
				response.taskCreate.users.email,
			);

			setState((prevState) => {
				const data = [...prevState.data];
				data.push(newData);
				return { ...prevState, data };
			});

			setOpenFormDialog(false);
			setMsgSnackbar(response.taskCreate.name + "  ha sido creada exitosamente");
			setErrorSnackbar(false);
			setOpenSnackbar(true);
		} else {
			setMsgSnackbar("Se ha producido un error al guardar, intente más tarde");
			setErrorSnackbar(true);
			setOpenSnackbar(true);
		}
	};

	const updateIsCompletedTasks = async (id, oldData) => {
		const token = localStorage.getItem("token");
		const response = await taskIsCompleted(token, id);
		handleCloseBackDrop();

		if (response.result) {
			const newData = createData(
				response.result.taskUpdate.id,
				response.result.taskUpdate.name,
				response.result.taskUpdate.createdAt,
				response.result.taskUpdate.users.firstName +
					" " +
					response.result.taskUpdate.users.lastName,
				response.result.taskUpdate.isCompleted ? "Completada" : "No completada",
				response.result.taskUpdate.description,
				response.result.taskUpdate.users.email,
			);

			setState((prevState) => {
				const data = [...prevState.data];
				data[data.indexOf(oldData)] = newData;
				return { ...prevState, data };
			});

			setMsgSnackbar("Se ha registrado la tarea como completada, exitosamente");
			setErrorSnackbar(false);
			setOpenSnackbar(true);
		} else {
			setMsgSnackbar(
				"Se ha producido un error al registrar la tarea como completada, intente más tarde",
			);
			setErrorSnackbar(true);
			setOpenSnackbar(true);
		}
	};

	const updateTask = async (id, query, oldData) => {
		const token = localStorage.getItem("token");
		const response = await taskUpdate(token, id, query);
		handleCloseBackDrop();
		if (response.taskUpdate) {
			const newData = createData(
				response.taskUpdate.id,
				response.taskUpdate.name,
				response.taskUpdate.createdAt,
				response.taskUpdate.users.firstName + " " + response.taskUpdate.users.lastName,
				response.taskUpdate.isCompleted ? "Completada" : "No completada",
				response.taskUpdate.description,
				response.taskUpdate.users.email,
			);

			setState((prevState) => {
				const data = [...prevState.data];
				data[data.indexOf(oldData)] = newData;
				return { ...prevState, data };
			});

			setOpenFormDialog(false);
			setMsgSnackbar("Se ha editado la tarea exitosamente");
			setErrorSnackbar(false);
			setOpenSnackbar(true);
			setEditTask(false);
			setDataShow(false);
		} else {
			setMsgSnackbar("Se ha producido un error al editar la tarea, intente más tarde");
			setErrorSnackbar(true);
			setOpenSnackbar(true);
		}
	};

	const deleteTask = async (id, oldData) => {
		const token = localStorage.getItem("token");
		const response = await taskDelete(token, id);
		handleCloseBackDrop();
		if (response.taskDelete.success) {
			setState((prevState) => {
				const data = [...prevState.data];
				data.splice(data.indexOf(oldData), 1);
				return { ...prevState, data };
			});

			setMsgSnackbar("Se ha eliminado la tarea exitosamente");
			setErrorSnackbar(false);
			setOpenSnackbar(true);
		} else {
			setMsgSnackbar("Se ha producido un error al eliminar la tarea, intente más tarde");
			setErrorSnackbar(true);
			setOpenSnackbar(true);
		}
	};

	return (
		<>
			<AppBarComponent />
			<Container className={classes.root} maxWidth='xl' disableGutters>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					className={classes.main}>
					<Grid item xs={10} className={classes.btnContent}>
						<Button
							variant='contained'
							color='secondary'
							startIcon={<AddIcon />}
							disabled={!users}
							onClick={() => setOpenFormDialog(true)}>
							Crear tarea
						</Button>
					</Grid>
					<Grid item xs={10}>
						{!tasks ? (
							<>
								<Skeleton height={70} />
								<Skeleton height={70} />
								<Skeleton height={70} />
								<Skeleton height={70} />
								<Skeleton height={70} />
							</>
						) : (
							<TableAdmin actions={actions} state={state} />
						)}
					</Grid>
				</Grid>
			</Container>
			<SnackbarComponent
				openSnackbar={openSnackbar}
				handleCloseSnackbar={handleCloseSnackbar}
				msgSnackbar={msgSnackbar}
				errorSnackbar={errorSnackbar}
			/>
			<Backdrop className={classes.backdrop} open={openBackDrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<DialogComponent
				openDialogShowTask={openDialogShowTask}
				setOpenDialogShowTask={setOpenDialogShowTask}
				dataShow={dataShow}
				updateIsCompletedTasks={updateIsCompletedTasks}
				handleOpenBackDrop={handleOpenBackDrop}
			/>

			{users && (
				<FormDialog
					openFormDialog={openFormDialog}
					setOpenFormDialog={setOpenFormDialog}
					usersList={users}
					{...propsForm}
					editTask={editTask}
					dataShow={dataShow}
					onSubmit={onSubmit}
					setEditTask={setEditTask}
				/>
			)}
		</>
	);
}

export default AdminHome;

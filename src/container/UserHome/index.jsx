/** @format */

import React from "react";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import AppBarComponent from "../../components/appBar";
import TableUser from "../../components/tableUser";
import DialogComponent from "../../components/dialog";

function UserHome() {
	const classes = styleCSS();
	const [tasks, setTasks] = React.useState(false);
	const [state] = React.useState({
		columns: [
			{ title: "Título de la tarea", field: "homework_title" },
			{ title: "Fecha de creación", field: "created_at", type: "date" },
			{ title: "Estatus", field: "status" },
		],
		data: [
			{
				id: 1,
				homework_title: "Tarea del sprint 4",
				description: (
					<>
						Let Google help apps determine <b>location.</b> This means sending anonymous location
						data to Google, even when no apps are running.
					</>
				),
				created_at: "2020-06-08T12:09:04.214Z",
				status: "Completada",
				assigned_to: "Denger Zamora"
			},
			{
				id: 2,
				homework_title: "Tarea del sprint 2",
				description: (
					<>
						<p>
							Let Google help apps determine <b>location.</b> This means sending anonymous location
							data to Google, even when no apps are running.
						</p>
						<ul>
							<li>First step</li>
							<li>Second step</li>
						</ul>
					</>
				),
				created_at: "2020-04-22T12:09:04.214Z",
				status: "No completada",
				assigned_to: "Kueylam Nieto"
			},
		],
	});
	const [openDialogShowTask, setOpenDialogShowTask] = React.useState(false);
	const [dataShow, setDataShow] = React.useState(false);

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
			disabled: rowData.status === "Completada" ? true : false,
			icon: () =>
				rowData.status === "Completada" ? (
					<DoneAllIcon color='primary' />
				) : (
					<AssignmentTurnedInIcon color='primary' />
				),
			tooltip: rowData.status === "Completada" ? "Tarea completada" : "Marcar como completada",
			onClick: (event, rowData) => {},
		}),
	];

	React.useEffect(() => {
		setTimeout(() => {
			setTasks(true);
		}, 2000);
	}, []);

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
							<TableUser actions={actions} state={state} />
						)}
					</Grid>
				</Grid>
			</Container>
			<DialogComponent
				openDialogShowTask={openDialogShowTask}
				setOpenDialogShowTask={setOpenDialogShowTask}
				dataShow={dataShow}
			/>
		</>
	);
}

export default UserHome;

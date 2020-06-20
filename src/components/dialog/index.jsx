/** @format */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";

import styleCSS from "./style";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const MuiDialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
});

function DialogShowTask(props) {
	const classes = styleCSS();

	const handleClose = () => {
		props.setOpenDialogShowTask(false);
	};

	React.useEffect(() => {
		moment().locale("es");
	}, []);

	return (
		<>
			<Dialog
				open={props.openDialogShowTask}
				TransitionComponent={Transition}
				keepMounted
				fullWidth
				maxWidth='sm'
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<MuiDialogTitle id='customized-dialog-title' onClose={handleClose}>
					{props.dataShow.homework_title}
				</MuiDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						<b>Descripción</b>
					</Typography>
					<Box id='alert-dialog-slide-description' className={classes.boxContent}>
						<div className={classes.descriptionContent} dangerouslySetInnerHTML={{ __html: props.dataShow.description }} />
					</Box>
					<Typography gutterBottom>
						<b>Asignada a:</b> {props.dataShow.assigned_to}
					</Typography>
					<Typography gutterBottom>
						<b>Fecha de creación:</b>{" "}
						{moment(props.dataShow.created_at).format("L") +
							" | " +
							moment(props.dataShow.created_at).startOf("hour").fromNow()}
					</Typography>
				</DialogContent>
				<DialogActions>
					{props.dataShow.status === "Completada" ? (
						<Button onClick={handleClose} color='primary' disabled startIcon={<DoneAllIcon />}>
							Tarea completada
						</Button>
					) : (
						<Button
							onClick={() => {
								props.handleOpenBackDrop();
								props.updateIsCompletedTasks(props.dataShow.id, props.dataShow);
								handleClose();
							}}
							color='primary'
							startIcon={<AssignmentTurnedInIcon />}>
							Marcar como completada
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
}

DialogShowTask.propTypes = {
	openDialogShowTask: PropTypes.bool.isRequired,
	setOpenDialogShowTask: PropTypes.func.isRequired,
};

export default DialogShowTask;
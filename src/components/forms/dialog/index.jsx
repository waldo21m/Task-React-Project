/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";

import styleCSS from "./style";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

import CloseIcon from "@material-ui/icons/Close";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

const options = {
	options: [
		"inline",
		"blockType",
		"fontSize",
		"fontFamily",
		"list",
		"textAlign",
		"history",
		"emoji",
	],
	inline: {
		options: ["bold", "italic", "underline"],
		bold: { className: "rich-text-icon" },
		italic: { className: "rich-text-icon" },
		underline: { className: "rich-text-icon" },
	},
	blockType: {
		inDropdown: true,
	},
	fontSize: {
		options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
	},
	fontFamily: {
		options: ["Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"],
	},
	list: {
		inDropdown: false,
		options: ["unordered", "ordered", "indent", "outdent"],
	},
	textAlign: {
		inDropdown: false,
		options: ["left", "center", "justify"],
	},
	history: {
		inDropdown: false,
		options: ["undo", "redo"],
	},
	emoji: {
		className: undefined,
		component: undefined,
		popupClassName: undefined,
		emojis: [
			"😀",
			"😁",
			"😂",
			"😃",
			"😉",
			"😋",
			"😎",
			"😍",
			"😗",
			"🤗",
			"🤔",
			"😣",
			"😫",
			"😴",
			"😌",
			"🤓",
			"😛",
			"😜",
			"😠",
			"😇",
			"😷",
			"😈",
			"👻",
			"😺",
			"😸",
			"😹",
			"😻",
			"😼",
			"😽",
			"🙀",
			"🙈",
			"🙉",
			"🙊",
			"👼",
			"👮",
			"🕵",
			"💂",
			"👳",
			"🎅",
			"👸",
			"👰",
			"👲",
			"🙍",
			"🙇",
			"🚶",
			"🏃",
			"💃",
			"⛷",
			"🏂",
			"🏌",
			"🏄",
			"🚣",
			"🏊",
			"⛹",
			"🏋",
			"🚴",
			"👫",
			"💪",
			"👈",
			"👉",
			"👉",
			"👆",
			"🖕",
			"👇",
			"🖖",
			"🤘",
			"🖐",
			"👌",
			"👍",
			"👎",
			"✊",
			"👊",
			"👏",
			"🙌",
			"🙏",
			"🐵",
			"🐶",
			"🐇",
			"🐥",
			"🐸",
			"🐌",
			"🐛",
			"🐜",
			"🐝",
			"🍉",
			"🍄",
			"🍔",
			"🍤",
			"🍨",
			"🍪",
			"🎂",
			"🍰",
			"🍾",
			"🍷",
			"🍸",
			"🍺",
			"🌍",
			"🚑",
			"⏰",
			"🌙",
			"🌝",
			"🌞",
			"⭐",
			"🌟",
			"🌠",
			"🌨",
			"🌩",
			"⛄",
			"🔥",
			"🎄",
			"🎈",
			"🎉",
			"🎊",
			"🎁",
			"🎗",
			"🏀",
			"🏈",
			"🎲",
			"🔇",
			"🔈",
			"📣",
			"🔔",
			"🎵",
			"🎷",
			"💰",
			"🖊",
			"📅",
			"✅",
			"❎",
			"💯",
		],
	},
};

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

function DialogFromTask(props) {
	const classes = styleCSS();
	const [description, setDescription] = React.useState(false);

	const handleClose = () => {
		props.setOpenFormDialog(false);
		props.setEditTask(false);
	};

	const onChangeState = (editorState) => {
		setDescription((description) => (description = editorState));
	};

	const onBlur = (description) => {
		const htmlDescription = draftToHtml(convertToRaw(description.getCurrentContent()));
		props.setValue("description", htmlDescription);
	};

	React.useEffect(() => {
		props.register(
			{ name: "description" },
			{
				required: {
					value: true,
					message: "La descripción de la tarea es requerido",
				},
			},
		);
	}, [props]);

	React.useEffect(() => {
		if (props.editTask) {
			const blocksFromHTML = convertFromHTML(props.dataShow.description);
			const contentState = ContentState.createFromBlockArray(blocksFromHTML);
			setDescription((description) => (description = EditorState.createWithContent(contentState)));
			props.setValue("description", EditorState.createWithContent(contentState));
		} else {
			props.setValue("homework_title", null);
			props.setValue("description", null);
			props.setValue("assigned_to", null);
			EditorState.createEmpty();
			setDescription((description) => (description = null));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editTask]);

	return (
		<>
			<Dialog
				open={props.openFormDialog}
				TransitionComponent={Transition}
				keepMounted
				fullWidth
				maxWidth='md'
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<MuiDialogTitle id='customized-dialog-title' onClose={handleClose}>
					{!props.editTask ? "Crear tarea" : "Editar tarea - " + props.dataShow.homework_title}
				</MuiDialogTitle>
				<DialogContent dividers>
					<form
						noValidate
						autoComplete='off'
						onSubmit={props.handleSubmit(props.onSubmit)}
						id='form'>
						<TextField
							id='outlined-basic'
							label='Título de la tarea'
							variant='outlined'
							fullWidth
							error={props.errors?.homework_title ? true : false}
							helperText={props.errors?.homework_title?.message}
							name='homework_title'
							inputRef={props.register({
								required: {
									value: true,
									message: "El Título de la tarea es requerido",
								},
							})}
							InputLabelProps={props.editTask ? { shrink: true } : null}
						/>

						<FormControl
							className={classes.editorContent}
							error={props.errors?.description ? true : false}>
							<Typography variant='body1' gutterBottom>
								Descripción
							</Typography>
							<Editor
								editorState={description}
								onEditorStateChange={(editorState) => onChangeState(editorState)}
								onBlur={(event, editorState) => onBlur(editorState)}
								toolbar={options}
								name='description'
								wrapperStyle={{ marginBottom: "20px" }}
								toolbarClassName='toolbarClassName'
								wrapperClassName='wrapperClassName'
								editorClassName='editorClassName'
								editorStyle={{
									padding: "10px",
									border: "1px solid rgba(0, 0, 0, 0.12)",
									background: "white",
									maxHeight: 200,
								}}
							/>
						</FormControl>

						<FormControl
							variant='outlined'
							fullWidth
							error={props.errors?.assigned_to ? true : false}>
							<InputLabel htmlFor='outlined-assigned_task' shrink>
								Asignar tarea
							</InputLabel>
							<Select
								native
								label='Asignar tarea'
								inputProps={{
									name: "assigned_to",
									id: "outlined-assigned_task",
									ref: props.register({
										required: {
											value: true,
											message: "Debe asignar un responsable a la tarea",
										},
									}),
								}}>
								{props.usersList.map((item) => (
									<option value={item.email} key={item.id}>
										{item.firstName + " " + item.lastName + " | " + item.email}
									</option>
								))}
							</Select>
							{props.errors.assigned_to ? (
								<FormHelperText>{props.errors?.assigned_to?.message}</FormHelperText>
							) : (
								<FormHelperText>Por favor selecciona un responsable</FormHelperText>
							)}
						</FormControl>

						{props.editTask && (
							<FormControl
								variant='outlined'
								fullWidth
								className={classes.inputStatus}
								error={props.errors?.status ? true : false}>
								<InputLabel htmlFor='outlined-status-tasks' shrink>
									Estatus de la tarea
								</InputLabel>
								<Select
									native
									label='Estatus de la tarea'
									defaultValue={props.dataShow.status}
									inputProps={{
										name: "status",
										id: "outlined-status-tasks",
										ref: props.register({ required: true }),
									}}>
									<option value='Completada'>Completada</option>
									<option value='No completada'>No completada</option>
								</Select>
								{props.errors.status ? (
									<FormHelperText>{props.errors?.status?.message}</FormHelperText>
								) : (
									<FormHelperText>
										Por favor selecciona el estatus actual de la tarea
									</FormHelperText>
								)}
							</FormControl>
						)}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						variant='contained'
						color={!props.editTask ? "secondary" : "primary"}
						type='submit'
						form='form'
						startIcon={<LibraryBooksIcon />}>
						{!props.editTask ? "Guardar tarea" : "Editar tarea"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

DialogFromTask.propTypes = {
	openFormDialog: PropTypes.bool.isRequired,
	setOpenFormDialog: PropTypes.func.isRequired,
	editTask: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	setEditTask: PropTypes.func.isRequired,
};

export default DialogFromTask;

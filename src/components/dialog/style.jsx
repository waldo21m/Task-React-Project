import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "white",
	},
	boxContent: {
		marginBottom: theme.spacing(3),
	},
	descriptionContent: {
		"& > ul": {
			paddingLeft: theme.spacing(4),
		},
	},
}));

export default styleCSS;

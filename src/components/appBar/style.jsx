import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
	root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
}));

export default styleCSS;
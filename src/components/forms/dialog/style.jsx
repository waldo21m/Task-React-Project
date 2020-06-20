import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
	backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
  editorContent: { 
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  inputStatus: {
    marginTop: theme.spacing(3),
  }
}));

export default styleCSS;
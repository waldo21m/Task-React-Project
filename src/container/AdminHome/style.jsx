import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
  },
  main: {
    marginBottom: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: 'white',
  },
  btnContent: {
    paddingBottom: theme.spacing(3),
    textAlign: 'right'
  },
}));

export default styleCSS;
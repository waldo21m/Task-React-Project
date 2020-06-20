import { makeStyles } from "@material-ui/core/styles";

import imgBackground from "../../images/login_bg.jpg";

const styleCSS = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  main: {
    minHeight: '100vh',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));

export default styleCSS;
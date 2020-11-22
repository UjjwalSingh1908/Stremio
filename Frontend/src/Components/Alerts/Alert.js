//import React from "react";
//import Alert from "@material-ui/lab/Alert";
//
//const Alerts = (props) => (
//  <div>
//    <Alert severity={props.type}>{props.text}</Alert>
//  </div>
//);
//
//export default Alerts;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
//import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    marginLeft: "25%",
    marginTop: "1rem",

    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          onMouseMove={() => {
            setInterval(() => {
              setOpen(false);
            }, 2000);
          }}
          severity={props.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.text}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Alerts;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalMutation, useGlobalState } from "../../utils/container";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import useRouter from "../../utils/use-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fontStyle: {
    color: "#9ee2ff",
  },
  midItem: {
    marginTop: "1rem",
    marginBottom: "6rem",
  },
  item: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  coverLeft: {
    background: "linear-gradient(to bottom, #307AFF, 50%, #46cdff)",
    alignItems: "center",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  coverContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "#fff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    minWidth: 700,
    minHeight: 500,
    maxHeight: 500,
    borderRadius: "10px",
    boxShadow: "0px 6px 18px 0px rgba(0,0,0,0.2)",
  },
  input: {
    maxWidth: "250px",
    minWidth: "250px",
    alignSelf: "center",
  },
  grid: {
    margin: "0 !important",
  },
  button: {
    lineHeight: "21px",
    color: "rgba(255,255,255,1)",
    fontSize: "17px",
    textTransform: "none",
    height: "44px",
    width: "260px",
    "&:hover": {
      backgroundColor: "#82C2FF",
    },
    margin: theme.spacing(1),
    marginTop: "33px",
    backgroundColor: "#44a2fc",
    borderRadius: "30px",
  },
  radio: {
    padding: "0",
    fontSize: "14px",
    // display: 'flex',
    alignItems: "center",
    paddingRight: "5px",
  },
}));

export default function IndexCard() {
  const classes = useStyles();
  const [defaulAccount] = useState({
    username: "wealth-admin",
    password: "vip123",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const routerCtx = useRouter();
  const mutationCtx = useGlobalMutation();
  const stateCtx = useGlobalState();

  useEffect(() => {
    mutationCtx.getCurrentStream();
  }, []);

  const hostLogin = () => {
    if (
      username === defaulAccount.username &&
      password === defaulAccount.password
    ) {
      mutationCtx.updateConfig({
        host: "host",
      });
      mutationCtx.startLoading();
      routerCtx.history.push({
        pathname: `/meeting/wealmanagement`,
      });
    } else {
      mutationCtx.toastError("Sai tài khoản hoặc mật khẩu !");
    }
  };

  const userLogin = () => {
    mutationCtx.updateConfig({
      host: 'audience',
    });
    mutationCtx.startLoading();
    routerCtx.history.push({
      pathname: `/lives`,
    });
    console.log(stateCtx.currentStream)
  };

  return (
    <Box
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
    >
      <Link to="/setting" className="setting-btn" />

      <span className="version">Wealth Management</span>
      <div className="role-container"></div>
      <Box
        marginTop="92"
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FormControl className={classes.grid}>
          {window.location.href.includes("/host") ? (
            <>
              <TextField
                label="Tên đăng nhập"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                label="Mật khẩu"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                onClick={hostLogin}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Start Live Streaming
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={userLogin}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Join Live Streaming
              </Button>
            </>
          )}
        </FormControl>
      </Box>
    </Box>
  );
}

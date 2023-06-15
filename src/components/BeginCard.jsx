import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import IndexCard from "./IndexCard";
import SettingsCard from "./SettingCard";

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
  coverContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "#fff",
    position: "relative",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    minWidth: 700,
    borderRadius: "10px",
    padding: "10px",
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
    height: "44px",
    width: "260px",
    "&:hover": {
      backgroundColor: "#307AFF",
    },
    margin: theme.spacing(1),
    marginTop: "33px",
    backgroundColor: "#44a2fc",
    borderRadius: "30px",
  },
}));

export default function CardPage() {
  const classes = useStyles();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="h-[600px] sm:h-auto w-[360px] sm:w-[600px] md:w-[800px] grid grid-cols-1 sm:grid-cols-2 shadow-5xl rounded-md">
          <div className="items-center flex-1 hidden sm:flex flex-col pb-[15px] rounded-md bg-[#307AFF] w-full sm:w-auto">
            <div className={classes.item}>
              <div className="cover-image" />
            </div>
            <div className={classes.item}>
              <div className={classes.coverContent}>
                <Box
                  textAlign="center"
                  fontSize="h6.fontSize"
                  className={classes.fontStyle}
                >
                  Welcome to
                </Box>
                <Box
                  textAlign="center"
                  fontWeight="fontWeightRegular"
                  fontSize="h4.fontSize"
                  className={classes.midItem}
                >
                  WEALTH <br></br> MANAGEMENT
                </Box>
                <Box
                  textAlign="center"
                  fontWeight="fontWeightRegular"
                  className={classes.fontStyle}
                  fontSize="h7.fontSize"
                >
                  Powered by GENSI
                </Box>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex flex-col w-full sm:w-auto">
            <h1 className="text-center text-prim-90 pt-5 text-3xl">Wealth Management</h1>
            <Switch>
              <Route exact path="/" component={IndexCard}></Route>
            </Switch>

            {/* <div className="my-3 text-center">
                Powered by GENSI
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

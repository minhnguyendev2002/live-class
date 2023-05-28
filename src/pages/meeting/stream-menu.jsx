import React from "react";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  menu: {
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  customBtn: {
    width: "50px",
    height: "50px",
    marginLeft: "20px",
    borderRadius: "26px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backgroundSize: "50px",
    cursor: "pointer",
  },
  leftAlign: {
    display: "flex",
    flex: "1",
    justifyContent: "space-evenly",
  },
  rightAlign: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
  },
  menuContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: "2",
  },
});

export default function StreamMenu(props) {
  const { muteVideo, muteAudio, shareScreen } = props;

  const classes = useStyles();

  function toggleVideo() {
    props.toggleVideo();
  }

  function toggleAudio() {
    props.toggleAudio();
  }

  function toggleShareScreen() {
    props.toggleShareScreen();
  }

  function leaveStream() {
    props.doLeave();
  }

  return (
    <>
      <div className="absolute bottom-10 left-0 w-full z-10">
        <div className="flex items-end sm:items-center justify-center gap-5">
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={toggleShareScreen}
          >
            <i className="text-white fa-solid fa-screencast text-lg" />
          </div>
          <div className="group inline-block sm:hidden">
            <div className="group-hover:h-[150px] sm:group-hover:h-[200px] h-[30px] sm:h-[40px] group-hover:pt-5 duration-300 overflow-hidden w-[30px] sm:w-[40px] flex flex-col bg-white/40 rounded-full px-3">
              <div className="flex-1 invisible group-hover:visible duration-100 transition-all"></div>
              <div className="text-center h-[30px] sm:h-[40px] flex flex-col items-center justify-center">
                <i className="text-white fas fa-volume-down text-lg relative -top-0.5" />
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={toggleAudio}
          >
            {muteAudio ? (
              <i className="text-white fas fa-microphone text-lg" />
            ) : (
              <i className="text-white fas fa-microphone-slash text-lg" />
            )}
          </div>
          <div
            className="cursor-pointer rounded-[25px] flex flex-col items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center bg-danger-100 duration-300 hover:bg-danger-80"
            onClick={leaveStream}
          >
            <i
              className="text-white fas fa-phone-alt text-xl"
              style={{ transform: "rotate(225deg)" }}
            />
          </div>
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={toggleVideo}
          >
            {muteVideo ? (
              <i className="text-white fas fa-video text-lg" />
            ) : (
              <i className="text-white fas fa-video-slash text-lg" />
            )}
          </div>
          <div className="sm:hidden cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
            <i className="text-white fas fa-comments text-lg" />
          </div>
          <div className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
            <i className="text-white fas fa-cog text-lg" />
          </div>
        </div>
      </div>
    </>
    // <div className={classes.menuContainer}>
    //     <div className={classes.menu}>
    //         <Tooltip title={muteVideo ? 'mute-video' : 'unmute-video'}>
    //             <i
    //                 onClick={toggleVideo}
    //                 className={clsx(
    //                     classes.customBtn,
    //                     muteVideo ? 'mute-video' : 'unmute-video'
    //                 )}
    //             />
    //         </Tooltip>
    //         <Tooltip title={muteAudio ? 'mute-audio' : 'unmute-audio'}>
    //             <i
    //
    //                 className={clsx(
    //                     classes.customBtn,
    //                     muteAudio ? 'mute-audio' : 'unmute-audio'
    //                 )}
    //             />
    //         </Tooltip>
    //         <Tooltip title={shareScreen ? 'stop-screen-share' : 'start-screen-share'}>
    //             <i
    //                 onClick={toggleShareScreen}
    //                 className={clsx(
    //                     classes.customBtn,
    //                     shareScreen ? 'start-screen-share' : 'stop-screen-share'
    //                 )}
    //             />
    //         </Tooltip>
    //     </div>
    // </div>
  );
}

{
  /* <div className="absolute bottom-10 left-0 w-full z-10">
                        <div className="flex items-end sm:items-center justify-center gap-5">
                          <div className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
                            <i className="text-white fa-solid fa-screencast text-lg" />
                          </div>
                          <div className="group inline-block sm:hidden">
                            <div className="group-hover:h-[150px] sm:group-hover:h-[200px] h-[30px] sm:h-[40px] group-hover:pt-5 duration-300 overflow-hidden w-[30px] sm:w-[40px] flex flex-col bg-white/40 rounded-full px-3">
                              <div className="flex-1 invisible group-hover:visible duration-100 transition-all">
                                <span className="MuiSlider-root MuiSlider-colorPrimary MuiSlider-vertical">
                                  <span className="MuiSlider-rail" />
                                  <span className="MuiSlider-track" style={{bottom: '0%', height: '30%'}} />
                                  <input type="hidden" defaultValue={30} />
                                  <span className="MuiSlider-thumb MuiSlider-thumbColorPrimary PrivateValueLabel-thumb-41" tabIndex={0} role="slider" data-index={0} aria-label="Âm lượng" aria-orientation="vertical" aria-valuemax={100} aria-valuemin={0} aria-valuenow={30} style={{bottom: '30%'}}>
                                    <span className="PrivateValueLabel-offset-43 MuiSlider-valueLabel">
                                      <span className="PrivateValueLabel-circle-44">
                                        <span className="PrivateValueLabel-label-45">30</span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div className="text-center h-[30px] sm:h-[40px] flex flex-col items-center justify-center">
                                <i className="text-white fas fa-volume-down text-lg relative -top-0.5" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
                            <i className="text-white fas fa-microphone text-lg" />
                          </div>
                          <div className="cursor-pointer rounded-[25px] flex flex-col items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center bg-danger-100 duration-300 hover:bg-danger-80">
                            <i className="text-white fas fa-phone-alt text-xl" style={{transform: 'rotate(225deg)'}} />
                          </div>
                          <div className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
                            <i className="text-white fas fa-video-slash text-lg" />
                          </div>
                          <div className="sm:hidden cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
                            <i className="text-white fas fa-comments text-lg" />
                          </div>
                          <div className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70">
                            <i className="text-white fas fa-cog text-lg" />
                          </div>
                        </div>
                      </div> */
}

import React from "react";

export default function StreamMenu(props) {
  const { muteVideo, muteAudio, shareScreen, showPopupComment } = props;

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

  const showComment = () => {
    showPopupComment();
  };

  return (
    <>
      <div className="absolute bottom-10 left-0 w-full z-10">
        <div className="flex items-end sm:items-center justify-center gap-5">
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={toggleShareScreen}
          >
            <i className="text-white fa-solid fa-screencast text-lg" />
          </div>
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
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
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={toggleVideo}
          >
            {muteVideo ? (
              <i className="text-white fas fa-video text-lg" />
            ) : (
              <i className="text-white fas fa-video-slash text-lg" />
            )}
          </div>
          <div
            className="sm:hidden cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={showComment}
          >
            <i className="text-white fas fa-comments text-lg" />
          </div>
          <div className="w-[40px] h-[40px]"></div>
        </div>
      </div>
    </>
  );
}

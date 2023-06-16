import React from "react";

export default function StreamMenu(props) {
  const { muteVideo, muteAudio, shareScreen, showControll, toggleControll } =
    props;

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

  function _toggleControll() {
    toggleControll();
  }

  return (
    <>
      <div
        className={
          showControll
            ? "translate-x-full lg:translate-x-0 absolute bottom-0 p-2 z-[100] left-0 w-full transition-all duration-500"
            : "translate-x-0 lg:translate-x-0 absolute bottom-0 p-2 z-[100] left-0 w-full transition-all duration-500"
        }
      >
        <div className="flex items-end sm:items-center justify-center py-2 rounded-md bg-white lg:bg-transparent gap-5">
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-prim-90 hover:bg-prim-90/60 lg:bg-white/40 duration-300 lg:hover:bg-white/70"
            onClick={toggleShareScreen}
          >
            <i className="text-white fas fa-tv text-lg" />
          </div>
          <div
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-prim-90 hover:bg-prim-90/60 lg:bg-white/40 duration-300 lg:hover:bg-white/70"
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
            className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-prim-90 hover:bg-prim-90/60 lg:bg-white/40 duration-300 lg:hover:bg-white/70"
            onClick={toggleVideo}
          >
            {muteVideo ? (
              <i className="text-white fas fa-video text-lg" />
            ) : (
              <i className="text-white fas fa-video-slash text-lg" />
            )}
          </div>
          <div
            className="lg:hidden cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-prim-90 hover:bg-prim-90/60 lg:bg-white/40 duration-300 lg:hover:bg-white/70"
            onClick={_toggleControll}
          >
            <i class="text-white fas fa-times text-lg"></i>
          </div>
          <div
            className="hidden lg:block w-[40px] h-[40px]"
          >
          </div>
        </div>
      </div>
    </>
  );
}

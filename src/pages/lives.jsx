import React, { useEffect, useState, useMemo, useRef } from "react";
import { useGlobalState, useGlobalMutation } from "../utils/container";
import useRouter from "../utils/use-router";
import RTCClient from "../rtc-client";
import StreamPlayer from "./meeting/stream-player";
import ChatPopup from "../components/ChatPopup";
import Loading from "../utils/loading";
import {
  updateCurrentLive,
  deleteLive,
  getCurrentLive,
} from "../utils/services";

const Audience = () => {
  const routerCtx = useRouter();
  const stateCtx = useGlobalState();
  const mutationCtx = useGlobalMutation();
  const [muteVideo, setMuteVideo] = useState(stateCtx.muteVideo);
  const [muteAudio, setMuteAudio] = useState(stateCtx.muteAudio);
  const [VideoTrack, setVideoTrack] = useState(null);
  const [AudioTrack, setAudioTrack] = useState(null);

  const onUserPublished = (remoteUser, mediaType) => {
    localClient
      .subscribe(remoteUser, mediaType)
      .then((mRemoteTrack) => {
        if (mediaType === "video" || mediaType === "all") {
          setVideoTrack(remoteUser._videoTrack);
          setAudioTrack(remoteUser._audioTrack);
        }
      })
      .catch((err) => {
        mutationCtx.toastError(
          `stream ${remoteUser.getId()} subscribe failed: ${err}`
        );
      });
  };

  const onUserUnpublished = (remoteUser, mediaType) => {
    if (mediaType === "video" || mediaType === "all") {
    }
  };

  const config = useMemo(() => {
    return {
      token: stateCtx.config.token,
      channel: `${process.env.REACT_APP_AGORA_APP_CHANNEL}`,
      microphoneId: stateCtx.config.microphoneId,
      cameraId: stateCtx.config.cameraId,
      uid: stateCtx.config.uid,
      host: stateCtx.config.host,
    };
    //eslint-disable-next-line
  }, [stateCtx]);

  const localClient = useMemo(() => {
    const client = new RTCClient();
    client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode });

    client.on("user-published", onUserPublished);
    client.on("user-unpublished", onUserUnpublished);

    return client;
    //eslint-disable-next-line
  }, [stateCtx.codec, stateCtx.mode]);

  useEffect(() => {
    if (
      config.channel &&
      localClient._created &&
      localClient._joined === false &&
      localClient._leave === false
    ) {
      localClient.setClientRole("audience");
      localClient
        .join(config.channel, config.token)
        .then((uid) => {
          config.uid = uid;
          // this.onUserPublished();
          mutationCtx.stopLoading();
        })
        .catch(async (err) => {
          await mutationCtx.toastError(`join error: ${err.info}`);
          routerCtx.history.push("/");
        });
    }
  }, [localClient, mutationCtx, config, routerCtx]);

  // useEffect(() => {
  //   let timer1 = setTimeout(() => {
  //     localClient.on("user-published", (user, mediaType) => {
  //       onUserPublished()
  //     });
  //   }, 1000);


  //   return () => {
  //     clearTimeout(timer1);
  //   };

  // }, [localClient]);

  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-between items-center py-10 px-3">
        <div>
          <img
            className="w-10 h-10 object-cover"
            src="https://inkythuatso.com/uploads/images/2021/11/porsche-logo-inkythuatso-2-01-12-14-55-43.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#bec4cd] hover:text-[#00a389] duration-300 px-4 py-3 rounded hover:bg-[#d1e6e7] nav-item">
            <i className="text-lg fas fa-tachometer-alt" />
          </div>
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#bec4cd] hover:text-[#00a389] duration-300 px-4 py-3 rounded hover:bg-[#d1e6e7] nav-item">
            <i className="text-lg fas fa-calendar-alt" />
          </div>
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#bec4cd] hover:text-[#00a389] duration-300 px-4 py-3 rounded hover:bg-[#d1e6e7] nav-item">
            <i className="text-lg fas fa-eye" />
          </div>
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#bec4cd] hover:text-[#00a389] duration-300 px-4 py-3 rounded hover:bg-[#d1e6e7] nav-item">
            <i className="text-lg fas fa-user" />
          </div>
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#bec4cd] hover:text-[#00a389] duration-300 px-4 py-3 rounded hover:bg-[#d1e6e7] nav-item">
            <i className="text-lg far fa-chart-bar" />
          </div>
          <div className="cursor-pointer text-center flex flex-col justify-center items-center text-[#00a389] bg-[#d1e6e7] duration-300 px-4 py-3 rounded relative after:absolute after:w-1 after:h-full after:rounded after:bg-[#00a389] after:-right-3">
            <i className="text-lg fas fa-video" />
          </div>
        </div>
        <div>
          <img
            className="w-10 h-10 object-cover rounded-full shadow-chat"
            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png"
            alt=""
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full h-full">
          <div className="sm:p-5 py-2 px-2 bg-white h-screen">
            <div className="flex h-full overflow-hidden">
              <div className="flex-1 flex flex-col">
                <div className="hidden sm:block">
                  <div className="text-center sm:text-left relative text-2xl font-semibold mb-0 pb-4 border-b-[1px] border-prim-40/50 flex gap-5 items-center">
                    <span className="text-center flex flex-col items-center justify-center py-3 px-4 text-[#9da5b0] bg-[#f0f1f3] cursor-pointer rounded-md">
                      <i className="fas fa-angle-left text-xs" />
                    </span>
                    <h1 className="mb-0">Wealth Management Livestream</h1>
                  </div>
                </div>
                <div className="py-3 hidden sm:flex items-center justify-between flex-wrap">
                  <div className="flex gap-5 items-center flex-col lg:flex-row">
                    <div className="font-semibold text-lg">
                      <span className="mr-2">
                        <i className="fas fa-users" />
                      </span>
                      Số người xem:{" "}
                      <span className="bg-success-20 text-success-100 py-1 px-2 rounded ml-2">
                        2
                      </span>
                    </div>
                    <div className="font-semibold text-lg ">
                      <span className="mr-2">
                        <i className="fas fa-user-slash" />
                      </span>
                      Người vắng mặt:{" "}
                      <span className="bg-danger-20 text-danger-100 py-1 px-2 rounded ml-2">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center  flex-col-reverse lg:flex-row">
                    <div className="hover:bg-[#d1e6e7] font-semibold text-lg text-[#00a389] duration-300 cursor-pointer py-2 px-3 rounded flex gap-3 items-center">
                      <span className="text-center flex flex-col items-center justify-center py-2 px-2 bg-[#00a389] text-white rounded-md">
                        <i className="fas fa-plus text-2xs" />
                      </span>
                      Chia sẻ Live Stream
                    </div>
                    <div className="group hover:bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer hidden lg:flex items-center gap-3 py-1 px-2 rounded">
                      <i className="fas fa-comments text-xl text-[#00a389] duration-300" />
                      <span className="font-semibold text-lg text-[#00a389] duration-300">
                        ẩn
                      </span>
                    </div>
                    <div className="group hover:bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer lg:hidden flex items-center gap-3 py-2 px-3 rounded">
                      <i className="fas fa-comments text-xl text-[#00a389] duration-300" />
                      <span className="font-semibold text-lg text-[#00a389] duration-300">
                        Xem bình luận
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative bg-black rounded-xl w-full h-full overflow-hidden">
                  <div className="absolute top-5 left-5 z-[20] flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded object-cover"
                      src="https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dW5pZm9ybWV8ZW58MHx8MHx8&w=1000&q=80"
                      alt="/"
                    />
                    <div className="text-white mb-auto h-full">
                      <span className="font-medium">Publisher</span>
                      <h2 className="text-white text-2xl leading-5 mb-0">
                        Harry Kane
                      </h2>
                    </div>
                  </div>
                  <div className="stream-player h-full" id="stream-player-0">
                    <div className="absolute z-20 top-5 left-1/2 -translate-x-1/2 flex w-max justify-between gap-5">
                      <div className="sm:hidden z-[10] flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white/40 text-white flex-shrink-0">
                        <span className="p-2 rounded-full w-8 h-8 flex flex-col justify-center items-center bg-white text-center">
                          <i className="fas fa-eye text-success-100" />
                        </span>
                        <span className="text-white font-semibold text-lg">
                          1
                        </span>
                      </div>
                      <div className="z-[10] flex items-center gap-5 pl-6 pr-8 py-3 rounded-lg bg-white/40 text-white flex-shrink-0">
                        <span className="p-1 rounded-full w-3 h-3 flex flex-col justify-center items-center bg-white text-center">
                          <i className="text-danger-100 text-[5px] fas fa-circle" />
                        </span>
                        <span className="text-white font-semibold text-xl">
                          {/* {formatTime(elapsedTime)} */}
                        </span>
                      </div>
                    </div>

                    <div className="stream-uid">UID: 0</div>
                    {stateCtx.loading ? (
                      <>
                        <Loading />
                      </>
                    ) : (
                      <>
                        <StreamPlayer
                          uid={config.uid}
                          isLocal={true}
                          videoTrack={VideoTrack}
                          audioTrack={AudioTrack}
                          muteAudio={muteAudio}
                          muteVideo={muteVideo}
                          showInfo={stateCtx.profile}
                          rtcClient={localClient._client}
                        ></StreamPlayer>
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-11 left-10 sm:left-20 z-20 hidden sm:inline-block">
                    <div className="group">
                      <div className="group-hover:h-[150px] h-[40px] group-hover:pt-5 duration-300 overflow-hidden w-[40px] flex flex-col bg-white/40 rounded-full">
                        <div className="flex-1 invisible !mx-auto group-hover:visible duration-100 transition-all" />
                        <div className="text-center h-[40px] flex flex-col items-center justify-center ">
                          <i className="text-white fas fa-volume-down text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[380px] ml-10 hidden lg:block duration-500">
                <ChatPopup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audience;

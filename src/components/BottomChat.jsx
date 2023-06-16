import React, { useState, useEffect, memo, useRef } from "react";
import io from "socket.io-client";
import LoginModal from "./LoginModal";
import {
  getCurrentUser,
  getAllMessage,
  createMessage,
  deleteMessage,
} from "../utils/services";
import { useGlobalMutation } from "../utils/container";
import { Button, Popconfirm } from "antd";

const socketEndpoint = process.env.REACT_APP_API_HOST;

const ChatPopup = ({
  setUserConnected = () => {},
  toggleControll,
  isHost = false,
}) => {
  const mutationCtx = useGlobalMutation();

  const bottomDiv = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("currentUser") !== null ? true : false
  );

  const _toggleControll = () => {
    toggleControll();
  };

  const [currentUser, setCurrentUser] = useState(null);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const [isShowModal, setIsShowModal] = useState(false);

  const getCurrentUserOnLogin = async () => {
    setIsLogin(localStorage.getItem("currentUser") !== null ? true : false);
    if (isLogin) {
      const { data } = await getCurrentUser();
      setCurrentUser(data?.user);
    }
  };

  const showLoginModal = () => {
    setIsShowModal(true);
  };

  const hiddenLoginModal = async () => {
    getCurrentUserOnLogin();
    setIsShowModal(false);
  };

  useEffect(() => {
    fetchMessages();
    getCurrentUserOnLogin();

    const newSocket = io(socketEndpoint);

    setSocket(newSocket);
    newSocket.connect();

    newSocket.emit("setup");

    newSocket.on("connected", () => {
      console.log("Socket is connected");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket is disconnected");
      setIsConnected(false);
    });

    return () => {
      if (socket) {
        socket.emit("disconnect");
        socket.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await getAllMessage();
      setChat(data?.messages || []);
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const keyPressChat = async (event) => {
    if (!isLogin) {
      showLoginModal();
    } else {
      if (message !== "" && event.key === "Enter") {
        await newMessage(message);
        setMessage("");
      }
    }
  };

  const addMessage = async (type) => {
    if (!isLogin) {
      showLoginModal();
    } else {
      let _message = "";
      switch (type) {
        case "flowers":
          _message = "🌹🌹 Thả hoa 🌹🌹";
          break;
        case "clap":
          _message = "👏👏 Vỗ tay 👏👏";
          break;
        case "love":
          _message = "💓💓 Yêu thích 💓💓";
          break;
        case "cheer":
          _message = "🍻🍻 Cổ vũ 🍻🍻";
          break;
        case "good":
          _message = "👍👍 Tuyệt vời 👍👍";
          break;
        default:
          _message = message;
          setMessage("");
      }
      await newMessage(_message);
    }
  };

  const newMessage = async (_message) => {
    try {
      await createMessage({
        sender: currentUser,
        content: _message,
      });
      setChat((prev) => [
        ...prev,
        {
          sender: currentUser,
          content: _message,
        },
      ]);
      socket.emit("new message", {
        sender: currentUser,
        content: _message,
      });
      if (bottomDiv.current) {
        bottomDiv.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket && !isConnected) {
      socket.on("message recieved", (newMessageRecieved) => {
        if (currentUser) {
          if (newMessageRecieved.sender.crmId !== currentUser.crmId) {
            setChat((prev) => [...prev, { ...newMessageRecieved }]);
          }
        }
      });
    }
  });

  useEffect(() => {
    if (socket && !isConnected) {
      socket.on("connected user", (params) => {
        setUserConnected(params);
      });
    }
  });

  const confirmDelete = async (params) => {
    try {
      await deleteMessage(params);
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:hidden">
      <LoginModal
        showLoginModal={isShowModal}
        hiddenLoginModal={hiddenLoginModal}
      />

      <div className="absolute w-full z-50 right-0 bottom-0">
        <div className="flex-1 bg-transparent pr-3 py-3 overflow-hidden">
          <div className="pl-3 pr-5 h-[280px] lg:h-full max-h-screen overflow-y-scroll custom-scroll-element">
            <div className="flex flex-col h-full gap-3">
              {chat.length > 0 &&
                chat.slice(-20).map((_message, index) => {
                  return (
                    <div key={index}>
                      <div className="flex gap-3 items-start justify-start">
                        <img
                          className="w-10 h-10 object-cover rounded-full"
                          src={
                            _message.sender.avatar ||
                            "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                          }
                          alt=""
                        />
                        <div className="relative bg-[#fafafa]/20 py-1 px-3 rounded-lg">
                          <div className="flex gap-3">
                            <span
                              className={
                                currentUser &&
                                _message.sender.crmId === currentUser.crmId
                                  ? `text-left font-semibold block text-base text-white`
                                  : `text-left font-semibold block text-base text-white`
                              }
                            >
                              {_message.sender.fullname}
                            </span>
                            {currentUser &&
                              currentUser.role === "controller" && (
                                <Popconfirm
                                  title="Xóa bình luận"
                                  description="Bạn chắc chắn xóa bình luận này chứ"
                                  okText="Có"
                                  cancelText="Không"
                                  onConfirm={() => confirmDelete(_message._id)}
                                >
                                  <span className="text-sm font-semibold text-danger-800 cursor-pointer">
                                    Xóa
                                  </span>
                                </Popconfirm>
                              )}
                          </div>
                          <div
                            className={
                              currentUser &&
                              _message.sender.crmId === currentUser.crmId
                                ? `rounded-lg shadow-chat text-base text-white`
                                : `rounded-lg shadow-chat text-base text-white`
                            }
                          >
                            {_message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div ref={bottomDiv} />
            </div>
          </div>
        </div>

        <div className="bg-transparent !flex-1 px-3">
          <div className="flex justify-start gap-3 w-full">
            <button
              className="bg-[#fafafa]/20 px-2 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] text-white"
              onClick={() => addMessage("flowers")}
            >
              Thả hoa
            </button>
            <button
              className="bg-[#fafafa]/20 px-2 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] text-white"
              onClick={() => addMessage("clap")}
            >
              Vỗ tay
            </button>
            <button
              className="bg-[#fafafa]/20 px-2 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] text-white"
              onClick={() => addMessage("love")}
            >
              Yêu thích
            </button>
            <button
              className="bg-[#fafafa]/20 px-2 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] text-white"
              onClick={() => addMessage("cheer")}
            >
              Cổ vũ
            </button>
            <button
              className="bg-[#fafafa]/20 px-2 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] text-white"
              onClick={() => addMessage("good")}
            >
              Tuyệt vời
            </button>
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="px-3 py-3 bg-transparent w-[255px]">
            <div className="flex items-center px-3 py-2 bg-[#fafafa]/20 rounded-md shadow-2xl">
              <input
                placeholder="Viết bình luận"
                className="h-full flex-1 !border-0 !outline-none bg-transparent text-white !shadow-none text-lg font-semibold"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={keyPressChat}
              />
              <div
                className="cursor-pointer flex flex-col items-center justify-center w-[40px] h-[25px] rounded-[5px]"
                onClick={() => message !== "" && addMessage()}
              >
                <i className=" text-white fas fa-paper-plane text-sm"></i>
              </div>
            </div>
          </div>
          {isHost && (
            <div
              className="cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-prim-90 hover:bg-prim-90/60 lg:bg-white/40 duration-300 lg:hover:bg-white/70"
              onClick={_toggleControll}
            >
              <i class="text-white fas fa-cogs text-lg"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ChatPopup);

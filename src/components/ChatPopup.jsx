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

const ChatPopup = ({ setUserConnected = () => {}, showPopup }) => {
  const mutationCtx = useGlobalMutation();

  const bottomDiv = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("currentUser") !== null ? true : false
  );

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
      const { data } = await deleteMessage(params);
      setChat(data?.messages || []);
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginModal
        showLoginModal={isShowModal}
        hiddenLoginModal={hiddenLoginModal}
      />

      <div
        className={
          showPopup
            ? "w-full lg:w-[400px] ml-10 h-full block duration-500"
            : "w-full lg:w-[0px] ml-0 h-full block duration-500"
        }
      >
        <div className="relative z-[20] w-full h-full mx-auto mr-[20px]">
          <div className="flex flex-col overflow-hidden rounded-md h-full">
            <div className="hidden md:flex px-5 py-3 items-center bg-prim-10">
              <h2 className="text-2xl mb-0 flex-1">Nhóm Chat</h2>
              <div className="flex gap-3">
                <div className="group bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer flex items-center gap-3 py-2 px-3 rounded">
                  <span className="font-semibold text-lg text-[#00a389] duration-300">
                    Tin Nhắn
                  </span>
                </div>
                <div className="group hover:bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer flex items-center gap-3 py-2 px-3 rounded">
                  <span className="font-semibold text-lg text-[#00a389] duration-300">
                    Tham Gia
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 border-t-[0.5px] border-prim-40/50 bg-prim-10 pr-3 py-3 overflow-hidden">
              <div className="px-5 h-[500px] lg:h-full max-h-screen overflow-y-scroll custom-scroll-element">
                <div className="flex flex-col h-full gap-5">
                  {chat.length > 0 &&
                    chat.slice(-20).map((_message, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={
                              currentUser &&
                              _message.sender.crmId === currentUser.crmId
                                ? `flex gap-5 items-end justify-end`
                                : `flex gap-5 items-end justify-start`
                            }
                          >
                            <div className="relative">
                              <div className="flex gap-3">
                                <span
                                  className={
                                    currentUser &&
                                    _message.sender.crmId === currentUser.crmId
                                      ? `text-right font-medium mb-1 block flex-1`
                                      : `text-left font-medium mb-1 block flex-1`
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
                                      onConfirm={() =>
                                        confirmDelete(_message._id)
                                      }
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
                                    ? `px-5 py-3 rounded-lg  shadow-chat font-semibold text-lg bg-[#d0d3e3]`
                                    : `px-5 py-3 rounded-lg  shadow-chat font-semibold text-lg bg-white`
                                }
                              >
                                {_message.content}
                              </div>
                              {currentUser &&
                              _message.sender.crmId === currentUser.crmId ? (
                                <span className="w-0 h-0 border-b-[20px] border-b-[#d0d3e3] border-r-[20px] border-r-transparent absolute bottom-3 -right-3" />
                              ) : (
                                <span className="w-0 h-0 border-b-[20px] border-b-white border-l-[20px] border-r-transparent absolute bottom-3 -left-5" />
                              )}
                            </div>
                            <img
                              className={
                                currentUser &&
                                _message.sender.crmId === currentUser.crmId
                                  ? `w-10 h-10 object-cover rounded-full order-none`
                                  : `w-10 h-10 object-cover rounded-full -order-1`
                              }
                              src={
                                _message.sender.avatar ||
                                "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                  <div ref={bottomDiv} />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-prim-10">
                <div className="flex justify-center px-3 flex-wrap gap-3 pt-3">
                  <button
                    className="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                    onClick={() => addMessage("flowers")}
                  >
                    🌹 Thả hoa
                  </button>
                  <button
                    className="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                    onClick={() => addMessage("clap")}
                  >
                    👏 Vỗ tay
                  </button>
                  <button
                    className="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                    onClick={() => addMessage("love")}
                  >
                    💓 Yêu thích
                  </button>
                  <button
                    className="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                    onClick={() => addMessage("cheer")}
                  >
                    🍻 Cổ vũ
                  </button>
                  <button
                    className="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                    onClick={() => addMessage("good")}
                  >
                    👍 Tuyệt vời
                  </button>
                </div>
              </div>
              <div className="px-3 py-3 bg-prim-10">
                <div className="w-full flex items-center px-3 py-2 bg-white rounded-md shadow-2xl">
                  <input
                    placeholder="Viết bình luận"
                    className="h-full flex-1 !border-0 !outline-none !shadow-none text-lg font-semibold"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={keyPressChat}
                  />
                  <div
                    className="cursor-pointer flex flex-col items-center justify-center bg-[#00a389] w-[60px] h-[50px] rounded-md"
                    onClick={() => message !== "" && addMessage()}
                  >
                    <i className=" text-white fas fa-paper-plane"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ChatPopup);

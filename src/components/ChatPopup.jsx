import React, { useState } from "react";

const ChatPopup = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const keyPressChat = (event) => {
    if (event.key === "Enter") {
      setChat((prev) => [
        ...prev,
        {
          name: "You",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmIS_3FGbueS2g6m5G4fevSubr9loG55z9v6QkU3tbw&s",
          content: message,
        },
      ]);
      setMessage("");
    }
  };

  const addMessage = (type) => {
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
    setChat((prev) => [
      ...prev,
      {
        name: "You",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmIS_3FGbueS2g6m5G4fevSubr9loG55z9v6QkU3tbw&s",
        content: _message,
      },
    ]);
  };

  return (
    <>
      <div class="relative z-[20] w-full h-full mx-auto mr-[20px]">
        <div class="h-full flex flex-col overflow-hidden rounded-md">
          <div class="px-5 py-3 flex items-center bg-prim-10">
            <h2 class="text-2xl mb-0 flex-1">Nhóm Chat</h2>
            <div class="flex gap-3">
              <div class="group bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer flex items-center gap-3 py-2 px-3 rounded">
                <span class="font-semibold text-lg text-[#00a389] duration-300">
                  Tin Nhắn
                </span>
              </div>
              <div class="group hover:bg-[#d1e6e7] border-2 border-solid border-transparent duration-300 cursor-pointer flex items-center gap-3 py-2 px-3 rounded">
                <span class="font-semibold text-lg text-[#00a389] duration-300">
                  Tham Gia
                </span>
              </div>
            </div>
          </div>
          <div class="flex-1 border-t-[0.5px] border-prim-40/50 bg-prim-10 pr-3 py-3 overflow-hidden">
            <div class="px-5 h-full overflow-y-scroll custom-scroll-element">
              <div class="flex flex-col h-full gap-5">
                <div class="flex gap-5 items-end relative">
                  <img
                    class="w-10 h-10 object-cover rounded-full flex-shrink-0"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                    alt=""
                  />
                  <div class="relative">
                    <span class="font-medium mb-1 block">Lisa Tran</span>
                    <div class="bg-white px-5 py-3 rounded-lg shadow-chat font-semibold text-lg">
                      Kiến thức này mới đấy nhỉ
                    </div>
                  </div>
                </div>
                <div class="flex gap-5 items-end relative">
                  <img
                    class="w-10 h-10 object-cover rounded-full flex-shrink-0"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-trung-quoc-2.jpg"
                    alt=""
                  />
                  <div class="relative">
                    <span class="font-medium mb-1 block">Rose Pham Nguyen</span>
                    <div class="bg-white px-5 py-3 rounded-lg shadow-chat font-semibold text-lg">
                      Cập nhật liên tục nhỉ
                    </div>
                  </div>
                </div>
                <div class="flex gap-5 items-end relative">
                  <img
                    class="w-10 h-10 object-cover rounded-full flex-shrink-0"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                    alt=""
                  />
                  <div class="relative">
                    <span class="font-medium mb-1 block">Kim Tan</span>
                    <div class="bg-white px-5 py-3 rounded-lg shadow-chat font-semibold text-lg">
                      Hôm nay có ổn không mọi người ơi 😂😂
                    </div>
                  </div>
                </div>
                {chat.map((_message) => {
                  return (
                    <>
                      <div class="flex gap-5 justify-end items-end">
                        <div class="relative">
                          <span class="font-medium mb-1 block">
                            {_message.name}
                          </span>
                          <div class="px-5 py-3 rounded-lg bg-[#d0d3e3] shadow-chat font-semibold text-lg">
                            {_message.content}
                          </div>
                          <span class="w-0 h-0 border-b-[20px] border-b-[#d0d3e3] border-r-[20px] border-r-transparent absolute bottom-3 -right-3" />
                        </div>
                        <img
                          class="w-10 h-10 object-cover rounded-full"
                          src={_message.avatar}
                          alt=""
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div class="bg-prim-10">
              <div class="flex justify-center px-3 flex-wrap gap-3">
                <button
                  class="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                  onClick={() => addMessage("flowers")}
                >
                  🌹 Thả hoa
                </button>
                <button
                  class="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                  onClick={() => addMessage("clap")}
                >
                  👏 Vỗ tay
                </button>
                <button
                  class="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                  onClick={() => addMessage("love")}
                >
                  💓 Yêu thích
                </button>
                <button
                  class="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                  onClick={() => addMessage("cheer")}
                >
                  🍻 Cổ vũ
                </button>
                <button
                  class="bg-white px-3 py-1 rounded-sm cursor-pointer duration-300 hover:bg-[#00a389] hover:text-white"
                  onClick={() => addMessage("good")}
                >
                  👍 Tuyệt vời
                </button>
              </div>
            </div>
            <div class="px-3 py-3 bg-prim-10">
              <div class="w-full flex items-center px-3 py-2 bg-white rounded-md shadow-2xl">
                <input
                  placeholder="Viết bình luận"
                  class="h-full flex-1 !border-0 !outline-none !shadow-none text-lg font-semibold"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={keyPressChat}
                />
                <div
                  class="cursor-pointer flex flex-col items-center justify-center bg-[#00a389] w-[60px] h-[50px] rounded-md"
                  onClick={() => addMessage()}
                >
                  <i class=" text-white fas fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPopup;

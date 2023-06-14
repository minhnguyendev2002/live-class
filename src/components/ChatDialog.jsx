import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import ChatPopup from "./ChatPopup";

const ChatModal = ({ showChatModal, hiddenChatModal }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    hiddenChatModal();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Bình luận"
        open={showChatModal}
        onCancel={handleCancel}
        footer={false}
      >
        <ChatPopup />
      </Modal>
    </>
  );
};

export default ChatModal;

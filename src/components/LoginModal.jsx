import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { login } from "../utils/services";

const LoginModal = ({ showLoginModal, hiddenLoginModal }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const { data } = await login(values);
      localStorage.setItem("currentUser", data.accessToken);
      hiddenLoginModal();
    } catch {
      messageApi.info("Đã có lỗi xảy ra");
    }
  };

  const handleCancel = () => {
    hiddenLoginModal();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Đăng nhập"
        open={showLoginModal}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="text-center mt-5">
          <h2 className="text-3xl">Chào mừng đến với Wealth Management</h2>
        </div>
        <Form
          name="wrap"
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-8 mt-5"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
              <Button type="primary" className="!bg-prim-100" htmlType="submit">
                Đăng nhập
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;

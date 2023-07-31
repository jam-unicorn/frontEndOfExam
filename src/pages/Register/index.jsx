import { useState } from 'react';
import { navHelper } from '@/core/routes/navHelper';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import InputPhone from '@/features/InputPhone';

const { Item, useForm } = Form;
const Register = () => {
  const [formInstance] = useForm();
  const [verificationCode, setVerificationCode] = useState(''); // 添加状态来保存验证码
  const [isSendingCode, setIsSendingCode] = useState(false); // 添加状态来表示是否正在发送验证码
  const navInstance = navHelper();

  const sendVerificationCode = () => {
    // TODO: 实现发送验证码的逻辑
    setIsSendingCode(true); // 设置发送状态为 true
   
    setTimeout(() => {
      setIsSendingCode(false); // 设置发送状态为 false
      message.success('验证码已发送');
    }, 2000);
  };

  const submit = () => {
    formInstance.validateFields().then((params) => {
      const loginParams = { ...params, verificationCode }; // 将验证码加入登录请求参数
      login(loginParams)?.then((res) => {
        message.success('登录成功');
        localStorage.setItem('refresh_token', res.data.data.refresh_token);
        localStorage.setItem('loginData', JSON.stringify(res.data.data.user));
        localStorage.setItem('access_token', res.data.data.access_token);
        navInstance?.toUserList();
      });
    });
  };

  const toLogin = () => {
    navInstance?.toLogin() // 执行登录页面的导航操作
  }

  return (
    <div className="h-[100vh] bg-gradient-to-r from-blue-400 to-green-500 flex justify-center items-center">
      <div className="bg-[#fff] w-[400px] h-[400px] rounded-[8px] backdrop-filter-hover flex justify-center items-center flex-col gap-[20px]">
        <h1>注册</h1>
        <Form form={formInstance}>
          <InputPhone />
          <Row gutter={8}>
            <Col span={16}>
              <Item
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
              >
                <Input placeholder="短信验证码" onChange={(e) => setVerificationCode(e.target.value)} />
              </Item>
            </Col>
            <Col span={8}>
              <Button onClick={sendVerificationCode} loading={isSendingCode}>
                发送验证码
              </Button>
            </Col>
          </Row>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password placeholder="设置登录密码" />
          </Item>
          <Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('请同意用户使用协议'),
              },
            ]}
            noStyle
          >
            <Checkbox>已阅读并同意用户使用协议</Checkbox>
          </Item>
          <div className="flex gap-[10px]">
          <Button onClick={toLogin}>确认</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register
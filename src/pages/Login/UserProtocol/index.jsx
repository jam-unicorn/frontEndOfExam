import { Checkbox, ConfigProvider } from 'antd'

const UserProtocol = () => (
  <Form.Item
    name="agreement"
    valuePropName="checked"
    rules={[
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error('请同意《用户服务协议》')),
      },
    ]}
  >
    <ConfigProvider theme={{ token: { colorPrimary: '#387676' } }}>
      <Checkbox>
        已阅读并同意{' '}
        <a color="#ffffff" href="">
          《用户服务协议》
        </a>
      </Checkbox>
    </ConfigProvider>
  </Form.Item>
)

export default UserProtocol

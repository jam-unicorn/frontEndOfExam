import { ConfigProvider } from 'antd'

export default function InputPassword() {
  const { Item } = Form
  const [passwordVisible, setPasswordVisible] = useState(false)
  const style = {
    border: '0px',
    background: 'transparent',
    width: '189px',
    height: '48px',
    boxShadow: 'transparent',
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#ffffff', colorErrorOutline: '#ffffff' },
        }}
      >
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password
            style={style}
            placeholder="登录密码"
            size="large"
            allowClear
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            iconRender={(visible) => (visible ? '' : '')}
          />
        </Item>
      </ConfigProvider>
      <ConfigProvider theme={{ token: { colorPrimary: '#387676' } }}>
        <Switch
          className="switch"
          checkedChildren="123"
          unCheckedChildren="***"
          onClick={() => setPasswordVisible((prevState) => !prevState)}
        />
      </ConfigProvider>
    </>
  )
}

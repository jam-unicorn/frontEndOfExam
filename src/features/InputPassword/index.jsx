export default function InputPassword() {
  const { Item } = Form
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <>
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
          placeholder="登录密码"
          variant="borderless"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          iconRender={(visible) => (visible ? '' : '')}
        />
      </Item>
      <Switch
        className="switch"
        checkedChildren="123"
        unCheckedChildren="***"
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      />
    </>
  )
}

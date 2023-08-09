import { login } from '@/domains/login'
import { navHelper } from '@/core/routes/navHelper'
import InputPhone from '@/features/InputPhone'

const { Item, useForm } = Form
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formInstance] = useForm()
  const navInstance = navHelper()
  const submit = () => {
    formInstance.validateFields().then((params) => {
      login(params)?.then((res) => {
        message.success('登录成功')
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        localStorage.setItem('loginData', JSON.stringify(res.data.data.user))
        localStorage.setItem('access_token', res.data.data.access_token)
        navInstance?.toUserList()
      })
    })
  }

  return (
    <div className="h-[100vh] bg-gradient-to-r from-blue-400 to-green-500 flex justify-center items-center">
      <div className="bg-[#fff] w-[400px] h-[400px] rounded-[8px] backdrop-filter-hover flex justify-center items-center flex-col gap-[20px]">
        <h1>登录</h1>
        <Form form={formInstance}>
          <InputPhone />
          <div>
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
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                iconRender={(visible) => (visible ? '' : '')}
              />
            </Item>
            <Switch
              checkedChildren="123"
              unCheckedChildren="***"
              onClick={() => setPasswordVisible((prevState) => !prevState)}
            />
          </div>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <div className="flex gap-[10px]">
            <Button onClick={submit}>登录</Button>
            <Button>注册</Button>
          </div>
          <Divider>Or</Divider>
          <Button onClick={navInstance.toChoosCity}>微信账号登录</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login

import { login } from '@/domains/login'
import { navHelper } from '@/core/routes/navHelper'
import InputPhone from '@/features/InputPhone'
import InputPassword from '@/features/InputPassword'
import UserProtocol from '@/pages/Login/UserProtocol'
import './index.scss'
import '../../styles/style.css'
import '../../styles/axure_rp_page.css'

const { useForm } = Form
const Login = () => {
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
    <div>
      <div id="base">
        <div className="company_icon">
          <img className="img" src="images/登录页面/u41.png"></img>
          <div className="text">无象公考</div>
        </div>
        <div className="box">
          <Form form={formInstance}>
            <div className="phone_number">
              <img className="img" src="images/登录页面/u18.svg" />
              <div className="input_box">
                <InputPhone />
              </div>
            </div>

            <div className="password">
              <img className="img " src="images/登录页面/u17.svg" />
              <div className="input_box">
                <InputPassword />
              </div>
            </div>
            <div className="forget_password">
              <a href="">忘记密码</a>
            </div>

            <div className="protocol">
              <UserProtocol />
            </div>
          </Form>
          <div className="login">
            <img className="img " src="images/登录页面/u19.svg" />
            <Button className="button" onClick={submit} shape="round">
              登录
            </Button>
          </div>

          <div className="sign_up">
            <Button className="button" shape="round">
              注册账号
            </Button>
          </div>

          <div className="divider">
            <Divider>OR</Divider>
          </div>
          <div className="weChat">
            <img className="img " src="images/登录页面/u16.svg" />
            <Button
              className="button"
              onClick={navInstance.toWeChat}
              shape="round"
            >
              微信账号登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

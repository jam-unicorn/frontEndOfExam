import { navHelper } from '@/core/routes/navHelper'
import { Carousel } from 'antd'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}
const Home = () => {
  const navInstance = navHelper()
  return (
    <div>
      <div className="head">
        <h1>首页</h1>
        <Button onClick={navInstance.toLogin}>登录</Button>
      </div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div className="interviewNav">
        <Button>更多</Button>
      </div>
      <div className="interviewExample">
        <Button>更多</Button>
      </div>
      <div className="buttom"></div>
    </div>
  )
}

export default Home

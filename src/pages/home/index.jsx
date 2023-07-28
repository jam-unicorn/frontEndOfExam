import { navHelper } from '@/core/routes/navHelper'

const Home = () => {
  const navInstance = navHelper()
  return (
    <div>
      <Button onClick={navInstance.toLogin}>登录</Button>
    </div>
  )
}

export default Home

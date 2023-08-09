import { Layout } from 'antd'
import { Outlet } from 'react-router'
import BottomBar from '@/features/BottomBar'

const { Content } = Layout
const LayoutIndex = () => {
  return (
    <Layout className="min-h-[100vh] h-full">
      <Layout className="bg-[#eee]">
        <Layout>
          <Content className="m-[15px] p-[10px] h-full bg-[#fff] rounded-[8px]">
            <Outlet />
          </Content>
        </Layout>
        <BottomBar />
      </Layout>
    </Layout>
  )
}

export default LayoutIndex

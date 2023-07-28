const { Footer } = Layout

const BottomBar = () => {
  return (
    <Footer>
      <div className="flex items-center h-full justify-between">
        <div className="flex items-center gap-[15px]">
          <Button>首页</Button>
          <Button>面试</Button>
          <Button>我的</Button>
        </div>
      </div>
    </Footer>
  )
}

export default BottomBar

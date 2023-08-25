/* eslint-disable no-magic-numbers */
import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { getCityList, getHotCity } from '../../api/request'
// import { getCurrentCity } from '../../utils/index'
// 长列表组件
import { AutoSizer, List } from 'react-virtualized'
// import NavHeader from '../../components/NavHeader/index'
import './index.scss'

const CityList = () => {
  // const navigate = useNavigate()
  // 城市列表
  const [cityList, setCityList] = useState({})
  // 城市索引
  const [cityIndex, setCityIndex] = useState([])

  const [listLength, setListLength] = useState(0)

  const [listHeight, setListHeight] = useState([])
  // 城市索引高度
  const TITLE_HEIGHT = 36
  // 城市名称高度
  const NAME_HEIGHT = 50
  // 当前高亮索引
  const [activeIndex, setActiveIndex] = useState(0)
  // 城市列表 List 组件
  const cityListComponent = useRef()

  useEffect(() => {
    getCityLists()

    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    // 调用这个方法要保证 List 组件中已有数据
    // setTimeout(() => {
    //   cityListComponent.current.measureAllRows()
    // }, 1000)
  }, [])

  // 获取城市列表数据
  const getCityLists = async () => {
    // const res = await getCityList({ level: 1 })
    // const { cityList, cityIndex } = formatCityData(res.data.body)
    const res = [
      { id: 'aq', short: 'aq', label: 'aq', value: '安庆' },
      { id: 'bj', short: 'bj', label: 'bj', value: '北京' },
      { id: 'bt', short: 'bt', label: 'bt', value: '包头' },
      { id: 'cd', short: 'cd', label: 'cd', value: '成都' },
      { id: 'dg', short: 'dg', label: 'dg', value: '东莞' },
      { id: 'gz', short: 'gz', label: 'gz', value: '广州' },
      { id: 'sz', short: 'sz', label: 'sz', value: '深圳' },
    ]
    const { cityList, cityIndex } = formatCityData(res)
    // 获取热门城市数据
    // const hotRes = await getHotCity()
    // 将热门城市添加到城市列表中
    // cityList['hot'] = hotRes.data.body
    cityList['#'] = [{ short: 'gz', label: 'hot', value: '广州' }]
    cityIndex.unshift('#')

    setCityList(cityList)
    setCityIndex(cityIndex)
    setListLength(cityIndex.length)
    setListHeight(listHeight)
  }

  // 数据格式化方法
  const formatCityData = (list) => {
    // 城市列表
    list.forEach((item) => {
      // 获取每个城市的首字母
      const first = item.short.substr(0, 1)
      // 判断列表中是否有该字母
      if (cityList[first]) {
        // 如果有则直接push
        cityList[first].push(item)
      } else {
        // 没有则创建新数组，在push
        cityList[first] = [item]
      }
    })

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()

    return {
      cityList,
      cityIndex,
    }
  }

  // 处理字母索引的方法
  const formatCityIndex = (letter) => {
    switch (letter) {
      case '#':
        return '热门城市'
      default:
        return letter.toUpperCase()
    }
  }

  // 动态计算每行高度的方法
  const getRowHeight = ({ index }) => {
    return cityList[cityIndex[index]].length * NAME_HEIGHT + TITLE_HEIGHT
  }

  // 点击切换城市
  const changeCity = (curCity) => {
    alert(curCity)
  }

  // 渲染城市列表每一行数据
  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // 指定每一行的位置，给每行数据添加样式
  }) => {
    // // 获取每一行的字母索引
    const letter = cityIndex[index]
    // 渲染指定字母索引下的城市列表数据
    const cityItems = cityList[letter]?.map((item) => {
      return (
        <div
          className="name"
          key={item.label}
          onClick={() => changeCity(item.value)}
        >
          {item.value}
        </div>
      )
    })
    return (
      <div key={key} style={style} className="city">
        <div className="title">{letter ? formatCityIndex(letter) : ''}</div>
        {cityItems}
      </div>
    )
  }

  // 获取每行的信息   startIndex:拿到顶部一行的索引号动态设置索引高亮
  const onRowsRendered = ({ startIndex }) => {
    if (activeIndex !== startIndex) {
      setActiveIndex(startIndex)
    }
  }

  // 点击右侧索引滚动到对应的城市
  const goScrollToRow = (index) => {
    // 列表滚动到 index 行
    cityListComponent.current.scrollToRow(index)
  }

  // 渲染城市索引列表
  const renderCityIndex = cityIndex.map((item, index) => {
    return (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          goScrollToRow(index)
        }}
      >
        <span className={activeIndex === index ? 'index-active' : ''}>
          {item === '#' ? '#' : item.toUpperCase()}
        </span>
      </li>
    )
  })

  return (
    <div>
      <div className="nav-header">
        <h1>城市列表</h1>
      </div>
      <div className="cityList">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={listLength}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
              ref={cityListComponent}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
      </div>
      {/* 右侧索引列表 */}
      <ul className="city-index">{renderCityIndex}</ul>
    </div>
  )
}

export default CityList

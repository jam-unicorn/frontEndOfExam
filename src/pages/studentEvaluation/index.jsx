import React, { useState } from 'react'
import './index.css' // 引入样式文件

const ONE=1
const ZERO=0
const largetime=10000
const StudentEvaluation = () => {
  
  const [selectedOptions, setSelectedOptions] = useState([]) // 用于存储选中的选项
  const [ratingf, setRatingf] = useState(0) // 存储服务态度的评分
  const [ratings, setRatings] = useState(0) // 存储店内环境的评分
  const [ratingt, setRatingt] = useState(0) // 存储总体评价的评分
  const [comment, setComment] = useState('') // 存储评论的内容
  // const [submitted, setSubmitted] = useState(false) // 表示表单是否已提交的状态
  const [canSubmit, setCanSubmit] = useState(false) // 用于控制提交按钮的可用状态

  // 处理服务态度评分的改变
  const handleRatingfChange = (value) => {
    setRatingf(value)
    checkCanSubmit() // 每当评分改变时，检查是否可以提交表单
  }

  // 处理店内环境评分的改变
  const handleRatingsChange = (value) => {
    setRatings(value)
    checkCanSubmit()
  }

  // 处理总体评价评分的改变
  const handleRatingtChange = (value) => {
    setRatingt(value)
    checkCanSubmit() 
  }

  // 处理评论文本框的改变
  const handleCommentChange = (event) => {
    setComment(event.target.value)
    checkCanSubmit() 
  }

  // 处理选项的改变
  const handleOptionChange = (event) => {
    const optionValue = event.target.value

    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== optionValue))
    } else {
      setSelectedOptions([...selectedOptions, optionValue])
    }
    checkCanSubmit() 
  }

  // 检查是否可以提交表单的函数
  const checkCanSubmit = () => {
    // 如果评分和评论都不为空，并且至少选择了一个选项，则可以提交表单
    if(
      ratingf !== undefined &&
      ratings !== undefined &&
      ratingt !== undefined &&
      comment !== "" &&
      selectedOptions.length > ZERO
    ) {
      setCanSubmit(true) // 设置提交按钮为可用状态
    } else {
      setCanSubmit(false) // 设置提交按钮为不可用状态
    }
  }

  // 处理表单的提交
  const handleSubmit = (event) => {
    event.preventDefault() // 阻止表单的默认提交行为

    // 做一些简单的验证，确保评分和评论都有值以及选项已选择
    if (comment.trim() === '') {
      alert('请填写评论')
      return
    }

    if (selectedOptions.length === 0) {
      alert('请选择至少一个选项')
      return
    }

    // 模拟异步提交
    setTimeout(() => {
      // 将评分、评论和选项重置，提交状态设置为true，以便展示提交成功的信息
      setRatingf(0)
      setRatings(0)
      setRatingt(0)
      setComment('')
      setSelectedOptions([])
      setCanSubmit(true)
    }, largetime)
  }

  return (
    <div>
  <div className="option-container">
    <label>
      本次使用哪些让你印象深刻：
      <br />
      <div className="row">
        <div className="column">
          <input
            type="checkbox"
            value="选择地区"
            checked={selectedOptions.includes('选择地区')}
            onChange={handleOptionChange}
          />{' '}
          选择地区
        </div>
        <div className="column">
          <input
            type="checkbox"
            value="精准定位"
            checked={selectedOptions.includes('精准定位')}
            onChange={handleOptionChange}
          />{' '}
          精准定位
        </div>
        <div className="column">
          <input
            type="checkbox"
            value="题库导入"
            checked={selectedOptions.includes('题库导入')}
            onChange={handleOptionChange}
          />{' '}
          题库导入
        </div>
      </div>
      <div className="row">
        <div className="column">
          <input
            type="checkbox"
            value="激励制度"
            checked={selectedOptions.includes('激励制度')}
            onChange={handleOptionChange}
          />{' '}
          激励制度
        </div>
        <div className="column">
          <input
            type="checkbox"
            value="学习排名"
            checked={selectedOptions.includes('学习排名')}
            onChange={handleOptionChange}
          />{' '}
          学习排名
        </div>
        <div className="column">
          <input
            type="checkbox"
            value="结构化面试"
            checked={selectedOptions.includes('结构化面试')}
            onChange={handleOptionChange}
          />{' '}
          结构化面试
        </div>
      </div>
    </label>
  </div>
  <br />
  <form onSubmit={handleSubmit}>
    <div>
      <label>评论：</label>
      <textarea value={comment} onChange={handleCommentChange} />
    </div>
    <br />
    <div>
      <span>服务态度评分：</span>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index + ONE}
            className={index + ONE <= ratingf ? 'selected' : ''}
            onClick={() => handleRatingfChange(index + ONE)}
          >
            {index + ONE}
          </button>
        ))}
      </div>
    </div>
    <br />
    <div>
      <span>店内环境评分：</span>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index + ONE}
            className={index + ONE <= ratings ? 'selected' : ''}
            onClick={() => handleRatingsChange(index + ONE)}
          >
            {index + ONE}
          </button>
        ))}
      </div>
    </div>
    <br />
    <div>
      <span>总体评价评分：</span>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            
            key={index + ONE}
            className={index + ONE <= ratingt ? 'selected' : ''}
            onClick={() => handleRatingtChange(index + ONE)}
          >
            {index + ONE}
          </button>
        ))}
      </div>
    </div>
    <br />
    <button type="submit" disabled={!canSubmit}>提交评价</button> {/* 修改提交按钮的可用状态 */}
  </form>
</div>
  )
}

export default StudentEvaluation
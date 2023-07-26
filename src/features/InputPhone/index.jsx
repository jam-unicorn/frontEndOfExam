export default function InputPhone() {
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const { Item } = Form
  return (
    <Item
      name="account"
      rules={[
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.reject(new Error('请输入手机号码！'))
            } else if (phoneReg.test(value)) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('请输入正确的手机号码!'))
          },
        }),
      ]}
    >
      <Input placeholder="手机号码" />
    </Item>
  )
}

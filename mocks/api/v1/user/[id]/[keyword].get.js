module.exports = {
  desc: '获取某位用户关于某个用户标签的内容', // 标识该 api 的含义
  status: 200,
  data: {
    code: 200,
    message: 'Success',
    data: Array(10).fill({
      uid: '1615922283',
      tag: 'tag',
      content: 'coding',
    }),
  },
}

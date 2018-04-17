import Mock from 'mockjs'

export const users = []

for (let i = 0; i < 29; i++) {
  users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    gender: Mock.Random.integer(0, 1)
  }))
}

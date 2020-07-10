// 比赛
import {post} from '@/utils/request/index'
let model = 'contest'
const findByTypeWithStartAtAndEndAtUrl = `api/${model}/findByTypeWithStartAtAndEndAt`
const findWithStatusUrl = `api/${model}/findWithStatus`
const getByIdUrl = `api/${model}/get`

// 查询进行中或者已结束的比赛1、进行中2、已结束
export function findByTypeWithStartAtAndEndAt(param,callback) {
  return post(findByTypeWithStartAtAndEndAtUrl, param, callback)
}

// 查询所有比赛数据
export function findWithStatus(param,callback) {
  return post(findWithStatusUrl, param, callback)
}

// 根据id获取比赛详情
export function getById(param, callback) {
  return post(getByIdUrl, param, callback)
}
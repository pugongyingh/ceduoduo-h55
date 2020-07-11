// 比赛
import {post} from '@/utils/request/index'
let model = 'caseStory'
const findByStatusUrl = `api/${model}/findByStatus`

// 获取案例故事数据
export function findByStatus(param,callback) {
  return post(findByStatusUrl, param, callback)
}

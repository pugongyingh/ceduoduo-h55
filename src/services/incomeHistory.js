import {post} from '@/utils/request/index'
const findWithUserIdUrl = 'api/incomeHistory/findWithUserId'

export function findIncomeWithUserId(param,callback) {
  return post(findWithUserIdUrl,param,callback)
}

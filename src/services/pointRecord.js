import {post} from '@/utils/request/index'
const findWithUserIdUrl = 'api/pointRecord/findWithUserId'

export function findWithUserId(param,callback) {
  return post(findWithUserIdUrl,param,callback)
}

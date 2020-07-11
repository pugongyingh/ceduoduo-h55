import {post} from "../utils/request";

const countByPlatformProductIdUrl = 'api/comment/countByPlatformProductId'
const findByPlatformProductIdUrl = 'api/comment/findByPlatformProductId'

export function countByPlatformProductId(param,callback) {
  return post(countByPlatformProductIdUrl,param,callback)
}

export function findByPlatformProductId(param,callback) {
  return post(findByPlatformProductIdUrl,param,callback)
}



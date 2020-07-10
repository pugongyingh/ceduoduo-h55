import {post} from "../utils/request";

const findByPlatformProductUrl = 'api/specification/findByPlatformProduct'

export function findByPlatformProduct(param,callback) {
  return post(findByPlatformProductUrl,param,callback)
}

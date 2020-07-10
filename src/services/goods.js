import {post} from "../utils/request";

const findByPlatformProductIdAndOptionsIdUrl =  'api/goods/findByPlatformProductIdAndOptionsId'

export function findByPlatformProductAndOptions(param,callback) {
  return post(findByPlatformProductIdAndOptionsIdUrl,param,callback)
}

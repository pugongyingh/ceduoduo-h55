import {post} from "../utils/request";
import {privateList} from "./album";
const getUrl = 'api/platformProduct/get'
const findIconAndIdUrl = 'api/platformProduct/findIconAndId'
const findByPlatformProductIdAndAlbumIdUrl = 'api/platformProduct/findByPlatformProductIdAndAlbumId'

export function get(param,callback) {
  return post(getUrl,param,callback)
}

export function findByPlatformProductIdAndAlbumId(param,callback) {
  return post(findByPlatformProductIdAndAlbumIdUrl,param,callback)
}

export function findIconAndId (param,callback) {
  return post(findIconAndIdUrl,param,callback)
}

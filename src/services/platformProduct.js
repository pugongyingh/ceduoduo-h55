import {post} from "../utils/request";
import {privateList} from "./album";
const getUrl = 'api/platformProduct/get'
const findIconAndIdUrl = 'api/platformProduct/findIconAndId'
const findByPlatformProductIdAndAlbumIdUrl = 'api/platformProduct/findByPlatformProductIdAndAlbumId'
const findHomeBoutiqueProductUrl = 'api/platformProduct/findHomeBoutiqueProduct'
const findByCategoryIdUrl = 'api/platformProduct/findByCategoryId'
const searchUrl = 'api/platformProduct/search'

export function get(param,callback) {
  return post(getUrl,param,callback)
}

export function search(param,callback) {
  return post(searchUrl,param,callback)
}

export function findByPlatformProductIdAndAlbumId(param,callback) {
  return post(findByPlatformProductIdAndAlbumIdUrl,param,callback)
}

export function findIconAndId (param,callback) {
  return post(findIconAndIdUrl,param,callback)
}

export function findHomeBoutiqueProduct(param,callback) {
  return post(findHomeBoutiqueProductUrl,param,callback)
}

export function findByCategoryId(param,callback) {
  return post(findByCategoryIdUrl,param,callback)
}

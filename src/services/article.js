import {post} from "../utils/request";
const searchUrl = 'api/article/search'
const getUrl = 'api/article/get'
const findByAdvertisementLocationUrl = 'api/article/findByAdvertisementLocation'

export function search(param,callback) {
  return post(searchUrl,param,callback)
}

export function get(param,callback) {
  return post(getUrl,param,callback)
}

export function findByAdvertisementLocation(param,callback) {
  return post(findByAdvertisementLocationUrl,param,callback)
}

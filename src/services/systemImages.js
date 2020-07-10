import {post} from "../utils/request";

const searchUrl = 'api/systemImage/search'

export function searchImages(param,callback) {
  return post(searchUrl,param,callback)
}

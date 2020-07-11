import {post} from '@/utils/request/index'
const searchUrl = 'api/templateCategory/search'
const findHomePageNewUrl = 'api/article/findHomePageNew'

export function findHomePageNew(param,callback) {
  return post(findHomePageNewUrl,param,callback)
}

export function searchTemplateCategory(param,callback) {
  return post(searchUrl,param,callback)
}

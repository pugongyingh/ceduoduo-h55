import {post} from '@/utils/request/index'
const searchUrl = 'api/template/search'
const findByUserIdUrl = 'api/template/findWithUserId'
const findHotCategoryTemplateUrl = 'api/template/findHotCategoryTemplate'
const findByNameOrCategoryUrl = 'api/template/findByNameOrCategory'
const findByNameOrCategoryWithStatusUrl = 'api/template/findByNameOrCategoryWithStatus'
const findDetailByIdUrl = 'api/template/findDetailById'

export function searchTemplate(param,callback) {
  return post(searchUrl,param,callback)
}

export function findByUserId(param,callback) {
  return post(findByUserIdUrl,param,callback)
}

export function findHotCategoryTemplate(param,callback) {
  return post(findHotCategoryTemplateUrl,param,callback)
}

export function findByNameOrCategory(param,callback) {
  return post(findByNameOrCategoryUrl,param,callback)
}

export function findByNameOrCategoryWithStatus(param,callback) {
  return post(findByNameOrCategoryWithStatusUrl,param,callback)
}

export function findDetailById(param,callback) {
  return post(findDetailByIdUrl,param,callback)
}

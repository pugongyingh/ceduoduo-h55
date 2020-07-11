import {post} from '@/utils/request/index'
const findParentStoreWithUserIdUrl = 'api/store/findParentStoreWithUserId' // @param {}
const findDetailByIdUrl = '/api/store/findDetailById'
const findByKeyWordUrl = '/api/store/findByKeyWord'
const findByAllianceIdAndNameWithGradeUrl = '/api/store/findByAllianceIdAndNameWithGrade'
const findByJoinedAllianceIdUrl = '/api/store/findByJoinedAllianceId'
const findByStoreIdUrl = '/api/storeDescription/findByStoreId'
const findMemberByUserIdUrl = '/api/store/findMemberByUserId'

export function findMemberByUserId(param,callback) {
  return post(findMemberByUserIdUrl,param,callback)
}

export function findByStoreId(param,callback) {
  return post(findByStoreIdUrl,param,callback)
}

export function findParentStoreWithUserId(param,callback) {
  return post(findParentStoreWithUserIdUrl,param,callback)
}

export function findDetailById(param,callback) {
  return post(findDetailByIdUrl,param,callback)
}

export function findByKeyWord(param,callback) {
  return post(findByKeyWordUrl,param,callback)
}

export function findByJoinedAllianceId(param,callback) {
  return post(findByJoinedAllianceIdUrl,param,callback)
}

export function findByAllianceIdAndNameWithGrade(param,callback) {
  return post(findByAllianceIdAndNameWithGradeUrl,param,callback)
}
